<template>
	<div id="app">
        <input type="text" class="normal-input" placeholder="银行借记卡卡号">
        <input type="text" class="normal-input" placeholder="银行预留手机号">
        <div class="phoneDiv"> <!--获取手机号-->
            <input type="text" class="Independentlong-input" placeholder="填写短信验证码">
            <div class="Independentsmall-input" @click="showAlerttoast">短信验证码</div>
        </div>
        <div class="fee">
            <span class="left-text">本人已阅读并同意与平凉崆峒融兴村镇银行有限责任公司签署</span>
            <span class="right-text" @click="agreement()">《宜人借款自动扣款协议书》</span>
        </div>
        <div class="confirmButton" >确认</div>
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
        agreement(){
            this.$router.push({ path: '/yrjkfeeDeductionAgreement' });
        },
        closeTip(){ //关闭alert组件
            this.showAlert = false;
        },
        showAlerttoast(){ //显示
            this.showAlert = true;
            var _this = this;
            setTimeout(function(){
                _this.closeTip()
            },2000)
        }
  },
  mounted(){

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>

$rem:1rem/40; //rem配置   

#app{
    padding: 0 37*$rem;
    background: #f5f5f5;
}

//协议
.fee{
    margin-top: 0.75rem;
    padding: 0 1rem;
    .left-text{
       font-size: 0.6rem;
       line-height: 0.8rem;
    }
    .right-text{
       font-size: 0.6rem;
       line-height: 0.8rem;
       color: blue;
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
    height: 80*$rem;
    line-height: 80*$rem;
    font-size: 40*$rem;
    overflow: hidden;
    text-align: center;
    background: #d1d1d1;
    color: #fff;
}
</style>