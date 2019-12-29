<template>
    <div class="range-wrapper">
        <slot></slot>
        <div class="range-slider">
            <input :min="minValue" :max="maxValue" v-model="rangeValue[0]" type="range">
            <input :min="minValue" :max="maxValue" v-model="rangeValue[1]" type="range">
            <div class="range-values">
                <span class="float-left mt16">\{ rangeValue[0] }}</span>
                <span class="float-right mt16">\{{ rangeValue[1] }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Range',
    props: {
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        },
        steps: {
            type: Number,
            default: 1
        },
        range: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            maxValue: this.max,
            minValue: this.min,
            stepValue: this.steps,
            rangeValue: this.range
        };
    }
};
</script>

<style lang="scss" scoped>
.range-wrapper {
    height: 32px;
    margin: 16px 0;
    .range-slider {
        position: relative;
        width: 100%;
        input[type='range'] {
            pointer-events: none;
            -webkit-appearance: none;
            position: absolute;
            width: 100%;
            height: 4px;
            cursor: pointer;
            &:focus {
                outline: 0;
            }
            &::-webkit-slider-runnable-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                background-color: $brand-primary;
                border: 0;
                border-radius: 2px;
            }
            &::-webkit-slider-thumb {
                pointer-events: all;
                border: 0;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: $white;
                box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.4);
                cursor: pointer;
                -webkit-appearance: none;
                top: 50%;
                position: relative;
                transform: translateY(-50%);
                z-index: 1;
                &:hover {
                    background: $brand-primary;
                }
            }
        }
    }
}
</style>
