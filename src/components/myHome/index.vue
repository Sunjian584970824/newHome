<template>
<div id="myHome">
    <myhome v-if="sessionToken"></myhome>
    <login v-else></login>
</div>
</template>

<script>
import myhome from './myHome/index'
import login from './login/index'
export default {
    components: {
        myhome,
        login
    },
    data() {
        return {
           sessionToken:null
        }
    },
    created() {

    },
}
</script>

<style lang="less" >
#myHome {
    .myIcon{
    width: 30px;
    z-index: 22
    }
}
</style>
