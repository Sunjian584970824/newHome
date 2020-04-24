<template>
<div class="music">
    <div class="list">
        <div class="listItem" @click="changeMusic(key)" v-for="(item,key) in musicFile" :key='key' style="    align-items: center">
            <div class="sinngerImg">
                <i v-if='index===key' class="el-icon-caret-right"></i>
            </div>
            <div class="sinngStatu">
                <p class='sinngName'>{{item.replace('.mp3','')}}</p>
            </div>
        </div>
    </div>
    <div class='footerPlay'>
        <div ref='videoBox'>
            <!-- <audio controls ref='audio' style="display:block">  <source :src="musicSrc">   </audio>   -->

        </div>
        <!-- <source src="../../assets/music/周杰伦 - 安静.mflac" type="audio/mpeg"> -->
        <div class="listItem">
            <div class="sinngerImg">
            </div>
            <div class="sinngStatu" style="flex:1">
                <p class='sinngName'>{{musicFile[index]}}</p>
                <!-- <p class='siinngerName'>周杰伦</p> -->
            </div>
            <div class="playBox">
                <div class="flex1"></div>
                <div>
                    <img class='svgImg rotateX' src="../../assets/image/next.svg" @click='frontMusic' alt="">
                    <img class='svgImg ' v-if="!stop" @click="playMusic" src="../../assets/image/play.svg" alt="">
                    <img class='svgImg ' v-else @click="stopMusic" src="../../assets/image/stop.svg" alt="">
                    <img class='svgImg'   @click='next' src="../../assets/image/next.svg" alt="">
                </div>
                <div class="flex1"></div>

            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    computed: {
        isSmallScreen() {
            return this.$store.state.isSmallScreen
        },

    },
    data() {
        return {
            musicFile: [],
            index: 0,
            musicSrc: '',
            stop: false,
        }
    },
    created() {
        this.play()
    },
    methods: {
        frontMusic() {
            if(this.index===0){
                return
            }
            this.index--;
            this.musicSrc=this.musicFile[this.index]
            this.htmlPubic()
                this.playMusic()
        },
          next() {
            if(this.index===this.musicFile.length){
                return
            }
            this.index++;
            this.musicSrc=this.musicFile[this.index]
            this.htmlPubic()
            this.playMusic()
        },
        play() {
            this.$axios({
                url: 'api/music',
            }).then(res => {
                let musicFile = res.data.value;
                this.musicFile = musicFile
                this.musicSrc = `${this.$locationUrls}/music/${musicFile[0]}`
                var html = `  <audio controls id='audio' style="display:none">  <source src="${this.musicSrc}">   </audio>  `
                this.$refs.videoBox.innerHTML = html
                sessionStorage.setItem('sj_musicFile', JSON.stringify(musicFile))
            })
        },
        playMusic() {
            this.stop = true
            let audio = document.getElementById('audio')
            audio.play()

        },
        htmlPubic() {
            this.musicSrc = `${this.$locationUrls}/music/${this.musicFile[ this.index]}`
            var html = `  <audio controls id='audio' style="display:none">  <source src="${this.musicSrc}">   </audio>  `
            this.$refs.videoBox.innerHTML = html
        },
        changeMusic(key) {
            this.index = key
            this.stopMusic()
            let audio = document.getElementById('audio')
            audio.currentTime = 0;
            this.htmlPubic()
            this.$nextTick(() => {
                this.playMusic()
            })

        },
        stopMusic() {
            let audio = document.getElementById('audio')
            this.stop = false
            audio.pause()
        },
    },

}
</script>

<style>
@media screen and (min-width: 768px) {
    .music.contentBox {
        height: calc(100% - 71px)
    }
}
</style><style lang="less" scoped>
.music {
    position: relative;

    .listItem {
        display: flex;
        padding: 10px 20px;
        box-sizing: border-box;
        border-bottom: 2px solid rgba(38, 191, 191, .1);
        background: rgba(141, 173, 152, 0.1);

        .sinngerImg {
            width: 50px;
            height: 50px;
            background: #aaa;
            display: flex;
            justify-content: center;
            align-items: center;

            i {
                font-size: 30px;
            }

        }

        .sinngStatu {
            letter-spacing: 3px;
            padding-left: 20px;
            box-sizing: border-box;
            position: relative;
            display: flex;
            align-items: center;

            .sinngName {
                font-weight: 1000;
                font-size: 20px;
            }

            .siinngerName {
                font-size: 10px;
                position: absolute;
                bottom: 0
            }
        }

        .playBox {
            flex: 1;
            height: 50px;
            display: flex;
            align-items: center;
            justify-items: center;

            .flex1 {
                flex: 1
            }

            .svgImg {
                width: 40px;

                &:hover {
                    cursor: pointer
                }
            }

            .rotateX {
                transform: rotate(-180deg);
            }
        }
    }

    .list {
        height: calc(100% -100px);

    }

    .footerPlay {
        position: absolute;
        bottom: 0;
        // height: 100px;
        width: 100%;
        background: #ddd
    }
}
</style>
