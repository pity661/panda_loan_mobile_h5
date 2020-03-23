<template>
	<div id="app">
        <div class="companyDiv">
            <div class="companyCount">
                <div class="companyLogo"> <!--logo文字-->
                    <img src="~@/assets/xybk.png" alt="">
                    <div class="companyName">
                        小赢白卡
                    </div>
                    <p>v1.0.0</p>
                </div>
                <div class="companyIntroduction"> <!--公司介绍-->
                    <p style="text-indent:1.4rem">小赢白卡是专注为中国大陆地区互联网用户提供的智能终端的回收服务平台。</p> <br/>
                    <p style="text-indent:1.4rem">小赢白卡app核心团队成员由来自传统金融业、互联网行业、传统电子回收行业者的跨界组合，既有来自于银行、证券、信托、第三方财富管理公司的商业精英，也有来自知名互联网企业的产品技术大咖。</p> <br/>
                    <p style="text-indent:1.4rem">小赢白卡app的经营理念：以互联网为手段，以金融为目的，让老百姓分享中国产业升级转型的巨大红利。平台已累计为数十万用户提供高品质的手机回收服务，践行普惠金融，创造更加美好便捷的生活方式。</p> <br/>
                </div>
            </div>
            <div class="companyFoot"> <!--底部-->
                <div class="companyaddress"> <!--公司地址-->
                    <!-- 厦门宁静致远投资有限公司 -->
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
    margin-top: 45*$rem;
    margin-bottom: 40*$rem;
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