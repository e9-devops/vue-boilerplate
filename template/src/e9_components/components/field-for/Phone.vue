<template>
    <div class="form-group">
        <label class="control-label" :for="options.label || property.name" v-text="options.label || property.name" v-if="options.label || property.name"></label>
        <div v-if="displayMode === 'EDIT' || displayMode === 'CREATE'">
            <vue-tel-input :dynamic-placeholder="true" default-country="GB" :disabled-fetching-country="true" v-model="clonedValue.value" @input="handler" class="form-control" :country-changed="handler"></vue-tel-input>
        </div>
        <p class="form-control-static" v-else-if="displayMode === 'VIEW'">\{{ clonedValue.value?clonedValue.value:'-' }}</p>
    </div>
</template>

<script>
export default {
    name: 'Phonefield',
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
            clonedValue: {}
        };
    },
    methods: {
        handler(val, obj) {
            this.validate(val, obj);
            this.$emit('updateValue', this.clonedValue);
        },
        validate(val, obj) {
            if (this.property) {
                if (this.property.required && !this.clonedValue.value) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'required';
                } else if (!this.property.required && !this.clonedValue.value) {
                    this.clonedValue.$invalid = false;
                    this.clonedValue.$error = null;
                } else if (obj && !obj.isValid) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'phone';
                } else {
                    this.clonedValue.$invalid = false;
                    this.clonedValue.$error = null;
                }
            }
        }
    },
    created() {
        this.clonedValue.value = this.value || (this.property ? this.property.value : undefined);
        this.handler();
    }
};
</script>

<style lang="scss">
    .vue-tel-input {
        padding: 0 !important;
        .vti {
            &__dropdown {
                &:hover {
                    background-color: transparent !important;
                }
            }
            &__input {
                background-color: $lighter-grey;
            }
        }
    }
</style>
