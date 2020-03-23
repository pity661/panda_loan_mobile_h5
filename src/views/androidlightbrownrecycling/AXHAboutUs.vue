<template>
	<div id="app">
        <div class="companyDiv">
            <div class="companyCount">
                <div class="companyLogo" style="padding-top:4rem"> <!--logo文字-->
                    <img src="~@/assets/suibianhuaabout.png" alt="">
                    <div class="companyName" style="padding-top:0.6rem">
                        <span style="font-size:0.9rem;color:rgb(51, 51, 51);">极简的用钱记账软件</span>
                    </div>
                </div>
            </div>
            <div class="companyFoot" style="padding-top:8.5rem"> <!--底部-->
                <div class="companyaddress"> <!--公司地址-->
                    <span style="font-size:0.8rem;color:rgb(102, 102, 102);">安心花 v1.0.0</span>
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
    height: 100%;
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
    height: 200*$rem;
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