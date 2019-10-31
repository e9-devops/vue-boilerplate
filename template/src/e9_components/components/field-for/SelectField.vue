<template>
    <div>
        <label class="control-label" :for="options.label || property.name" v-text="options.label || property.name"></label>
        <br class="clearfix">
        <div v-if="displayMode === 'EDIT' || displayMode === 'CREATE'">
            <div v-if="options.multiple && typeof items[0] === 'object'" class="multiple">
                <multiselect v-model="selected"
                             :options="items"
                             :multiple="true"
                             track-by="_id"
                             :label="displayField || 'Name'"
                             :close-on-select="true"
                             :clear-on-select="true"
                             :preserve-search="false"
                             select-label=""
                             deselect-label=""
                             @close="handler">
                    <template slot="option" slot-scope="props">
                        <div class="image" v-if="props.option._ImageUrl" :style="{'background-image': 'url(' + props.option._ImageUrl + ')'}"></div>
                        <div class="description">
                            <div class="title">
                                \{{ props.option.Name }}
                            </div>
                            <small class="text-muted" v-if="props.option.Description">
                                \{{ props.option.Description }}
                            </small>
                        </div>
                    </template>
                </multiselect>
            </div>
            <div v-else-if="typeof items[0] === 'object'" class="single">
                <multiselect v-model="selected"
                             :options="items"
                             track-by="_id"
                             :label="displayField || 'Name'"
                             :searchable="!!options.searchable"
                             :close-on-select="true"
                             select-label=""
                             deselect-label=""
                             @close="handler">
                    <template slot="option" slot-scope="props">
                        <div class="image" v-if="props.option._ImageUrl" :style="{'background-image': 'url(' + props.option._ImageUrl + ')'}"></div>
                        <div class="description">
                            <div class="title">
                                \{{ props.option.Name }}
                            </div>
                            <small class="text-muted" v-if="props.option.Description">
                                \{{ props.option.Description }}
                            </small>
                        </div>
                    </template>
                </multiselect>
            </div>
            <div v-else class="single">
                <multiselect v-model="selected"
                             :options="items"
                             :searchable="!!options.searchable"
                             :close-on-select="true"
                             select-label=""
                             deselect-label=""
                             @close="handler">
                </multiselect>
            </div>
        </div>
        <p class="form-control-static" v-else-if="displayMode === 'VIEW' && typeof clonedValue.value === 'string'" v-text="clonedValue.value"></p>
        <p class="form-control-static" v-else-if="displayMode === 'VIEW' && typeof clonedValue.value === 'object'" v-text="clonedValue.value[displayField || 'Name']"></p>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    export default {
        name: 'SelectField',
        props: {
            options: {
                type: Object
            },
            value: {
                type: [String, Array, Object]
            },
            displayMode: {
                type: String
            },
            property: {
                type: Object
            }
        },
        components: {
            Multiselect
        },
        data() {
            return {
                clonedValue: {},
                items: [],
                displayField: '',
                selected: []
            };
        },
        methods: {
            addTag(newTag) {
                this.clonedValue.value.push(newTag);
            },
            displayAs(item) {
                if (item && typeof item === 'object') {
                    return this.displayField || 'Name';
                }
            },
            handler() {
                this.clonedValue.value = this.selected && this.selected['_id'] ? this.selected['_id'] : this.selected;
                this.validate();
                this.$emit('updateValue', this.clonedValue);
            },
            validate() {
                if (this.property) {
                    if (this.property.required && !this.clonedValue.value && !this.multiple) {
                        this.clonedValue.$invalid = true;
                        this.clonedValue.$error = 'required';
                    } else if (this.property.required && !this.clonedValue.value.length && this.multiple) {
                        this.clonedValue.$invalid = true;
                        this.clonedValue.$error = 'required';
                    } else {
                        this.clonedValue.$invalid = false;
                        this.clonedValue.$error = null;
                    }
                }
            }
        },
        created() {
            this.items = this.options.selectFrom || (this.property ? this.property.enum : undefined);
            this.displayField = this.options.displayField;
            if (this.options.multiple) {
                if (this.value) {
                    this.selected = Array.isArray(this.value) ? this.value : [this.value];
                } else if (this.property && this.property.value) {
                    this.selected = Array.isArray(this.value) ? this.property.value : [this.property.value];
                } else {
                    this.selected = [];
                }
            } else {
                if (this.value) {
                    this.selected = this.value;
                } else if (this.property && this.property.value) {
                    this.selected = this.property.value;
                } else {
                    this.selected = undefined;
                }
            }
            this.options.onChangeEvent = this.options.onChangeEvent || function () {};
            this.handler();
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
