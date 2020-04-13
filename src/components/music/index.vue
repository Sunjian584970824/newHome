<template>
<div class="music">
    <div class="list">
        <div class="listItem">
            <div class="sinngerImg">
            </div>
            <div class="sinngStatu">
                <p class='sinngName'>珊瑚海</p>
                <p class='siinngerName'>周杰伦</p>
            </div>
        </div>
    </div>
    <div class='footerPlay' @click="playMusic">
        <audio controls ref='audio' style="display:none">
            <source src="http://10.120.1.171:3000\你好.mp3">
        </audio>
        <!-- <source src="../../assets/music/周杰伦 - 安静.mflac" type="audio/mpeg"> -->
        <div class="listItem">
            <div class="sinngerImg">
            </div>
            <div class="sinngStatu">
                <p class='sinngName'>珊瑚海</p>
                <p class='siinngerName'>周杰伦</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        playMusic() {
            this.$refs.audio.play()
        }
    },
}
</script>

<style lang="less" scoped>
.music {
    position: relative;
 .listItem {
            display: flex;
            padding: 10px 20px;
            box-sizing: border-box;

            .sinngerImg {
                width: 50px;
                height: 50px;
                background: #aaa;

            }

            .sinngStatu {
                letter-spacing: 3px;
                padding-left: 20px;
                box-sizing: border-box;
                position: relative;

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
        }
    .list {
        height: calc(100% -100px);

    }

    .footerPlay {
        position: absolute;
        bottom: 0;
        height: 100px;
        width: 100%;
        background: #ddd
    }
}
</style>
