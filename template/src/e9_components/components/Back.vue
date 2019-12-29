<template>
    <div class="mb16 back">
        <i class="material-icons" @click="back">arrow_back</i>
        <p class="t-xl mb0">\{{ text }}</p>
    </div>
</template>

<script>
export default {
    name: 'Back',
    props: {
        text: {
            type: String,
            required: true
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        }
    }
};
</script>

<style lang="scss" scoped>
    .back {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        i{
            margin-right: 16px;
            font-size: 32px;
            font-weight: 600;
            cursor: pointer;
        }
    }
</style>
