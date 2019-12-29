<template>
    <div class="checkbox">
        <label class="control-label" v-text="options.label || property.name"></label>
        <br>
        <div>
            <input :class="options.customClass" class="check" type="checkbox" :id="options.label || property.name"
                v-model="clonedValue.value" :disabled="options.disabled || displayMode === 'VIEW'"
                @change="handler" />
            <label class="check-label" :for="options.label || property.name"></label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BooleanField',
    props: {
        options: {
            type: Object
        },
        value: {
            type: String
        },
        displayMode: {
            type: String
        },
        property: {
            type: Object
        }
    },
    data() {
        return {
            clonedValue: {
                value: undefined
            }
        };
    },
    methods: {
        handler() {
            this.$emit('updateValue', this.clonedValue);
        },
    },
    created() {
        this.clonedValue.value =
                this.value !== undefined
                    ? this.value
                    : this.property.value !== undefined ? this.property.value : false;
    }
};
</script>

<style lang="scss" scoped>
    .check {
        display: none;
    }

    .check,
    .check:after,
    .check:before,
    .check *,
    .check *:after,
    .check *:before,
    .check + label.check-label {
        box-sizing: border-box;
    }

    .check::selection,
    .check:after::selection,
    .check:before::selection,
    .check *::selection,
    .check *:after::selection,
    .check *:before::selection,
    .check + label.check-label::selection {
        background: none;
    }

    .check + label.check-label {
        outline: 0;
        display: block;
        margin-top: 5px;
        width: 4em;
        height: 2em;
        position: relative;
        cursor: pointer;
        user-select: none;
    }

    .check + label.check-label:after,
    .check + label.check-label:before {
        position: relative;
        display: block;
        content: "";
        width: 50%;
        height: 100%;
    }

    .check + label.check-label:after {
        left: 0;
    }

    .check + label.check-label:before {
        display: none;
    }

    .check:checked + label.check-label:after {
        left: 50%;
    }

    .check + label.check-label {
        background: $light-grey;
        border-radius: 2em;
        padding: 2px;
        transition: all 0.4s ease;
    }

    .check + label.check-label:after {
        border-radius: 50%;
        background: #fff;
        transition: all 0.2s ease;
    }

    .check:checked + label.check-label {
        background: $brand-primary;
    }

    .check:disabled + label {
        opacity: 0.6 !important;
    }
</style>
