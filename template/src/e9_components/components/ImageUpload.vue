<template>
    <b-modal v-model="showCropper" persistent no-close-on-esc no-close-on-backdrop hide-footer data-app size="lg">
        <button slot="modal-header-close" @click="cancel" class="close">×</button>
        <template v-slot:modal-title>
            Upload Image
        </template>
        <div class="p24">
            <div>
                <h4 class="section-subtitle mt0 mb8">1. Choose File</h4>
                <input type="file" @change="fileUploaded" accept="image/*" ref="fileUpload" />
            </div>
            <div v-if="upload.src">
                <h4 class="section-subtitle mb16">2. Crop Image</h4>
                <cropper classname="cropper" :src="upload.src" :stencil-props="stencilProps" @change="onChange"></cropper>
            </div>
            <div v-if="upload.src" class="upload-actions mt16">
                <h4 class="section-subtitle mb16">3. Confirm</h4>
                <button class="btn btn-primary btn-icon mr8" :class="{'btn-loader': isLoading}" :disabled="isLoading || !isValid" @click="uploadFull" v-show="chosenOption !== 'Cropped'">
                    <img v-if="isLoading" src="@/assets/images/loader-white.svg" alt="loader" class="loader">
                    <i v-else class="material-icons">crop_free</i>
                    <span class="ml16">Upload Uncropped</span>
                </button>
                <button class="btn btn-secondary btn-icon" :class="{'btn-loader': isLoading}" :disabled="isLoading || !isValid" @click="uploadCropped" v-show="chosenOption !== 'Uncropped'">
                    <img v-if="isLoading" src="@/assets/images/loader-white.svg" alt="loader" class="loader">
                    <i v-else class="material-icons">crop</i>
                    <span class="ml16">Upload Cropped</span>
                </button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';
export default {
    name: 'ImageUpload',
    props: ['show', 'config', 'data'],
    components: {
        Cropper,
    },
    data() {
        return {
            isLoading: false,
            chosenOption: '',
            upload: {
                chosen: null,
                src: null,
            },
            position: {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            },
            stencilProps: {
                aspectRatio: this.config.aspectRatio
            },
            options: {
                minWidth: this.config.minWidth
            },
            isValid: false,
            showCropper: true
        };
    },
    methods: {
        callAPI(formData, ) {
            return new Promise(async (resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('POST', window.endpoint + this.config.api, true);
                xhr.setRequestHeader('Accept-Type', 'application/json');
                xhr.setRequestHeader('Authorization', 'bearer ' + this.$cookies.get('token'));
                xhr.onload = () => {
                    if (xhr.status !== 200) {
                        return reject({
                            code: xhr.status,
                            data: xhr.statusText
                        });
                    } else {
                        resolve(xhr.response);
                    }
                };
                xhr.onerror = () => {
                    this.isLoading = false;
                };
                xhr.send(formData);
            });
        },
        close(image) {
            this.$emit('close', image);
        },
        cancel() {
            this.$emit('cancel');
        },
        extractImage() {
            let img = new Image();
            let reader = new FileReader();
            img.onload = () => {
                if (this.config.minWidth) {
                    if (img.width < this.config.minWidth) {
                        this.$swal('Warning', 'Image width should be at least ' + this.config.minWidth + 'px wide.', 'warning');
                        return;
                    } else if (this.config.aspectRatio && img.width / this.config.aspectRatio > img.height) {
                        this.$swal('Warning', 'Image does not match the required specification.', 'warning');
                        return;
                    }
                }
                if (this.config.maxSize && this.upload.chosen.size > 1024 * 1024 * this.config.maxSize) {
                    this.$swal('Warning', 'Image exceeds the minimum size of ' + this.config.maxSize + ' MB', 'warning');
                    return;
                }
                this.isValid = true;
                reader.onload = (e) => {
                    this.upload.src = e.target.result;
                };
                reader.readAsDataURL(this.upload.chosen);
            };
            img.src = window.URL.createObjectURL(this.upload.chosen);
        },
        fileUploaded() {
            this.upload.chosen = this.$refs.fileUpload.files[0];
            this.isValid = false;
            this.extractImage();
        },
        onChange({ coordinates }) {
            this.position = coordinates;
        },
        async uploadFull() {
            this.isLoading = true;
            this.chosenOption = 'Uncropped';
            this.data.name = this.$refs.fileUpload.files[0].name;
            let formData = new window.FormData();
            formData.append('file', this.upload.chosen);
            formData.append('document', JSON.stringify(this.data));
            try {
                let result = await this.callAPI(formData);
                this.isLoading = false;
                this.close(JSON.parse(result));
                this.$swal({
                    title: 'Uploaded',
                    text: 'Image has been uploaded successfully',
                    type: 'success',
                });
            } catch (err) {
                this.chosenOption = '';
                this.$swal({
                    title: 'Error',
                    text: err && err.data && err.data.message ? err.data.message : 'Some error occurred',
                    type: 'error'
                });
                console.error(err);
            }
        },
        async uploadCropped() {
            this.isLoading = true;
            this.chosenOption = 'Cropped';
            this.data.name = this.$refs.fileUpload.files[0].name;
            let formData = new window.FormData();
            formData.append('file', this.upload.chosen);
            formData.append('document', JSON.stringify(this.data));
            let bodyObj = {
                ...this.data,
                cropx: this.position.left,
                cropy: this.position.top,
                cropw: this.position.width,
                croph: this.position.height
            };
            let t = new URLSearchParams(bodyObj).toString();
            this.config.api = this.config.api + '&' + t;
            try {
                let result = await this.callAPI(formData);
                this.isLoading = false;
                this.$swal({
                    title: 'Uploaded',
                    text: 'Image has been uploaded successfully',
                    type: 'success',
                    confirmButtonColor: this.$store.state.constantModule.colors.brandPrimary
                });
                this.close(JSON.parse(result));
            } catch (err) {
                this.chosenOption = '';
                this.$swal({
                    title: 'Error',
                    text: err && err.data && err.data.message ? err.data.message : 'Some error occurred',
                    type: 'error'
                });
                console.error(err);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    input[type='file'] {
        &:before {
            border-radius: 6px !important;
            padding: 0 12px;
        }
    }
</style>
