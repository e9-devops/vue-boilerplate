<template>
    <div class="sidebar">
        <div id="profile">
            <div class="profile-box-small">
                <div class="picture">
                    <img src="@/assets/images/profile.jpg" alt="user" />
                </div>
                <div class="info">
                    <h4 class="title">
                        \{{ getUser().Owner.Title }}
                    </h4>
                    <h6 class="subtitle">
                        <a href="" class="grey" @click="logout">Logout</a>
                    </h6>
                </div>
            </div>
        </div>
        <div id="navigation">
            <ul class="menu">
                <li v-for="(route,key) in $store.state.sideBarModule.menuItems" :key="key" :class="{'flex-wrap': route.subItems}">
                    <router-link v-if="!route.subItems" :to="route.path" active-class="active">
                        <a>
                            <i class="material-icons">\{{ route.icon || 'No icon' }}</i>
                            <span v-text="route.name"></span>
                        </a>
                    </router-link>
                    <a v-else @click="expandNav(route)">
                        <i class="material-icons">\{{ route.icon || 'No icon' }}</i>
                        <span v-text="route.name"></span>
                    </a>
                    <ul class="sub-nav" v-if="route.subItems && route.expanded" :class="{'open': route.expanded}">
                        <router-link tag="li" :to="subRoute.path" active-class="active" v-for="(subRoute,subKey) in route.subItems" :key="subKey">
                            <a>
                                <span v-text="subRoute.name"></span>
                            </a>
                        </router-link>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'SideBarLeft',
    data() {
        return {
            routes: []
        };
    },
    methods: {
        expandNav(route) {
            route.expanded = !route.expanded;
        },
        logout() {

        },
        ...mapGetters(['getUser'])
    },
    created() {

    }
};
</script>

<style lang="scss" scoped>
.sidebar {
    position: fixed;
    display: flex;
    flex-flow: column nowrap;
    width: $sidebar-width;
    top: 0;
    height: 100%;
    border-right: 1px solid $lighter-grey;
    background-color: $white;
    #profile {
        padding: 16px;
        background-color: $white;
        .profile-box-small {
            .picture {
                display: table-cell;
                vertical-align: top;
                padding-right: 15px;
                img {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                }
            }
            .info {
                padding-top: 4px;
                display: table-cell;
                vertical-align: top;
                h4 {
                    font-size: 14px;
                    font-weight: 500;
                    margin: 0;
                    margin-bottom: 5px;
                }
                h6 {
                    font-size: 12px;
                    font-weight: 400;
                    margin: 0;
                }
            }
        }
    }
    .menu {
        @include list-unstyled();
        margin: 40px 0 0;
        width: 100%;

        li {
            width: 100%;
            height: 40px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &:hover {
                background-color: $lighter-grey;
            }
            a {
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
                width: inherit;
                height: 100%;
                flex-basis: 100%;
                i,
                span {
                    color: $light-grey;
                    margin-left: 24px;
                    width: 24px;
                }
                &.active {
                    background-color: mix($black, $brand-primary, 10%);
                    box-shadow: 0 1px 4px 0 mix($white, $brand-primary, 20%);
                    a {
                        i,span {
                            color: $white;
                        }
                    }
                }
            }
            ul.sub-nav {
                overflow: hidden;
                position: relative;
                height: 0;
                width: 100%;
                padding-left: 0;
                background-color: #eee ;
                &.open {
                    height: auto;
                }
                > li {
                    margin-left: 36px;
                    border-left: 1px solid $brand-secondary;
                    display: block;
                    height: 40px;
                    &:hover {
                        background-color: #eee;
                    }
                    > a {
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: flex-start;
                        align-items: center;
                        width: inherit;
                        position: relative;
                        i {
                            margin-right: 5px;
                            color: #ddd;
                        }
                        span {
                            margin-left: 36px;
                        }
                        &::before {
                            content: '';
                            position: absolute;
                            width: 5px;
                            height: 5px;
                            left: -3px;
                            top: 50%;
                            background-color: #9fa8bc;
                            margin-top: -3px;
                            border-radius: 50px;
                        }
                        &::after {
                            content: '';
                            width: 30px;
                            height: 30px;
                            border: 1px solid $brand-secondary;
                            position: absolute;
                            left: -15px;
                            top: 50%;
                            margin-top: -15px;
                            border-radius: 50px;
                            opacity: 0;
                        }
                        &:hover {
                            &::after {
                                opacity: 1;
                                border-color: $brand-secondary;
                                width: 11px;
                                height: 11px;
                                left: -6px;
                                margin-top: -6px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
