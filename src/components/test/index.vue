<template>
<div>
    <test>
        <template v-slot:header='jack'>
         <h1>   My name is {{jack.user}}</h1>
        </template>
        <template v-slot:footer>
            <h1>Here might be a page footer</h1>
        </template>
        <template>
            <h1>Here might be a page ++++++++++++++</h1>
        </template>
    </test>
</div>
</template>

<script>
import test from './test'
export default {
    components: {
        test
    },
    data(){
        return{
            jack:'Jhonss'
        }
    },

}
</script>
