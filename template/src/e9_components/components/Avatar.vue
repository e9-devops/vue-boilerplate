<template>
    <div class="avatar" :style="dimensions">
        <div class="background-image-holder" :style="color">
            <p class="white" ref="container">\{{ text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Avatar',
    props: {
        text: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            color: {
                'background-color': ''
            },
            unit: 'px'
        };
    },
    computed: {
        dimensions() {
            return {'height': this.height + 'px', 'width': this.width + 'px'};
        }
    },
    mounted() {
        let colours = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'];

        let charIndex = this.text.charCodeAt(0) - 65,
            colourIndex = charIndex % 19;
        this.color['background-color'] = colours[colourIndex];
        let element = this.$refs.container;
        element.style.display = 'inline-block';
        element.style.lineHeight = '1px';
        let fontSize = 60;
        let stepSize = (this.unit === 'px') ? 1 : 0.05;
        element.style.fontSize = fontSize + this.unit;
        while (element.offsetHeight > 1 && fontSize > 22) {
            fontSize -= stepSize;
            element.style.fontSize = fontSize + this.unit;
        }
        element.style.display = null;
        element.style.lineHeight = null;
    }
};
</script>

<style lang="scss" scoped>
    .avatar {
        position: relative;
        display: inline-block;
        .background-image-holder {
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
