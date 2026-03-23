<template>
    <div class="page-document">
        <HeaderView class="header-view" />

        <div class="container">
            <div class="content-document">
                <div class="tile-document">
                    <h1>DANH SÁCH CÁC THÔNG BÁO, TÀI LIỆU, VĂN BẢN</h1>
                </div>
                <hr />

                <div class="main-document">
                    <!-- <div class="sreach">
                        <a-input-search v-model:value="value" placeholder="input search text" enter-button
                            style="width: 300px;" @search="onSearch" />
                    </div> -->

                    <div class="box box-document">
                        <div class="box1" v-for="file in files" :key="file.id">
                            <div class="box1-left">
                                <img src="../assets/image/file.png" alt="" width="80" height="80" />
                            </div>

                            <div class="box1-right">
                                <h3>{{ file.file_path?.split('/').pop() }}</h3>

                                <div class="name-file">
                                    <span><strong>Tên:</strong> {{ file.file_name }}</span> <br />
                                    <span><strong>Loại tài liệu:</strong> {{ file.file_type }}</span>
                                </div>

                                <div class="btn">
                                    <button @click="onView(file)" style="background-color:#0056B3; margin-right: 10px;">
                                        Xem
                                    </button>

                                    <button @click="onDownload(file)" style="background-color:#218838;">
                                        Tải về
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- MODAL PREVIEW -->
        <a-modal v-model:open="open" width="1400px" title="Xem file" :footer="null"
            :bodyStyle="{ maxHeight: '80vh', overflow: 'auto' }" @cancel="closeModal">
            <div style="margin-bottom: 12px;">
                <strong>{{ currentFile?.file_name }}</strong>
                <span v-if="currentMime"> — {{ currentMime }}</span>
            </div>

            <!-- IMAGE -->
            <img v-if="isImage && previewUrl" :src="previewUrl" alt="preview"
                style="display:block; max-width:100%; max-height:75vh; margin:0 auto; border:1px solid #ddd; border-radius:8px" />

            <!-- PDF -->
            <iframe v-else-if="isPdf && previewUrl" :src="previewUrl"
                style="width:100%; height:75vh; border:1px solid #ddd; border-radius:8px" />

            <!-- VIDEO -->
            <video v-else-if="isVideo && previewUrl" :src="previewUrl" controls style="width:100%; max-height:75vh" />

            <!-- AUDIO -->
            <audio v-else-if="isAudio && previewUrl" :src="previewUrl" controls style="width:100%" />

            <div v-else>
                <h4>Không thể xem được file này. Vui lòng tải về để xem.</h4>
            </div>
        </a-modal>
    </div>
</template>

<script setup>
import HeaderView from "@/components/HeaderView.vue";
import { onMounted, ref, computed, onBeforeUnmount } from "vue";
import { getFiles, getFileById } from "@/api/api_file.js";

const files = ref([]);

const open = ref(false);
const previewUrl = ref(null);
const currentFile = ref(null);
const currentMime = ref("");

const isImage = computed(() => currentMime.value.startsWith("image/"));
const isPdf = computed(() => currentMime.value === "application/pdf");
const isVideo = computed(() => currentMime.value.startsWith("video/"));
const isAudio = computed(() => currentMime.value.startsWith("audio/"));

function canPreview(mime) {
    if (!mime) return false;
    if (mime === "application/pdf") return true;
    if (mime.startsWith("image/")) return true;
    if (mime.startsWith("video/")) return true;
    if (mime.startsWith("audio/")) return false;
    if (mime.startsWith("text/")) return true;
    return false;
}

function cleanup() {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
    currentMime.value = "";
    currentFile.value = null;
}

function closeModal() {
    open.value = false;
    cleanup();
}

function parseFilenameFromHeader(cd = "", fallback = "download") {
    const m = cd.match(/filename\*\s*=\s*UTF-8''([^;]+)|filename\s*=\s*"([^"]+)"/i);
    return decodeURIComponent(m?.[1] || m?.[2] || fallback);
}

function downloadBlob(url, filename) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

async function fetchFiles() {
    const res = await getFiles();
    console.log("Fetched files:", res.files);
    files.value = res.files.data || [];
}

async function onView(file) {
    currentFile.value = file;

    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;

    const res = await getFileById(file.id);

    const mime =
        res?.headers?.["content-type"] ||
        file.file_type ||
        "application/octet-stream";
    currentMime.value = mime;

    const data = res.data;
    const blob = data instanceof Blob ? data : new Blob([data], { type: mime });

    const url = URL.createObjectURL(blob);

    if (!canPreview(mime)) {
        open.value = false; 
    }

    previewUrl.value = url;
    open.value = true;
}

async function onDownload(file) {
    const res = await getFileById(file.id);

    const mime =
        res?.headers?.["content-type"] ||
        file.file_type ||
        "application/octet-stream";

    const data = res.data;
    const blob = data instanceof Blob ? data : new Blob([data], { type: mime });

    const url = URL.createObjectURL(blob);
    const filename = parseFilenameFromHeader(res.headers?.["content-disposition"] || "", file.file_name || `file-${file.id}`);
    downloadBlob(url, filename);

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

onMounted(fetchFiles);
onBeforeUnmount(cleanup);
</script>

<style>
.page-document {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #f5f5f5;
}

.page-document .header-view {
    height: 50px;
}

.page-document .content-document {
    margin-top: 50px;
    height: calc(100vh - 50px);
    background-color: white;
}

.page-document .tile-document h1 {
    margin: 5px;
    font-size: 24px;
    padding: 20px 0 0 20px;
}

.page-document .sreach {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 20px;
}

.page-document .box {
    height: 570px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: #c1c0c0 0px 0px 10px;
    overflow-y: scroll;
}

.page-document .box .box1 {
    display: flex;
    margin: 10px;
    border-radius: 8px;
    box-shadow: #c1c0c0 0px 0px 10px;
}

.page-document .box .box1:hover {
    transform: scale(1.05);
    transition: 0.5s;
}

.box1 .box1-left {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    padding: 10px;
}

.box1 .box1-right {
    padding: 10px;
    width: 100%;
}

.box1 .box1-right .name-file {
    padding: 10px;
    margin: 10px 0;
    background-color: #f1f1f1;
    border-radius: 5px;
}

.btn button {
    padding: 10px;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}
</style>
