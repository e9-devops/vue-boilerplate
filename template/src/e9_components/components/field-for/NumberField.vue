<template>
    <div>
        <label class="control-label" :for="options.label || property.name"
            v-text="options.label || property.name"></label>
        <div v-if="displayMode === 'CREATE' || displayMode === 'EDIT'">
            <input
                type="number"
                :name="options.label"
                :required="options.required"
                :placeholder="options.placeholder"
                :class="options.customClass"
                :min="options.min"
                :max="options.max"
                v-model="clonedValue.value"
                @keyup="handler"
                class="form-control"
                :disabled="options.disabled"
            />
        </div>
        <p class="form-control-static" v-else-if="displayMode === 'VIEW'" v-text="clonedValue.value"></p>
    </div>
</template>

<script>
export default {
    name: 'NumberField',
    props: {
        options: {
            type: Object
        },
        value: {
            type: Number
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
        handler() {
            this.validate();
            this.$emit('updateValue', this.clonedValue);
        },
        validate() {
            if (this.property) {
                if (this.property.required && !this.clonedValue.value) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'required';
                } else if (this.property.min && this.clonedValue.value < this.property.min) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'below minimum';
                } else if (this.property.max && this.clonedValue.value > this.property.max) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'above maximum';
                } else {
                    this.clonedValue.$invalid = false;
                    this.clonedValue.$error = null;
                }
            }
        }
    },
    computed: {
        isValid() {
            return (
                (!this.options.max ||
                        parseInt(this.clonedValue.value) <= parseInt(this.options.max)) &&
                    (!this.options.min ||
                        parseInt(this.clonedValue.value) >= parseInt(this.options.min))
            );
        }
    },
    created() {
        this.clonedValue.value = this.value || (this.property ? this.property.value : undefined);
        this.options.min = this.options.min || (this.property ? this.property.min : undefined);
        this.options.max = this.options.max || (this.property ? this.property.max : undefined);
        this.handler();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .invalid {
        border: 1px solid red;
    }
</style>
