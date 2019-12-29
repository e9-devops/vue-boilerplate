<template>
    <div v-if="model && data" autocomplete="off">
        <slot :invalid="invalid" :errors="errors"></slot>
    </div>
</template>

<script>
export default {
    name: 'FormFor',
    props: ['displayMode', 'modelName', 'data'],
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
