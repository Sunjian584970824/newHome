<template>
<el-card class="box-card">

    <div class="textItem" v-for="(item,key) in text" :key="key">
        <div class='titleBox'>
            <div> <span class="fontWeight">标题：</span> {{item.title}}</div>
            <el-button type="text" @click="eidet(item)" class="button">编辑</el-button>
            <el-button type="text" @click="deletes(item)" style="color:#f56c6c">删除</el-button>
        </div>
        <div class='content'>
            <span class="fontWeight"> 内容：</span>
            <div class='contetnbox'>
                <span></span> {{item.content}}
            </div>
        </div>
    </div>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            user: {},
            text: [],
        }
    },
    created() {
        let user = localStorage.getItem('user')
        this.user = user ? JSON.parse(user) : {}
        this.sendEmail()
    },
    methods: {
        eidet(item) {
            this.$router.push({
                path: '/suggest',
                query: {
                    isEidet: true
                }
            })
            sessionStorage.setItem('edidt', JSON.stringify(item))
        },
        deletes(item) {
            this.$axios({
                url: 'api/delete',
                data: {
                    id: item._id
                }
            }).then(res => {
                this.sendEmail()
            })
        },
        sendEmail() {
            this.$axios({
                url: 'api/myText',
                data: {
                    email: this.user.email
                }
            }).then(res => {
                this.text = res.data.value.doc
            })

        },
    }
}
</script>

<style lang="less">
#myHome {
    height: 100%;

    .box-card {
        height: 100%;

        .el-card__body {
            padding-top: 0;

            .textItem {
                .titleBox {
                    display: flex;
                    align-items: center;
                    border-bottom: 1px dashed #EBEEF5;

                    div {
                        flex: 1;
                        text-align: left;

                    }
                }

                .fontWeight {
                    font-weight: 1000;
                    color: #000
                }

                .content {
                    padding: 10px 0;
                    border-bottom: 1px solid #EBEEF5;
                    color: rgba(0, 0, 0, .6);

                    .contetnbox {
                        max-height: 100px;
                        overflow: hidden;
                        padding-top: 10px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 5;
                        overflow: hidden;

                        span {
                            display: inline-block;
                            width: 40px;
                        }
                    }
                }
            }
        }

    }

    .el-card__header {
        text-align: center;
        border-bottom: none;
    }
}

@media screen and (max-width: 768px) {

    #myHome {
        height: calc(100% - 8.1875rem);
        overflow: hidden;
    }
}
</style>
