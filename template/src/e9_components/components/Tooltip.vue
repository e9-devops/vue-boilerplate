<template>
    <div class="tooltip-wrapper" @mouseover="showInfo(true)" @mouseout="showInfo(false)">
        <slot></slot>
        <span v-show="showTooltip" class="tooltip-info" :style="getPosition">
            \{{ message }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'Tooltip',
    props: {
        message: {
            type: String,
            required: true
        },
        position: {
            type: String,
            default: 'right'
        }
    },
    data() {
        return {
            showTooltip: false
        };
    },
    methods: {
        showInfo(isDisplay) {
            this.showTooltip = isDisplay;
        }
    },
    computed: {
        getPosition() {
            switch (this.position) {
            case 'right':
                return {
                    right: '-10px',
                    top: '50%',
                    transform: 'translate(100%, -50%)',
                };
            case 'left':
                return {
                    left: '-10px',
                    transform: 'translate(-100%)',
                    top: 0
                };
            case 'top':
                return {
                    top: '-10px',
                    left: '50%',
                    transform: 'translate(-50%, -100%)'
                };
            case 'bottom':
                return {
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translate(-50%, 100%)'
                };
            case 'top-right':
                return {
                    right: '-10px',
                    top: 0,
                    transform: 'translateX(100%)'
                };
            case 'bottom-right':
                return {
                    right: '-10px',
                    bottom: 0,
                    transform: 'translateX(100%)'
                };
            case 'top-left':
                return {
                    left: '-10px',
                    top: 0,
                    transform: 'translateX(-100%)'
                };
            case 'bottom-left':
                return {
                    left: '-10px',
                    bottom: 0,
                    transform: 'translateX(-100%)'
                };
            default:
                return {
                    right: '-10px',
                    top: '50%',
                    transform: 'translate(100%, -50%)',
                };
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.tooltip-wrapper {
    position: relative;
    display: inline-block;
    cursor: pointer;
    .tooltip-info {
        z-index: 1000;
        white-space: nowrap;
        color: $base;
        position: absolute;
        border-radius: 6px;
        background: #fff;
        padding: 8px 12px;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
    }
}
</style>
