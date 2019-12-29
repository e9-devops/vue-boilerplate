<template>
    <div class="stepper bg--grey">
        <div class="stepper-item" v-for="(step,key) in steps" :key="key">
            <div class="stepper-item-bar" :class="{'completed': step.index <= current}">
                <div class="stepper-item-bar-number"></div>
            </div>
            <span class="stepper-item-name">\{{ step.name }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Stepper',
    props: ['steps','current']
};
</script>

<style scoped lang="scss">
    .stepper {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100px;
        &-item {
            position: relative;
            width: 100%;
            text-align: center;
            &-bar {
                position: absolute;
                top: -16px;
                height: 8px;
                width: 100%;
                background-color: #ddd;
                &-number {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background-color: #ddd;
                    position: relative;
                    margin: 0 auto;
                    top: -6px;
                }
                &.completed {
                    background-color: $brand-primary;
                    .stepper-item-bar-number {
                        background-color: $brand-primary;
                    }
                }
            }
            &:first-child{
                .stepper-item-bar {
                    right: 0;
                    width: 50%;
                    &-number {
                        margin-left: -2px;
                    }
                }
            }
            &:last-child {
                .stepper-item-bar {
                    left: 0;
                    width: 50%;
                    &-number {
                        margin-right: -2px;
                    }
                }
            }
            &-name {
                font-size: 16px;
                font-family: $font-family-heading;
                font-weight: 500;
                position: relative;
                top: 8px;
            }
        }
    }
</style>
