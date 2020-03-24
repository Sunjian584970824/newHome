<template>
    <div>
        <button @click="test">test</button>
    </div>
</template>
<script>
export default {
    methods:{
        test(){
            this.$store.commit('increment')
        }
    }
}
</script>