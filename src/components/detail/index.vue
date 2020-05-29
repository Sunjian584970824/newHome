<template>
<div v-loading="loading" id="detail">
    <div class="flex1" v-if='!isSmallScreen'></div >
    <div class="box">
        <mavon-editor class="mavonEditor" v-model="content" ref="md" :preview="true" boxShadowStyle="0 2px 12px 0 rgba(0, 0, 0, 0.1)" :subfield="false" :toolbarsFlag="false" :navigation="false" defaultOpen="preview" :shortCut="false" :editable="false" />

    </div>
    <div class="flex1" v-if='!isSmallScreen'>
        <div class="comment">
            <div class="redBOX">
                <p v-for="(item,key) in commentDate" :key='key'><span class='user'>{{item.email || 'jack'}}:</span><span class='commentMessage' v-emotion>{{item.comment}}</span>
                <!-- <span class='sendMessage'>回复</span> -->
                 </p>
            </div>
            <emtion @submit="submit"></emtion>

        </div>
    </div>
</div>
</template>

<style lang="less">
#detail {
    display: flex;
    padding-top: 3px;
    height: 100%;

    .flex1 {
        flex: 1;

        .comment {
            flex-direction: column;
            padding: 20px;
            box-sizing: border-box;
            text-align: right;
            display: flex;
            height: 100%;

            .redBOX {

                max-width: 440px;
                flex-grow: 1;
                width: 100%;
                text-align: left;
                padding: 10px;
                box-sizing: border-box;
                background: #fff;
                margin-bottom: 10px;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
                overflow: auto;

                .commentMessage {
                    color: #555;
                    padding: 0 10px;
                    font-size: 14px;
                }

                .user {
                    font-weight: bold;
                }

                .sendMessage {
                    font-size: 14px;
                    color: #66b1ff;

                    &:hover {
                        cursor: pointer
                    }
                }
            }

        }
    }

    .box {
        width: 1000px;
        // margin: 10px auto;
        height: 100%;
        overflow: hidden;
        flex-wrap: wrap;
        display: flex;
        flex-direction: column;

    }

    .mavonEditor {
        width: 100%;
        height: calc(100% - 131px);
        overflow: hidden;
    }
}

@media screen and (max-width: 768px) {
    #detail {
        .box {
            width: 100%;
        }
    }
}
</style>

<script>
import {
    mavonEditor
} from "mavon-editor";
import emtion from "../public/Emotion/Emotion.vue";
import "mavon-editor/dist/css/index.css";
export default {
    data() {
        return {
            content: "",
            id: "",
            loading: true,
            comment: '',
            commentDate: []
        };
    },
    components: {
        mavonEditor,
        emtion
    },
    computed: {
        isSmallScreen(){return this.$store.state.isSmallScreen}
    },
    mounted() {
        this.id = this.$route.params.id;
        this.queryDetail()
    },
    methods: {
        queryComment() {
            this.$axios({
                url: 'api/queryComment',
                data: {
                    id: this.$route.params.id,
                }
            }).then(res => {
                this.commentDate = res.data.value.doc
                this.loading = false;

            })
        },
        submit(inner) {
            let user = JSON.parse(localStorage.getItem('user'))
            this.$axios({
                url: 'api/comment',
                data: {
                    id: this.$route.params.id,
                    comment: inner,
                    email: user.email,
                }
            }).then(() => {
                this.queryComment()
            })
        },

         queryDetail(){
            let res
             this.$axios({
                url: "api/queryDetail",
                data: {
                    id: this.id
                }
            }).then(res => {
             if (res.data.success) {
                this.content =
                    res.data.success && res.data.value.doc ?
                    res.data.value.doc.content :
                    "";
                 this.queryComment()
            }
            });
            

        }
    }
};
</script>
