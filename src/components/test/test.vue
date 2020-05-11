<template>
<div>
    <div class="container">
        <header>
            <slot name="header" :user='jack'>我的名字是 {{jack}} </slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</div>
</template>

<script>
export default {
    
    data() {
        return {
            jack: 0
        }
    },
    mounted(){
        setInterval(() => {
            this.jack++
        }, 1000);
    },
}
</script>
