<template>
	<div id="app">
        <div class="companyDiv">
            <div class="companyCount">
                <div class="companyLogo"> <!--logo文字-->
                    <img src="~@/assets/xhbklogo.png" alt="">
                    <div class="companyName">
                        小花白卡
                    </div>
                    <p>v1.0.0</p>
                </div>
                <div class="companyIntroduction"> <!--公司介绍-->
                    <p>手机快速变现平台</p> <br/>
                </div>
            </div>
            <div class="companyFoot"> <!--底部-->
                <div class="companyaddress"> <!--公司地址-->
                </div>
                <div class="companyaddress"> <!--公司版权-->
                   微信公众号：熊猫元宝
                </div>
            </div>
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

  },
  mounted(){

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>

$rem:1rem/40; //rem配置   

.companyFoot{
    padding: 1rem 0;
}

.companyDiv{
    width: 100%;
    height: auto;
}

.companyCount{
    width: 100%;
    overflow: hidden;
}

.companyLogo{
    margin-top: 100*$rem;
    width: 100%;
    height: auto;
    overflow: hidden;
    text-align: center;
}

.companyLogo img{
    width: 225*$rem;
}

.companyName{
    width: 100%;
    height: 70*$rem;
    line-height: 70*$rem;
    font-size: 34*$rem;
    color:#333;
    text-align: center;
    font-family:微软雅黑,Arial, Helvetica, sans-serif,
}

.companyLogo p{
    font-size: 24*$rem;
    color:#666;
}

.companyIntroduction{ 
    margin-top: 450*$rem;
    padding:0 33*$rem;
    width:100%;
    height: auto;
    overflow: hidden;
    font-size: 28*$rem;
    line-height: 45*$rem;
    color:#333;
    text-align: center;
    p{
        font-size: 40*$rem;
    }
}

.companyaddress{
    width:100%;
    height: auto;
    font-size: 24*$rem;
    line-height: 45*$rem;
    color:#999;
    text-align: center;
    overflow: hidden;
}
</style>