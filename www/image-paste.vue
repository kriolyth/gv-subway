<template>
    <p>
        Вставьте изображение или выберите файл для загрузки:
        <input type="file" ref="imgFile" />
    </p>
    <p>{{ processingState }}</p>

    <img id="paste" :class="{ debug: debugOutput }" ref="pasta" />
    <canvas id="pixels" :class="{ debug: debugOutput }" ref="pixels"></canvas>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ImageProcessor } from "../pkg/gv_subway";

export default defineComponent({
    setup() {},
    data() {
        const fields = new URLSearchParams(window.location.search.substring(1));
        return {
            processingState: "",
            debugOutput: fields.get("debug") == "1",
        };
    },
    emits: ["haveMaze"],
    mounted() {
        let vm = this; // this vue/model reference
        document.addEventListener("paste", function (evt) {
            vm.onPaste(evt);
        });

        (this.$refs.imgFile as HTMLInputElement).addEventListener(
            "change",
            function (_evt) {
                const fileList = this.files;
                if (!fileList || fileList.length == 0) return;
                vm.readFile(fileList[0]);
            }
        );
        let pasta = this.$refs.pasta as HTMLImageElement;
        let pixxa = this.$refs.pixels as HTMLCanvasElement;
        pasta.addEventListener("load", function (_evt: Event) {
            let scale = 1.0;
            if (pasta.width > 600) scale = 0.5;
            pixxa.width = pasta.width * scale;
            pixxa.height = pasta.height * scale;
            pixxa
                .getContext("2d")
                ?.drawImage(pasta, 0, 0, pixxa.width, pixxa.height);
            let imageData = pixxa
                .getContext("2d")
                ?.getImageData(0, 0, pixxa.width, pixxa.height);
            if (imageData) {
                vm.processingState = "Загружаем...";
                try {
                    let processor = new ImageProcessor(
                        imageData.width,
                        imageData.height,
                        imageData.data
                    );
                    vm.processingState = "Проверяем...";
                    let maze = processor.detect_maze(processor.detect_grid());
                    if (maze.is_valid()) {
                        vm.processingState = "Схема получена";
                        vm.$emit("haveMaze", maze);

                        processor.debug_draw(maze);
                    } else {
                        vm.processingState =
                            "Загрузить схему подземки не удалось";
                    }
                    let backpixels = processor.get_image_data();
                    let newImage = new ImageData(
                        backpixels,
                        pixxa.width,
                        pixxa.height
                    );
                    pixxa.getContext("2d")?.putImageData(newImage, 0, 0);
                } catch (e) {
                    alert(e);
                    vm.processingState = "";
                }
            }
        });
    },
    methods: {
        onPaste(evt: ClipboardEvent) {
            if (!evt.clipboardData) return;

            for (var i = 0; i < evt.clipboardData.items.length; i++) {
                let item = evt.clipboardData.items[i];
                if (item.kind == "file" && item.type.match(/^image/)) {
                    let file = item.getAsFile();
                    if (file) {
                        this.readFile(file);
                        break;
                    }
                }
            }
        },
        readFile(file: File) {
            let reader = new FileReader();
            let pasta = this.$refs.pasta as HTMLImageElement;
            reader.onload = function (evt: ProgressEvent<FileReader>) {
                console.log("Loading image");
                pasta.src = this.result as string;
                // the rest is handled by event handles
            };
            reader.readAsDataURL(file);
        },
    },
});
</script>
<style>
    #paste,
    #pixels {
        display: none;
    }
    #paste.debug,
    #pixels.debug {
        display: block;
        border: 1px dotted midnightblue;
    }
</style>