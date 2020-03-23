<template>
	<div id="app">
        <div class="bankcarddata">
            <img src="~@/assets/light.png" alt="">
            银行卡用于收取回收款项
        </div>
        <div class="inputarray">
            <input type="text" class="normal-input" placeholder="银行借记卡卡号">
            <input type="text" class="normal-input" placeholder="银行预留手机号">
            <div class="phoneDiv"> <!--获取手机号-->
                <input type="text" class="Independentlong-input" placeholder="填写短信验证码">
                <div class="Independentsmall-input" @click="showAlerttoast">短信验证码</div>
            </div>
            <div class="confirmButton" >确认</div>
            <!-- 协议 -->
            <div class="yntext-hint">
                <span class="yntext-left">本人已阅读并同意与厦门励马金融技术服务有限公司签署</span>
                <span class="yntext-right" @click="agreement()">《代收付协议》</span>
            </div>
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
	</div>
</template>
<script>
import alertTip from '../../common/alertTip'
export default {
	components: {
        alertTip,
    },
  data() {
    return {
        showAlert: false, //显示提示组件
        alertText: '请输入正确的银行卡信息', //提示的内容
    };
  },
  methods: {
        closeTip(){ //关闭alert组件
            this.showAlert = false;
        },
        showAlerttoast(){ //显示
            this.showAlert = true;
            var _this = this;
            setTimeout(function(){
                _this.closeTip()
            },2000)
        },
        agreement(){ //跳转协议
            this.$router.push({ path: '/XHBKFeeDeductionAgreement' })
        },
  },
  mounted(){

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>

$rem:1rem/40; //rem配置   

#app{
   
    background: #f5f5f5;
}

.inputarray{
    background: #fff;
    padding: 23*$rem 37*$rem 50*$rem 37*$rem;
}
// 银行卡用途
.bankcarddata{
    margin: 15*$rem 0rem;
    padding-left: 37*$rem;
    width: 100%;
    height: 80*$rem;
    line-height: 80*$rem;
    background-color: #fff;
    font-size: 28*$rem;
    color:#999;
    img{
        margin-top: -10px;
        margin-right: 15*$rem;
        width: 32*$rem;
        height: 41*$rem;
        vertical-align: middle
    }
}
// 普通表单长度
.normal-input{
    margin-top: 24*$rem;
    width: 100%;
    height: 100*$rem;
    background: #ccc;
    padding: 0 24*$rem;
    font-size: 32*$rem;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #d6d7dc;
}

//手机号码
.phoneDiv{
    margin-top: 24*$rem;
    width: 100%;
    height: auto;
    overflow: hidden;
}
.Independentlong-input{
    width: 450*$rem;
    height: 100*$rem;
    background: #ccc;
    padding: 0 24*$rem;
    font-size: 32*$rem;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #d6d7dc;
}
.Independentsmall-input{
    float: right ;
    width: 210*$rem;
    height: 100*$rem;
    line-height: 100*$rem;
    background: #ccc;
    padding: 0 22*$rem;
    font-size: 32*$rem;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #d6d7dc;
    text-align: center;
    color: #666;
}

.confirmButton{
    margin-top:30*$rem;
    width: 100%;
    height: 105*$rem;
    line-height: 105*$rem;
    font-size: 40*$rem;
    overflow: hidden;
    text-align: center;
    background: #d1d1d1;
    color: #fff;
}

    .yntext-hint{ //协议
        margin: 0 auto;
        margin-top:30*$rem;
        width: auto;
        height: auto;
        overflow: hidden;
        text-align: left;
        padding-top: 0.1rem;
        overflow: hidden;
        .yntext-left{   
            color: #666;
            font-size: 22*$rem;
        }
        .yntext-right{
            display: inline-block;
            padding-top: 0.2rem;
            color: #fedb31;
            font-size: 22*$rem;
        }
    }
</style>