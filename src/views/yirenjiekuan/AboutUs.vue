<template>
	<div id="app">
        <div class="companyDiv">
            <div class="companyCount">
                <div class="companyLogo"> <!--logo文字-->
                    <img src="~@/assets/logoAboutpic2.png" alt="">
                    <div class="companyName">
                        宜人借款
                    </div>
                    <p>v1.0.0</p>
                </div>
                <div class="companyIntroduction"> <!--公司介绍-->
                    <p>"宜人借款"app是平凉崆峒融兴村镇银行有限责任公司推出的款手机贷款APP软件，也是平凉崆峒融兴村镇银行有限责任公司主打的移动互联网金融品牌。</p><br/>
                    <p>"宜人借款"app核心团队成员来自传统金融业与互联网行业的跨界组合，既有来自于银行、证券、信托、第三方财富管理公司的金融精英，金融精英+互联网大牛99体双翼打造"宜人借款"app独树一帜的理财产品刷选体系。</p><br/>
                    <p>"宜人借款"app的经营理念：以互联网为手段，以金融为目的，让老百姓分享中国产业升级转型的巨大红利。</p><br/>
                    <p>我们承诺"宜人借款"app是平凉崆峒融兴村镇银行有限责任公司所有。并由平凉崆峒融兴村镇银行有限责任公司承担app使用过程中的一切法律责任，所产生的一切纠纷与 Apple公司无关。</p>
                </div>
            </div>
            <div class="companyFoot"> <!--底部-->
                <div class="companyaddress"> <!--公司地址-->
                    平凉崆峒融兴村镇银行有限责任公司
                </div>
                <div class="companyaddress"> <!--公司版权-->
                    All Rights Reserved
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

.companyDiv{
    width: 100%;
    height: auto;
}

.companyCount{
    width: 100%;
    overflow: hidden;
}

.companyLogo{
    margin-top: 45*$rem;
    margin-bottom: 65*$rem;
    width: 100;
    height: auto;
    overflow: hidden;
    text-align: center;
}

.companyLogo img{
    width: 160*$rem;
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
    padding:0 33*$rem;
    width:auto;
    height: auto;
    overflow: hidden;
    font-size: 28*$rem;
    line-height: 45*$rem;
    color:#333;
    text-align: left;
}

.companyFoot{
    padding: 1rem 0;
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