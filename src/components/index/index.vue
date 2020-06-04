<template>
<div class="content" id="index">
    <!-- 

<script src='https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js'></script>-->

    <div class="flex1" v-show="mainBox"></div>
    <div class="mainBox" v-show="mainBox">
        <div class="left smBoxWidth">
            <!-- <div class="header">
                <span :class="{'active':titleITem==='推荐'}" @click="titleITem='推荐'">推荐</span>
                <span :class="{'active':titleITem==='热度'}" @click="titleITem='热度'">热度</span>
                <span :class="{'active':titleITem==='更多'}" @click="titleITem='更多'">前端交流圈</span>
        </div>-->
            <div class="contentItem" v-for="(item,key) in contentList " :key="key" @click="clickDetail(item)">
                <h1>{{item.title}}</h1>
                <div class="itemContent">
                    <!-- <div class="image" v-if="item.titleImage">
                        <img :src="item.titleImage" alt />
                    </div> -->
                    <div class="titleContent">
                        <mavon-editor v-model="item.content" :imageFilter="imageFilter" class="mavonEditor" boxShadowStyle="none" defaultOpen="preview" ref="md" :subfield="false" :toolbarsFlag="false" :navigation="false" :shortCut="false" :editable="false" />
                    </div>
                </div>
                <!-- <div class="bottom">
                    <span>赞</span>
                    <span>赞</span>
                    <span>赞</span>
                </div> -->
            </div>
            <!-- <div class="contentItem" v-for="(item,key) in contentList " :key='key' @click="clickDetail">
                <h1>奇门遁甲基础符号大全，一篇文章就够了</h1>
                <div class='itemContent'>
                    <div class='image'>
                        <img src="../../assets/logo.png" alt="">
                    </div>
                    <div class="titleContent">
                        糖果： 这篇文章我花了大概一星期的时间整理，希望对感兴趣的你有所帮助，我还有大量学习精华资料，如果你感兴趣，点赞关注加收藏，我愿毫无保留的全部发给你。
                    </div>

                </div>
                <div class='bottom'>
                    <span>赞</span>
                    <span>赞</span>
                    <span>赞</span>
                </div>
        </div>-->
            <div class="noMore">没有更多了</div>
        </div>
    </div>
    <div class="flex1" v-show="isSugesst">
        <div class="takBox">
            <h2>及时聊天室</h2>
            <div class="messBox">
                <div v-for="(item,key) in message" :key="key">
                    {{item.user}}说：
                    <span v-emotion>{{item.message}}</span>
                </div>
            </div>
        </div>
        <div class="submitBox">
            <div class="emtionBox" v-show="isShow">
                <img v-for="(item,index) in list" :key="index" @click="emtionBoxClick(index,item)" :src="'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/'+index+'.gif'" />
            </div>
            <svg style t="1584433986680" @click="isShow=!isShow" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1685" width="24" height="24">
                <path d="M249.6 367.2c0 36 29.6 65.6 65.6 65.6s65.6-29.6 65.6-65.6-29.6-65.6-65.6-65.6-65.6 29.6-65.6 65.6zM512 790.4c214.4 0 259.2-194.4 259.2-194.4H252.8S297.6 790.4 512 790.4z" fill p-id="1686" />
                <path d="M512 1010.4c-274.4 0-497.6-224-497.6-498.4S237.6 14.4 512 14.4s498.4 223.2 498.4 498.4-224 497.6-498.4 497.6zM512 68C267.2 68 68 267.2 68 512s199.2 444 444 444 444-199.2 444-444S756.8 68 512 68z" fill p-id="1687" />
                <path d="M643.2 367.2c0 36 29.6 65.6 65.6 65.6 36 0 65.6-29.6 65.6-65.6s-29.6-65.6-65.6-65.6c-36 0-65.6 29.6-65.6 65.6z" fill p-id="1688" />
            </svg>
            <el-input type="textarea" v-model="inner" ref="text" @keydown.native="innerInput($event)" placeholder="请输入内容..." :rows="5" class="contenteditable"></el-input>
            <el-button class="buttonSubmit" @click="submitSocket">发送</el-button>
        </div>
    </div>
</div>
</template>

<script>
import jwt from "jsonwebtoken";
import emtion from "../public/Emotion/Emotion.vue";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  data() {
    return {
      isShow: false,
      titleITem: "推荐", //title选择项
      loading: true, //页面loading
      contentList: [],
      message: [],
      inner: "",
      list: [
        "微笑",
        "撇嘴",
        "色",
        "发呆",
        "得意",
        "流泪",
        "害羞",
        "闭嘴",
        "睡",
        "大哭",
        "尴尬",
        "发怒",
        "调皮",
        "呲牙",
        "惊讶",
        "难过",
        "酷",
        "冷汗",
        "抓狂",
        "吐",
        "偷笑",
        "可爱",
        "白眼",
        "傲慢",
        "饥饿",
        "困",
        "惊恐",
        "流汗",
        "憨笑",
        "大兵",
        "奋斗",
        "咒骂",
        "疑问",
        "嘘",
        "晕",
        "折磨",
        "衰",
        "骷髅",
        "敲打",
        "再见",
        "擦汗",
        "抠鼻",
        "鼓掌",
        "糗大了",
        "坏笑",
        "左哼哼",
        "右哼哼",
        "哈欠",
        "鄙视",
        "委屈",
        "快哭了",
        "阴险",
        "亲亲",
        "吓",
        "可怜",
        "菜刀",
        "西瓜",
        "啤酒",
        "篮球",
        "乒乓",
        "咖啡",
        "饭",
        "猪头",
        "玫瑰",
        "凋谢",
        "示爱",
        "爱心",
        "心碎",
        "蛋糕",
        "闪电",
        "炸弹",
        "刀",
        "足球",
        "瓢虫",
        "便便",
        "月亮",
        "太阳",
        "礼物",
        "拥抱",
        "强",
        "弱",
        "握手",
        "胜利",
        "抱拳",
        "勾引",
        "拳头",
        "差劲",
        "爱你",
        "NO",
        "OK",
        "爱情",
        "飞吻",
        "跳跳",
        "发抖",
        "怄火",
        "转圈",
        "磕头",
        "回头",
        "跳绳",
        "挥手",
        "激动",
        "街舞",
        "献吻",
        "左太极",
        "右太极"
      ]
    };
  },
  components: {
    mavonEditor,
    emtion
  },
  created() {
    // setTimeout(() => {
    this.$axios({
      url: "api/queryIndexList"
    }).then(res => {
      this.contentList = res.data.value.doc;
      this.loading = false;
    });
  },
  computed: {
    mainBox() {
      return this.$store.state.mainBox;
    },
    isSugesst() {
      return this.$store.state.isSugesst;
    }
  },
  mounted() {
         this.$socket.emit("online", true);
         this.sockets.listener.subscribe('online', (data) => {
   this.socketMethod(data)
  })
  },
  sockets: {
    online(data) {
      this.socketMethod(data)
    }
  },
  methods: {
    socketMethod(data) {
          let user = localStorage.getItem("user");
      var token = localStorage.getItem("token");
      let NowUser;
      data.map(item => {
        if (item.token == token) {
          NowUser = item;
        }
      });
      if (NowUser) {
        localStorage.setItem("user", JSON.stringify({ email: NowUser.user }));
      } else {
      }
      this.message = data;
    },
    innerInput(e) {
      if (e.code === "Enter") {
        this.submitSocket();
      }
    },
    submitSocket() {
      let user = localStorage.getItem("user");
      var token = localStorage.getItem("token");
      if (!token) {
        token = jwt.sign(
          { foo: "bar", exp: Math.floor(Date.now() / 1000) + 60 * 60 },
          this.inner
        );
        localStorage.setItem("token", token);
        localStorage.setItem("youke", true);
      }
      let obj = {
        user: user ? JSON.parse(user).email : user,
        message: this.inner,
        token: token
      };
      this.$socket.emit("online", obj);
      this.inner = "";
      // 发送上线事件
    },
    emtionBoxClick(index, item) {
      let str = `[${item}]`;
      this.inner += str;
    },
    submit() {},
    imageFilter(item) {
      return false;
    },
    clickDetail(item) {
      this.$router.push({
        path: "/detail/" + item._id
      });
    }
  }
};
</script>

<style lang="less">
#index {
    .titleContent {
        img {
            display: none;
        }
    }

    .submitBox {
        height: 230px;
        position: relative;

        .buttonSubmit {
            position: absolute;
            right: 10px;
            bottom: 10px;
        }

        .contenteditable {
            .el-textarea__inner {
                border: none;
                outline: none;
            }
        }
    }

    .v-show-content.scroll-style.scroll-style-border-radius {
        overflow: hidden;
    }
}
</style><style lang="less" scoped>
@import "../../assets/card.less";
@import "../../assets/index.less";

@media screen and (max-width: 768px) {

    // 小屏幕
    #index {
        padding: 0;
    }

    .content {
        .mainBox {
            width: 100% !important;

            .smBoxWidth {
                &.left {
                    width: 100%;

                    .contentItem {
                        h1 {
                            text-overflow: -o-ellipsis-lastline;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }

                        .itemContent {
                            .image {
                                width: 73px;
                            }

                            .titleContent {
                                text-overflow: -o-ellipsis-lastline;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 4;
                                line-clamp: 4;
                                -webkit-box-orient: vertical;
                                line-height: 1.77;
                            }
                        }
                    }
                }
            }
        }
    }
}

.content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 0 20px;
    padding-bottom: 60px;
    display: flex;
    overflow: hidden;

    .flex1 {
        flex: 1;
        height: 100%;
        flex-direction: column;
        padding: 10px 0 20px 10px;
        box-sizing: border-box;
        display: flex;

        .submitBox {
            position: relative;
            background: #fff;
            padding: 10px;
            box-sizing: border-box;
            height: 170px !important;

            svg:hover {
                cursor: pointer;
            }

            .emtionBox {
                position: absolute;
                left: 0;
                top: -130px;
                right: 0;
                height: 130px;
                overflow: auto;

                img:hover {
                    cursor: pointer;
                }
            }
        }

        .takBox {
            // height: 100%;
            max-height: calc(100% - 290px);
            overflow: hidden;
            width: 100%;
            box-sizing: border-box;
            background: #ddd;
            padding: 10px;
            flex-grow: 1;
            padding-top: 10px;
            box-sizing: border-box;

            .messBox {
                overflow: auto;
                height: calc(100% - 16px);
            }

            h2 {
                text-align: center;
                // margin-bottom: 20px;
                // position: absolute;
                // top:20px;
                // left: 50%;
                // transform: translateX(-50%)
            }
        }
    }

    .mainBox {
        display: flex;
        // width: 1000px;
        background: #fff;
        margin: 10px 0;
        height: calc(100% - 20px);
        overflow: auto;

        .left {
            width: 700px;
            box-sizing: border-box;
            background: #fff;

            .noMore {
                text-align: center;
                line-height: 50px;
                margin-bottom: 140px;
            }

            .bottom {
                padding: 10px 20px;
                display: flex;

                span {
                    margin-left: 24px;
                    font-size: 14px;
                }
            }

            .header {
                display: flex;
                border-bottom: 1px solid #f6f6f6;
                height: 58px;
                z-index: 10;

                .active {
                    color: #0084ff;
                }

                span {
                    align-items: center;
                    display: flex;
                    font-size: 16px;
                    margin: 0 22px;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }

            .contentItem {
                box-shadow: none;
                border-bottom: 1px solid #f0f2f7;
                // padding: 20px;
                margin-bottom: 2px;
                box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

                h1 {
                    font-size: 18px;
                    font-weight: 600;
                    font-synthesis: style;
                    line-height: 1.6;
                    color: #1a1a1a;
                    margin-top: -4px;
                    margin-bottom: -4px;
                }

                .itemContent {
                    display: flex;
                    padding: 10px;

                    .image {
                        width: 190px;
                        height: 105px;
                        overflow: hidden;

                        img {
                            width: 100%;
                        }
                    }

                    .titleContent {
                        // padding-left: 25px;
                        width: 100%;
                        box-sizing: border-box;
                        flex: 1;
                        letter-spacing: 2px;
                        line-height: 1.67;
                        color: #646464;
                        word-break: break-word;
                        word-wrap: break-word;
                        white-space: -hp-pre-wrap;
                        white-space: -o-pre-wrap;
                        white-space: -pre-wrap;
                        white-space: -moz-pre-wrap;
                        white-space: pre;
                        white-space: pre-wrap;
                        white-space: pre-line;

                        .mavonEditor {
                            box-shadow: none;
                            min-height: 0;
                            max-height: 300px;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
    }
}
</style>
