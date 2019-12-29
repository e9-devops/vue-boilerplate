<template>
    <div>
        <div class="row">
            <div class="col-sm-8">
                <div v-if="rData && rData.Name">
                    <Back :text="rData.Name"></Back>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8">
                <b-nav tabs>
                    <b-nav-item v-for="(tab,key) in tabs" :to="tab.path" :key="key" active-class="active">
                        {{ tab.name }}
                    </b-nav-item>
                </b-nav>
            </div>
        </div>
        <div v-if="rData && !$route.meta.isKeepAlive">
            <router-view></router-view>
        </div>
        <div v-else-if="rData && $route.meta.isKeepAlive">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import Back from '@/e9_components/components/Back';
export default {
    name: 'ModuleItemLayout',
    props: {
        tabs: {
            type: Array,
            required: true
        },
        rData: {
            required: true
        }
    },
    components: {Back}
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
    .nav {
        .nav-item {
            margin: 0 16px 0 0 !important;
        }
    }
</style>
