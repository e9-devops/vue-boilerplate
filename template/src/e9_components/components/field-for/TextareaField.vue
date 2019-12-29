<template>
    <div>
        <label class="control-label" :for="options.label || property.name"
            v-text="options.label || property.name"></label>
        <div v-if="displayMode === 'CREATE' || displayMode === 'EDIT'">
            <textarea
                :name="options.label"
                :class="options.customClass"
                :required="options.required"
                :placeholder="options.placeholder"
                :disabled="options.disabled"
                :rows="options.rows || (property && property.textarea) || 3"
                v-model="clonedValue.value"
                @keyup="handler"
                class="form-control"
            ></textarea>
        </div>
        <p class="form-control-static pre" v-text="clonedValue.value" v-else-if="displayMode === 'VIEW'"></p>
    </div>
</template>

<script>
export default {
    name: 'Textareafield',
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
        handler() {
            this.validate();
            this.$emit('updateValue', this.clonedValue);
        },
        validate() {
            if (this.property) {
                if (this.property.required && !this.clonedValue.value) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'required';
                } else if (this.property.regex && this.property.regex.test(this.clonedValue.value)) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'regex';
                } else if (this.property.maxlength && (!this.clonedValue.value || this.clonedValue.value.length > this.property.maxlength)) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'length';
                } else {
                    this.clonedValue.$invalid = false;
                    this.clonedValue.$error = null;
                }
            }
        }
    },
    created() {
        this.clonedValue.value = this.value || this.property.value;
        this.handler();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pre {
        white-space: pre;
    }
</style>
