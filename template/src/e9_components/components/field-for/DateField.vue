<template>
    <div>
        <label class="control-label" :for="options.label || property.name"
            v-text="options.label || property.name"></label>
        <div v-if="displayMode === 'EDIT' || displayMode === 'CREATE'">
            <flat-pickr v-model="formattedValue" :config="{...config, ...options.calendarConfig, ...property.calendarConfig}" class="form-control datepicker" :placeholder="options.placeholder || 'DD/MM/YYY'" ref="calendar"></flat-pickr>
        </div>
        <p class="form-control-static" v-else-if="displayMode === 'VIEW'">\{{ clonedValue.value | formatDate('DD/MM/YYYY') }}</p>
    </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
export default {
    name: 'DateField',
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
    components: {
        flatPickr
    },
    data() {
        let vm = this;
        return {
            clonedValue: {},
            formattedValue: null,
            config: {
                dateFormat: 'd/m/Y',
                showNonCurrentDates: false,
                onChange: () => {
                    vm.clonedValue.value = vm.$refs.calendar.fp.selectedDates[0];
                    vm.handler();
                }
            },
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
                } else {
                    this.clonedValue.$invalid = false;
                    this.clonedValue.$error = null;
                }
            }
        }
    },
    created() {
        this.clonedValue.value = this.value || (this.property ? this.property.value : undefined);
        this.formattedValue = this.clonedValue.value;
        this.handler();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .form-control {
        background-color: #fff !important;
    }
</style>
