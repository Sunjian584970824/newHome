<template>
<div class='contenteditableBox' @click='fatherClick($event)'>
    <!-- <div contenteditable="true"   ref='contenteditable' class='contenteditable'> {{inner}} </div> -->
    <el-input type="textarea" v-model="inner"  placeholder="请输入内容..."  :rows="5" class='contenteditable' ></el-input>
    <div class='fontIcon'>
        <div style="flex:1"></div>
        <svg style="" t="1584433986680" @click="isShow=!isShow" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1685" width="200" height="200">
            <path d="M249.6 367.2c0 36 29.6 65.6 65.6 65.6s65.6-29.6 65.6-65.6-29.6-65.6-65.6-65.6-65.6 29.6-65.6 65.6zM512 790.4c214.4 0 259.2-194.4 259.2-194.4H252.8S297.6 790.4 512 790.4z" fill="" p-id="1686"></path>
            <path d="M512 1010.4c-274.4 0-497.6-224-497.6-498.4S237.6 14.4 512 14.4s498.4 223.2 498.4 498.4-224 497.6-498.4 497.6zM512 68C267.2 68 68 267.2 68 512s199.2 444 444 444 444-199.2 444-444S756.8 68 512 68z" fill="" p-id="1687"></path>
            <path d="M643.2 367.2c0 36 29.6 65.6 65.6 65.6 36 0 65.6-29.6 65.6-65.6s-29.6-65.6-65.6-65.6c-36 0-65.6 29.6-65.6 65.6z" fill="" p-id="1688"></path>
        </svg>
        <el-button class='submitComment' @click="submit" type="primary">发表评论</el-button>
    </div>
    <div class='emtionBox' v-show='isShow'>
        <img v-for="(item,index) in list" :key="index" @click="emtionBoxClick(index,item)" :src="'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/'+index+'.gif'">
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            inner:'',
            isShow: false,
            text:'',
            list: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']

        }
    },
    methods: {
        emtionBoxClick(index,item) {
            let str=`[${item}]`
             this.inner+=str
        },
        submit(e) {
            this.$emit('submit',this.inner)
        },
        fatherClick(e){
           let tagName=['svg','IMG','path']
            if(!tagName.includes(e.target.tagName)){
             this.isShow=false
            }
        }
    },
}
</script>

<style lang="less" scoped>
.contenteditableBox {
    min-height: 440px;
    max-width: 440px;

    svg {
        width: 24px;
        height: 24px;

        &:hover {
            cursor: pointer
        }

    }

    .emtionBox {
        img:hover {
            cursor: pointer
        }
    }

    .fontIcon {
        display: flex;
        align-items: center;
        padding-top: 10px;
        text-align: right;
    }

    .submitComment {
        margin-left: 10px;
    }

    .contenteditable {
        max-width: 100%;
        // background: #fff;
        // min-height: 150px;
        outline: none;
        padding: 10px;
        box-sizing: border-box;
        unicode-bidi: bidi-override;
        text-align: left;
        padding-top: 20px;

    }
}
</style>
