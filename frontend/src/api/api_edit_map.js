import Select from 'ol/interaction/Select'
import Draw from 'ol/interaction/Draw'
import Modify from 'ol/interaction/Modify'
import Snap from 'ol/interaction/Snap'
import DragBox from 'ol/interaction/DragBox'
import { platformModifierKeyOnly } from 'ol/events/condition'
import { singleClick } from 'ol/events/condition'
import VectorLayer from 'ol/layer/Vector'

// import Select from 'ol/interaction/Select'

import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style'

const selectStyle = new Style({
    stroke: new Stroke({
        color: '#ff0000',
        width: 2
    }),
    fill: new Fill({
        color: 'rgba(255,0,0,0.1)'
    }),
    image: new CircleStyle({
        radius: 6,
        fill: new Fill({ color: '#ff0000' })
    })
})


const useEditMap = (map, editSource) => { //map: bản đồ, vectorSource: layer đang biên tập 

    let select, draw, modify, snap, box
    let interactions = []    //lưu các tương tácc đang bật

    const clearInteractions = () => {
        interactions.forEach(interaction => {
            map.removeInteraction(interaction)
            console.log('Removed interaction:', interaction);
        })
        interactions = []
        select = null
        draw = null
        modify = null
        snap = null
        box = null
        console.log('All interactions cleared.', interactions);
    }


    const enableDraw = (type, onDrawEnd, onSelected) => {
        if (!type) return

        clearInteractions()
        draw = new Draw({
            source: editSource,
            type,
            style: selectStyle
        })

        map.addInteraction(draw)
        interactions.push(draw)

        enableSnap()

        draw.on('drawend', (e) => {
            const feature = e.feature
            feature.setStyle(selectStyle)

            // ✅ feature này đã nằm trong editSource rồi -> KHÔNG bị mất
            onDrawEnd && onDrawEnd(feature)

            // ✅ DỌN "SKETCH" BÁM CHUỘT (không ảnh hưởng feature đã vẽ)
            // đặt sau tick để OL kết thúc việc add feature
            setTimeout(() => {
                if (!draw) return

                // abortDrawing chỉ hủy bản vẽ đang "dang dở", không xóa feature drawend
                draw.abortDrawing?.()

                // tắt và gỡ interaction vẽ -> hết chấm đỏ
                draw.setActive(false)
                map.removeInteraction(draw)
                interactions = interactions.filter(i => i !== draw)
                draw = null

                if (snap) {
                    map.removeInteraction(snap)
                    interactions = interactions.filter(i => i !== snap)
                    snap = null
                }

                // ✅ chuyển về select để làm mode khác
                // enableSelect(onSelected)
            }, 0)
        })

    }


    const enableSelect = (onSelected) => {
        console.log('Enable Select (filter by editSource)')

        select = new Select({
            condition: singleClick, // bạn import rồi nhưng chưa dùng
            hitTolerance: 6,         // dễ click hơn
            style: selectStyle,
            filter: (feature, layer) => {
                // chỉ chọn feature thuộc editSource
                return layer instanceof VectorLayer && layer.getSource() === editSource
            }
        })

        select.on('select', (e) => {
            const feature = e.selected?.[0]
            if (!feature) {
                console.log('❌ click nhưng không có feature (editSource)')
                return
            }
            console.log('✅ Feature selected:', feature.getId())
            onSelected && onSelected(feature)
        })

        map.addInteraction(select)
        interactions.push(select)
    }

    const selectFeature = (feature) => {
        console.log('Selecting feature programmatically:', feature)
        if (!select) return
        const selectedFeatures = select.getFeatures()
        selectedFeatures.clear()
        selectedFeatures.push(feature)
    }

    const enableModify = (onModifyEnd) => {
        console.log('Enabling Modify interaction');

        if (!select) {
            console.error('❌ Vui lòng bật chế độ chọn trước khi sửa đổi.');
            return;
        }

        // if (modify) return

        modify = new Modify({
            features: select.getFeatures(),
            // style : selectStyle
        })

        modify.on('modifyend', (e) => {
            e.features.forEach(feature => {
                console.log('Feature modified:', feature.getId());
                onModifyEnd && onModifyEnd(feature)
            })
        })

        map.addInteraction(modify)
        interactions.push(modify)
    }

    const enableSnap = () => {
        snap = new Snap({
            source: editSource,
            vertex: true,      // snap vào đỉnh
            edge: true,        // snap vào cạnh/đoạn
            pixelTolerance: 20
        })
        map.addInteraction(snap)
        interactions.push(snap)
    }

    const enableDelete = () => {
        if (!select) return {}
        const selectedFeatures = select.getFeatures()
        selectedFeatures.forEach((feature) => {
            editSource.removeFeature(feature)
        })
        selectedFeatures.clear()
    }

    const enableBoxSelect = () => {
        clearInteractions()
        if (!select) {
            select = new Select()
            map.addInteraction(select)
            interactions.push(select)
        }

        box = new DragBox({ condition: platformModifierKeyOnly })

        box.on('boxend', () => {
            const extent = box.getGeometry().getExtent()
            editSource.getFeaturesInExtent(extent)
                .forEach(f => select.getFeatures().push(f))
        })

        map.addInteraction(box)
        interactions.push(box)
    }
    return {
        enableSelect,
        enableDraw,
        enableModify,
        enableSnap,
        enableDelete,
        enableBoxSelect,
        clearInteractions,
        selectFeature
    }

}

export { useEditMap, selectStyle };