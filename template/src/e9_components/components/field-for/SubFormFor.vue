<template>
    <div v-if="model && data">
        <slot :errors="errors" :invalid="invalid"></slot>
    </div>
</template>

<script>
export default {
    name: 'SubFormFor',
    props: {
        modelName: {
            type: String
        },
        data: {
            type: Object,
            default: () => {
                return {};
            }
        },
        displayMode: {
            type: String
        }
    },
    data() {
        return {
            model: null,
            schema: null,
            errors: [],
            invalid: false
        };
    },
    methods: {
        loadModel() {
            return require('@/models/' + this.modelName + '');
        }
    },
    async created() {
        let model = await this.loadModel();
        this.model = model.default;
        this.schema = this.model.schema();
    }
};
</script>

<style scoped>

</style>
