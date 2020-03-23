<template>
	<div class="scroll-wrapper">
        <div class="header">
            <Xheader v-if="showBack" :showBack="showBack" :nameText="title" :backone="backone"></Xheader>
        </div>
        <iframe ref="iframe" :src="htmlUrl" width="100%" height="100%"></iframe>
	</div>
</template>

<script>
    import Xheader from 'common/X-header'
export default {
    components: {
        Xheader
    },
    data() {
        return {
            htmlUrl:'',
            showAlert: false, //显示提示组件
            showBack:true,
            nameText:'123',
            backone:true,
            title:''
        };
    },
    methods: {
        getUrl(){
            this.htmlUrl = this.$route.query.url
            // console.log(  this.htmlUrl)
            this.title = this.$route.query.title
        },
    },
    mounted(){
        this.getUrl()
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    $rem:1rem/40; //rem配置   
    .scroll-wrapper {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        top: 0;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
    }

    .header{  //顶部header
        position: fixed;
        top: 0;
        z-index: 20;
        width: 100%;
        background: #fff;
        height:auto;
        border-bottom: 1*$rem  solid #ececef;
        overflow: hidden;
    }

    .scroll-wrapper iframe {
        margin-top: 89*$rem;
        height: 100%;
        width: 100%;
        border: none;
    }
    .scroll-wrapper object {
        margin-top: 89*$rem;
        // height: 100%;
        width: 100%;
        border: none;
    }
</style>