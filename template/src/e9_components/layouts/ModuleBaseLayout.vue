<template>
    <div class="pt16">
        <div class="row">
            <div class="col-sm-6">
                <h3 class="section-title mb16" v-if="$route.meta.isSideBar && !$route.meta.isHide">{{ $route.name }}</h3>
            </div>
            <div class="col-sm-6" v-if="$route.meta.isKeepAlive">
                <router-view name="options" class="float-right"></router-view>
            </div>
            <div class="col-sm-6" v-else>
                <keep-alive>
                    <router-view name="options" class="float-right"></router-view>
                </keep-alive>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Layout'
};
</script>

<style scoped>
</style>
