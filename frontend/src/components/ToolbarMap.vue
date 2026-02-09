<template>
  <div class="map-toolbar">
    <div class="baseMap">
      <!-- <div v-for="bm in baseMaps" :key="bm.get('title')">
        <input type="radio" name="basemap" :checked="bm.getVisible()" @change="switchBaseMap(bm)" />
        {{ bm.get('title') }}
      </div> -->
      <button @click="toggleBaseMap" title="Bản đồ nền">
        <IconMap />
        <div class="item-basemap" v-show="isOpen">
          <div v-for="bm in baseMaps" :key="bm.get('title')" class="basemap-option" @click="switchBaseMap(bm)">
            <input type="radio" name="basemap" :checked="bm.getVisible()" />
            {{ bm.get('title') }}
          </div>
        </div>
      </button>
    </div>
    <button @click="zoomIn" title="Phóng to">
      <ZoomInOutlined />
    </button>
    <button @click="zoomOut" title="Thu nhỏ">
      <ZoomOutOutlined />
    </button>
    <button title="Xuất bản đồ" @click="exportMap">
      <FileImageOutlined />
    </button>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ZoomInOutlined, ZoomOutOutlined, FileImageOutlined } from '@ant-design/icons-vue';
import { onMounted } from 'vue';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { IconMap } from '@tabler/icons-vue';

const props = defineProps({
  map: Object
});

const isOpen = ref(false);

const toggleBaseMap = () => {
  isOpen.value = !isOpen.value;
};

const zoomIn = () => {
  if (!props.map) return;
  const view = props.map.getView();
  view.setZoom(view.getZoom() + 1);
};

const zoomOut = () => {
  if (!props.map) return;
  const view = props.map.getView();
  view.setZoom(view.getZoom() - 1);
};

const baseMaps = computed(() => {
  return props.map.getLayers().getArray()
    .filter(layer => layer.get('isBaseLayer') === true);

})

const switchBaseMap = (selected) => {
  baseMaps.value.forEach(bm => {
    bm.setVisible(bm === selected);
  });
  isOpen.value = false;
};

const exportMap = async () => {
  const map = props.map;
  if (!map) return;

  // ===== 1) Lưu basemap đang bật =====
  const baseLayers = baseMaps.value || [];
  const activeBase = baseLayers.find(l => l.getVisible());

  // ===== 2) Tạm ẩn toàn bộ basemap (tránh Google/XYZ làm tainted) =====
  baseLayers.forEach(l => l.setVisible(false));

  // Ép render xong frame mới sau khi ẩn basemap
  await new Promise((resolve) => {
    map.once('rendercomplete', resolve);
    map.renderSync();
  });

  try {
    const size = map.getSize();
    if (!size) return;

    const mapCanvas = document.createElement('canvas');
    mapCanvas.width = size[0];
    mapCanvas.height = size[1];
    const ctx = mapCanvas.getContext('2d');

    // nền trắng (bạn có thể bỏ để nền trong suốt)
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);

    const viewport = map.getViewport();
    const canvases = viewport.querySelectorAll('.ol-layer canvas');

    let drawn = 0;
    let taintedCount = 0;

    canvases.forEach((canvas, i) => {
      if (!canvas.width || !canvas.height) return;

      // bỏ canvas tainted
      try { canvas.toDataURL('image/png'); }
      catch (e) {
        taintedCount++;
        console.warn('TAINTED canvas -> skipped:', i, e);
        return;
      }

      const opacity = canvas.parentNode?.style?.opacity;
      ctx.globalAlpha = opacity ? Number(opacity) : 1;

      const transform = canvas.style.transform;
      if (transform && transform.startsWith('matrix(')) {
        const m = transform.slice(7, -1).split(',').map(v => Number(v.trim()));
        ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
      } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }

      ctx.drawImage(canvas, 0, 0);
      drawn++;
    });

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;

    console.log('Export done. drawn:', drawn, 'tainted skipped:', taintedCount);

    if (drawn === 0) {
      console.warn('Không có layer nào export được (có thể chỉ bật mỗi basemap).');
      return;
    }

    const link = document.createElement('a');
    link.href = mapCanvas.toDataURL('image/png');
    link.download = 'map.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    // ===== 3) Khôi phục basemap cũ =====
    if (activeBase) activeBase.setVisible(true);

    // render lại để người dùng thấy map trở về bình thường
    map.renderSync();
  }
};






</script>

<style scoped>
.map-toolbar {
  position: absolute;
  top: 100px;
  right: 1px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* background: white; */
  padding: 8px;
  /* border-radius: 6px; */
  /* box-shadow: 0 2px 6px rgba(0, 0, 0, .2); */
  z-index: 6000;
}

.map-toolbar button {
  /* background: none; */
  border: none;
  cursor: pointer;
  /* font-size: 20px; */
  padding: 8px 5px;
  border-radius: 4px;
}

.basemap-option {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  cursor: pointer;
}

.item-basemap {
  border: none;
  position: absolute;
  /* top: 40px; */
  right: 40px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
  z-index: 7000;
}
</style>
