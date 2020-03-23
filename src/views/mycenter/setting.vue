<template>
    <div id="app">
        <div class="settingOut" @click="loginOut">
            退出
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        methods: {
            loginOut(){
                window.location.href = "pdlogout://"
            }
        },
        mounted(){

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
$rem:1rem/40; //rem配置   
.settingOut{
    margin: 0 auto;
    margin-top: 130*$rem;
    width: 390*$rem;
    height: 75*$rem;
    line-height: 75*$rem;
    color:#fff;
    font-size: 32*$rem;
    text-align: center;
    background: #e5e5e5;
    border-radius: 20*$rem;
}

</style>