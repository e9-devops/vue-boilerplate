<template>
    <div class="pos-fixed">
        <div class="container-fluid">
            <div class="nav row">
                <div class="col-sm-8">
                    <h3 class="section-title-2 pt24">\{{ $route.name }}</h3>
                </div>
                <div class="col-sm-4">
                    <i class="material-icons pull-right">notifications</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopBar'
};
</script>

<style lang="scss" scoped>
    .pos-fixed {
        position: fixed;
        height: $topbar-height;
        top: 0;
        left: $sidebar-width;
        right: 0;
        z-index: 20;
    }
    .container-fluid {
        background-color: $white;
        border-bottom: 1px solid $lighter-grey;
        position: relative;
        top: -1px;
    }
    .nav {
        height: $topbar-height;
        padding: 0 16px;
        i {
            position: absolute;
            top: 24px;
            right: 16px;
            font-size: 32px;
            color: $light-grey;
            cursor: pointer;
            &:hover {
                color: $brand-primary;
            }
        }
    }
</style>
