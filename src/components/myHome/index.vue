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
        let user=localStorage.getItem('user')
           this.sessionToken= user?JSON.parse(user):''
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
