<template>
<div id="app" v-loading='loading'>
    <div class="header " v-if='active===`我`?!isSmallScreen:true'>
        <div class="headerBox lgBox ">
            <div class='user'>
                <img src="./assets/logo.png" alt="">
            </div>
            <div @click='checkRoute("首页")' class="titleTab">
                <div :class="{'activeTitle':true,'active':active==='首页'}">首页</div>
            </div>
            <div @click='checkRoute("发布")' class="titleTab">
                <div :class="{'activeTitle':true,'active':active==='发布'}">发布</div>
            </div>
            <!-- <div @click='checkRoute("提问")' class="titleTab">
                <div :class="{'activeTitle':true,'active':active==='提问'}">提问</div>
            </div> -->
            <!-- <div class='search'>
                <el-input placeholder="搜索" v-model.trim="searchText" suffix-icon='el-icon-search'></el-input>
            </div> -->
            <div @click='checkRoute("音乐")' class="titleTab">
                <div :class="{'activeTitle':true,'active':active==='音乐'}">音乐</div>
            </div>
            <!-- <div @click='checkRoute("给我私信")' class="titleTab">
                <div :class="{'activeTitle':true,'active':active==='给我私信'}">给我私信</div>
            </div> -->
            <div @click='checkRoute("个人中心")' class="titleTab">
                <div :class="{'activeTitle':true,'active':active==='个人中心'}">个人中心</div>
            </div>
        </div>
        <div class='smBox'>
            <div class='user'>
                <img src="./assets/logo.png" alt="">
            </div>
            <div class='phoneSearch'>
                <el-input></el-input>
            </div>
        </div>
    </div>
    <move></move>
    <router-view class='contentBox' :isSmallScreen='isSmallScreen'></router-view>
    <div class='footer smBox' v-if='active===`我`?!isSmallScreen:true' ref='footer'>
        <div class="footerItem" @click='checkRoute("首页")'> 首页 </div>
        <div class="footerItem" @click='checkRoute("发布")'> 发布 </div>
        <div class="footerItem" style='flex:1;text-align: center' v-if="CanEidet.includes($route.name)"> 保存 </div>
        <div class="footerItem" style='flex:1;text-align: center' v-else @click="isSugesst()"> + </div>
        <div class="footerItem" @click='checkRoute("音乐")'> 音乐 </div>
        <div class="footerItem" @click='checkRoute("个人中心")'> 我的 </div>

    </div>
</div>
</template>

<script>
import move from './move'
export default {
    name: 'app',
    components: {
        move
    },
    data() {
        return {
            loading: true,
            searchText: "",
            active: "首页", //当前header状态
            isSmallScreen: true, //当前是否是小屏幕
            CanEidet: ['suggest'],
            suggest: false,
        }
    },
    watch: {
        '$route'(data) {
            this.$nextTick(() => {
                this.active = data.meta.title,
                    this.loading = false
            })
        },

    },
    //   watch:{
    //     $route:{
    //         handler:(val,oldVal)=>{
    //          this.active = data.meta.title
    //          this.loading = data.meta.title
    //         }
    //     },
    //     deep:true
    // },
    mounted() {
        var _this = this
        this.Screen()
        window.onresize = () => {
            _this.Screen()
            // let  height = document.documentElement.clientHeight;
            //  _this.isSmallScreen= height <= 768 ? true:false; //手机不显示编辑器头部栏
            // if (!_this.$refs.footer) return
            // let routeArray = ['suggest'],
            //     route = _this.$route.name,
            //     style = 'none',
            //     height = document.documentElement.clientHeight;
            //     style = routeArray.includes(route) ? 'none' : height <= 768 ? 'flex' : 'none' // 如果当前页面 是suggest 则不显示底部footer否则显示
            //     _this.$refs.footer.style.display = style
        }
      
        this.Screen()
    },

    methods: {
        test(data, str) {
            if (!data || JSON.stringify(data) === '{}' || !str) {
                return undefined
            } else {
              
            }
        },
        isSugesst() {
            console.log(this.$route.path)
            if (this.$route.path === '/') {
                if (this.$store.state.isSmallScreen) {
                    this.$store.commit('isSugesst', !this.$store.state.isSugesst)
                    this.$store.commit('mainBox', !this.$store.state.mainBox)
                } else {
                    this.$store.commit('isSugesst', true)
                    this.$store.commit('mainBox', true)
                }
            } else {
                this.$router.push('/')
                this.$store.commit('isSugesst', true)
                this.$store.commit('mainBox', false)
            }

        },

        Screen() {
            let height = document.documentElement.clientHeight;
            this.height = height
            this.isSmallScreen = height <= 768 ? true : false; //手机不显示编辑器头部栏
            this.$store.commit('isSmallScreen', this.isSmallScreen)
            if (this.$store.state.isSmallScreen) {
                if (this.$store.state.mainBox && this.$store.state.isSugesst) {
                    this.$store.commit('isSugesst', false)
                } else {
                    this.$store.commit('isSugesst', !this.$store.state.mainBox)
                    this.$store.commit('mainBox', !this.$store.state.isSugesst)
                }
            } else {
                this.$store.commit('isSugesst', true)
                this.$store.commit('mainBox', true)
            }
        },
        checkRoute(str) {
            this.active = str;
            var route = '/';
            var routeArray = [{
                    path: '/',
                    title: "首页",
                },
                {
                    path: '/suggest',
                    title: "发布",
                },
                {
                    path: '/music',
                    title: "音乐",
                },
                {
                    path: '/myHome',
                    title: "个人中心",
                },
            ]
            routeArray.forEach(el => {
                if (el.title === str) {
                    route = el.path
                }
            })
            console.log(route)

            if (route === '/' && this.isSmallScreen) {
                console.log('首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页')
                this.$store.commit('isSugesst', false)
                this.$store.commit('mainBox', true)
            }
            this.$router.push(route)

        }
    },

}
</script>

<style lang="less">
@import '../src/assets/index.less';

.contentBox {
    height: calc(100% - 200px);
    box-sizing: border-box;
    // overflow: hidden
}

html,
body,
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
    font-size: 16px;
    color: #1a1a1a;
    background: #f6f6f6;
    -webkit-tap-highlight-color: rgba(26, 26, 26, 0);
}

.smBox {
    .headerBox {
        width: 100% !important;
        display: flex
    }
}

.header {
    position: relative;
    z-index: 100;
    width: 100%;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
    background-clip: content-box;
    line-height: 52px;
    padding: 8px 16px;
    box-sizing: border-box;
    background: #fff;
    height: 71px;
    box-sizing: border-box;

    .headerBox {
        width: 1000px;
        margin: auto;
        display: flex;

        .titleTab {
            padding: 0 20px;

            &:hover {
                color: #175199;
                cursor: pointer;
            }

            .activeTitle {
                height: 100%;
            }

            .active {
                color: black;
                font-weight: 1000;
                border-bottom: 3px solid #0084ff;
            }

        }

        .search {
            flex: 1;
            padding-right: 140px;
            box-sizing: border-box
        }

        .user {
            height: 50px;
            width: 52px;
            // border-radius: 50%;
            overflow: hidden;
            //   box-shadow: 3px 3px   3px rgba(0,0,0,.2);
            position: relative;

            img {
                width: 100%;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .header {
        .headerBox {
            &.lgBox {
                display: none
            }
        }
    }

    .contentBox {
        height: calc(100% - 131px);
        overflow: hidden;
    }

    .footer {
        position: fixed;
        bottom: 0px;
        width: 100%;
        border-top: rgba(10, 10, 10, .1);
        box-shadow: 3px 0 10px rgba(26, 26, 26, .1);
        background: #fff;
        box-sizing: border-box;
        padding: 0 20px;
        display: flex;
        height: 60px;
        z-index: 2000;

        .footerItem {
            line-height: 60px;
            padding: 0 20px
        }
    }

    .smBox {
        display: flex;

        .phoneSearch {
            padding: 0 20px;
            box-sizing: border-box;
            flex: 1
        }

        .user {
            width: 50px;
            height: 50px;
            // border-radius: 50%;
            overflow: hidden;

            img {
                width: 100%
            }

        }
    }

}

;
</style>
