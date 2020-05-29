<template>
<div class="suggest">
    <div class="suggest">
        <input class="titleInput" type="text" v-model="title" placeholder="标题" />
        <mavon-editor v-model="content" :subfield="toolbars.subfield" :toolbars="toolbars" ref="md" @imgAdd="imgAdd" @change="changefocus" @imgDel="imgDel" />
        <div class="submitBox lgBox" style="display:flex;padding-top:15px;">
            <div style="flex:1"></div>
            <el-button>暂存草稿</el-button>
            <el-button ref='saveSubmit' @click="submit">提交</el-button>
        </div>
    </div>
</div>
</template>

<script>
import {
    mavonEditor
} from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
    props: {
        isSmallScreen: {
            default: true,
            type: Boolean
        },
        isSaveMethod: {
            default: false,
            type: Boolean
        }
    },
    components: {
        mavonEditor
    },
    data() {
        return {
            title: '',
            content: "",
            titleImage: '',
            //https://www.npmjs.com/package/mavon-editor  api使用帮助
            // toolbarsFlag:true,//是否显示工具栏
            toolbars: {
                bold: true, // 粗体
                italic: false, // 斜体
                underline: false, // 下划线
                strikethrough: false, // 中划线
                mark: false, // 标记
                superscript: false, // 上角标
                subscript: false, // 下角标
                quote: false, // 引用
                ol: false, // 有序列表
                ul: false, // 无序列表
                link: false, // 链接
                table: false, // 表格

                htmlcode: false, // 展示html源码
                help: false, // 帮助
                /* 1.3.5 */
                undo: false, // 上一步
                redo: false, // 下一步
                save: false, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: false, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: false, // 单双栏模式
                preview: true, // 预览
                trash: true, // 清空
                header: true, // 标题
                imagelink: true, // 图片链接
                code: true, // code
                fullscreen: true, // 全屏编辑
                readmodel: true // 沉浸式阅读
            }
        };
    },
    watch: {
        isSaveMethod() {
            this.submit()
        },
        isSmallScreen(data) {
            //小屏幕下编辑的状态
            this.$set(this.toolbars, "subfield", !data);
            this.$set(this.toolbars, "readmodel", !data);
            this.$set(this.toolbars, "trash", !data);
            this.$set(this.toolbars, "fullscreen", !data);
        }
    },
    methods: {
        submit() {
            let message = !this.title ? '请输入标题' : !this.content ? '请输入内容' : '';
            if (message) {
                this.$message.error(message);
            } else {
                let user = JSON.parse(localStorage.getItem('user'))
                let obj = {
                    title: this.title,
                    content: this.content,
                    email: user.email,
                    titleImage: this.titleImage
                }
                let url = this.$route.query.isEidet ? 'api/updateText' : 'api/centerFile';
                this.$axios({
                    url: url,
                    data: obj
                }).then(res => {
                    if (res.data.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '保存成功',
                            type: 'success'
                        });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: res.data.message
                        });
                    }
                })
            }
        },

        changefocus() {
            let u = navigator.userAgent,
                app = navigator.appVersion;
            let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
            if (isAndroid) {
                setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                    document.activeElement.scrollIntoView();
                }, 500);
            }
        },
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        imgAdd(e, file) {
            var el = file
            var url = this.getObjectURL(el)
            this.src = url
            var param = new FormData(); //创建form对象
            param.append('image', el, el.name); //通过append向form对象添加数据

            this.$axios({
                url: 'api/img',
                data: param,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                this.$refs.md.$img2Url(e, `${this.$locationUrls}${res.data}`);
                if (!this.titleImage) {
                    this.titleImage = `${this.$locationUrls}${res.data}`
                }
            })
        },
        change() {},
        imgDel() {},
        ScreenChange() {
            var data = this.isSmallScreen;
            this.$set(this.toolbars, "subfield", !data);
            this.$set(this.toolbars, "readmodel", !data);
            this.$set(this.toolbars, "trash", !data);
            this.$set(this.toolbars, "fullscreen", !data);
        }
    },

    created() {
        if (this.$route.query.isEidet) {
            let content = sessionStorage.getItem('edidt')
            content = content ? JSON.parse(content) : content;
            this.content = content.content
            this.title = content.title
        } else {
            sessionStorage.clear('edidt')
        }

    },
    mounted() {
        this.ScreenChange();
        this.$nextTick(() => {
            var btn = document.getElementsByTagName("button");
            var textArray = ["编辑 (F9)", "预览 (F9)"];
            btn.forEach(element => {
                if (textArray.includes(element.title)) {
                    element.innerHTML = element.title;
                    element.style.width = "auto";
                }
            });
        });
    }
};
</script>

<style lang="less">
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper {
    height: 100%;
    box-sizing: border-box
}

.v-note-wrapper {
    height: calc(100% - 60px);

    // height: calc(100% - 50px);
    .v-note-pane {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        height: calc(100% - 40px);
    }
}
</style><style lang="less" scoped>
.fa-mavon-eye:before {
    content: "";
}

.suggest {
    padding: 24px;
    box-sizing: border-box;
    overflow: unset;

    .suggest {
        height: 100%
    }

    .titleInput {
        border: none;
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        box-sizing: border-box;
        outline: none;
        height: 50px;
    }
}

@media screen and (max-width: 768px) {
    .suggest {
        padding: 0;

        input.titleInput {
            background: transparent;
            border-bottom: 1px solid #bbb;
        }
    }
}
</style>
