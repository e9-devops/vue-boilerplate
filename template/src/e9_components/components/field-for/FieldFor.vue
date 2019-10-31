<template>
    <div class="form-group">
        <component :is="component" :options="options" :value="value" @updateValue="sendValue"
                   :display-mode="$parent.displayMode" :property="property"></component>
        <p class="validation-message" v-if="property && invalid && $parent.displayMode !== 'VIEW'">\{{ validationMessage }}</p>
    </div>
</template>

<script>
    export default {
        name: 'FieldFor',
        props: [
            'field',
            'min',
            'max',
            'type',
            'value',
            'label',
            'required',
            'tabIndex',
            'placeholder',
            'customClass',
            'onChangeEvent',
            'rows',
            'disabled',
            'selectFrom',
            'displayField',
            'searchable',
            'multiple'
        ],
        data() {
            return {
                options: {},
                component: null,
                property: {},
                error: '',
                invalid: false
            };
        },
        methods: {
            sendValue(valueObj) {
                // Model service way
                if (this.property.name) {
                    this.property.value = valueObj.value;
                    this.$parent.for[this.property.name] = valueObj.value;
                    this.invalid = valueObj.$invalid;
                    this.error = valueObj.$error;
                    let found = this.$parent.errors.findIndex(err => err.name === this.property.name);
                    if (found > -1) {
                        this.$parent.errors.splice(found,1);
                    }
                    if (this.invalid) {
                        this.$parent.errors.push({
                            name: this.property.name,
                            error: valueObj.$error
                        });
                    }

                    // Check for subFormFor
                    if (this.$parent.$parent && this.$parent.$parent.errors) {
                        let found = this.$parent.$parent.errors.findIndex(err => err.name === this.property.name);
                        if (found > -1) {
                            this.$parent.$parent.errors.splice(found,1);
                        }
                        if (this.invalid) {
                            this.$parent.$parent.errors.push({
                                name: this.property.name,
                                error: valueObj.$error
                            });
                        }
                        this.$parent.$parent.invalid = this.$parent.$parent.errors.length !== 0;
                    } else
                        this.$parent.invalid = this.$parent.errors.length !== 0;
                } else {
                    // if done through custom way
                    this.$emit('update:value', valueObj.value);
                }
            },
            // Custom Way
            loadFieldComponentFromType() {
                return () => import('./' + this.type + 'Field.vue');
            },
            // Model service way
            loadFieldComponentFromModel() {
                if (this.property.type.name === 'String') {
                    if (this.property.textarea) return () => import('./TextareaField.vue');
                    if (this.property.enum) return () => import('./SelectField.vue');
                    return () => import('./TextField.vue');
                } else if (this.property.type.name === 'Number') {
                    return () => import('./NumberField.vue');
                } else if (this.property.type.name === 'Boolean') {
                    return () => import('./BooleanField.vue');
                } else if (this.property.type.name === 'Date' || this.property.type.name === 'moment') {
                    return () => import('./DateField.vue');
                }
            }
        },
        computed: {
            validationMessage() {
                let errMsg = '';
                if (!this.error)
                    return '';
                switch (this.error) {
                    case 'email':{
                        errMsg = 'Provided email is incorrect';
                        break;
                    }
                    case 'length':{
                        errMsg = 'Length of characters exceeds the allowed limit of ' + this.property.maxlength;
                        break;
                    }
                    case 'required':{
                        errMsg = this.property.name + ' field is a required field';
                        break;
                    }
                    case 'regex': {
                        errMsg = this.property.name + ' is not in the correct format';
                        break;
                    }
                    case 'min': {
                        errMsg = this.property.name + ' must be above ' + (this.property.min - 1);
                        break;
                    }
                    case 'max': {
                        errMsg = this.property.name + ' must be below ' + (this.property.max - 1);
                        break;
                    }
                    default: {
                        errMsg = this.property.name + ' is incorrect';
                    }
                }
                return errMsg;
            }
        },
        created() {
            // Custom way
            if (this.type) {
                this.component = this.loadFieldComponentFromType();
            } else if (this.$parent.schema) {
                // Model service way
                this.property = this.$parent.schema[this.field];
                this.property.name = this.field;
                this.property.value = this.$parent.$props.for[this.field];
                this.component = this.loadFieldComponentFromModel();
            }
            this.options = {...this.$props};
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
