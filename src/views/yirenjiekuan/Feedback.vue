<template>
	<div id="app">

        <!-- 时间 -->
        <div class="thisTime" v-model="time">
            {{time}}
        </div>
        <!-- 机主消息 -->
        <div class="myInfo" v-if="news">
            <div class="myImg">
                <img src="~@/assets/boy.png" alt="">
            </div>
            <div class="myInfodata" v-html="myData">
            </div>
        </div>

        <!-- 反馈消息 -->
        <div class="outherInfo" v-if="outher">
            <div class="outherImg">
                <img src="~@/assets/girl.png" alt="">
            </div>
            <div class="outherInfodata">
                感谢您的反馈，对于您的意见和建议，我们将认真对待，并视情况予以回复！请您保持电话畅通，客服同事可能会与您联系。
            </div>
        </div>

        <!-- 底部 -->
        <div class="feedback-foot" v-if="submitIf"> 
            <input type="text" class="feedback-input" v-model="inputData" placeholder="输入意见内容">
            <div class="feedback-button" @click="submit">
                发送
            </div>
        </div>
	</div>
</template>
<script>
export default {

  data() {
    return {
        submitIf:true,  //提交按钮
        news:false,  //消息显示
        inputData:'', //内容数据
        myData:'',  //显示内容数据
        outher:false,   //系统反馈
        time:'',    //当前会话时间
    };
  },
  methods: {
    submit(){ //提交
        if(this.inputData==''){
            return
        }else{
            this.news = true;
            this.myData =  this.inputData;
            this.submitIf = false;
            this.outherShow()
        }
    },
    outherShow(){ //系统反馈显示
        var _this = this;
        setTimeout(function(){
            _this.outher = true
        },2000);
    },
    zero(month){
        return month < 10 ? '0' + month: month;
    },
    getTime(){ //获取当前时间
        var date= new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var WeekDay = date.getDay();    //获取当前星期X(0-6,0代表星期天)
        var Hour = date.getHours();      //获取当前小时数(0-23)
        var Minute = date.getMinutes();   // 获取当前分钟数(0-59)
        var Sec =date.getSeconds();      //获取当前秒数(0-59)
        var str = this.zero(month) + '月' + this.zero(day)+ '日    ' + this.zero(Hour) + ':' +this.zero(Minute)   ;
        this.time = str
    }
  },
  mounted(){
      this.getTime()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style> /*全局样式*/
    #app{
        background: #fff;
    }
</style>

<style lang="scss" scoped>

$rem:1rem/40; //rem配置

// 底部样式
.feedback-foot{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 135*$rem;
    line-height: 135*$rem;
    background: #f5f5f5;
    padding: 30*$rem;
}

.feedback-input{
    -web-kit-appearance:none;
    -moz-appearance: none;
    float: left;
    display: block;
    width: 500*$rem;
    height: 75*$rem;
    padding-left: 20*$rem;
    background: #fff;
    border-radius: 10px;
}

.feedback-button{
    text-align: center;
    float: left;
    margin-left: 20*$rem;
    display: block;
    width: 160*$rem;
    height: 75*$rem;
    line-height: 75*$rem;
    background: #81b0fb;
    border-radius: 10px;
    color: #fff;
    font-size: 28*$rem;
}

// 我发送的消息样式
.myInfo{
    float: right;
    width:auto;
    height: auto;
    margin-bottom: 55*$rem;
    margin-right: 30*$rem;
    overflow: hidden;
}

.myImg{
    float: right;
    width:90*$rem;
    height: auto;
    text-align: center;
    font-size: 28*$rem;
    margin-left: 15*$rem;
}

.myImg img{
    text-align: center;
    width:75*$rem;
    height: 75*$rem;
    border-radius: 100%;
}

.myImg p{
    width: auto;
    font-size: 40*$rem;
    margin-top: 30*$rem; 
    overflow: hidden;
}

.myInfodata{
    position: relative;
    float: left;
    margin-right: 15*$rem;
    width: auto;
    height: auto;
    max-width: 500*$rem;
    word-break: break-all;
    padding: 25*$rem;
    border-radius: 20px;
    background  : #81b0fb;
    color:#fff;
    font-size: 25*$rem;
    line-height: 40*$rem;
    text-align: left;
}

// 消息三角样式
.myInfodata::after{
    content: '';
    display: block;
    position: absolute;
    top: 8*$rem; /*向下偏移量是矩形边框宽度的1.4（根号2）倍，即8.4，top值为-26-（-8.4）*/
    right:-14*$rem;
    border-top: 30*$rem solid transparent;
    border-left: 30*$rem solid #81b0fb;
    border-bottom: 30*$rem solid transparent;
}

// 系统显示消息
.outherInfo{
    clear: both;
    margin-left: 30*$rem;
    width:auto;
    height: auto;
    overflow: hidden;
}

.outherImg{
    float: left;
    width:90*$rem;
    height: auto;
    text-align: center;
    font-size: 28*$rem;
    margin-right: 15*$rem;
}

.outherImg img{
    text-align: center;
    width:75*$rem;
    height: 75*$rem;
    border-radius: 100%;
}

.outherImg p{
    font-size: 40*$rem;
    margin-top: 30*$rem; 
}

.outherInfodata{
    position: relative;
    float: left;
    margin-right: 15*$rem;
    margin-left: 15*$rem;
    width: auto;
    height: auto;
    max-width: 500*$rem;
    word-break: break-all;
    border-radius: 20px;
    background  : #81b0fb;
    color: #fff;
    font-size: 25*$rem;
    padding: 25*$rem;
    text-align: left;
    line-height: 40*$rem;
}

// 消息三角样式
.outherInfodata::after{
    content: '';
    display: block;
    position: absolute;
    top: 23*$rem; /*向下偏移量是矩形边框宽度的1.4（根号2）倍，即8.4，top值为-26-（-8.4）*/
    left:-14*$rem;
    border-top:30*$rem solid transparent;
    border-right: 30*$rem solid #81b0fb;
    border-bottom: 30*$rem solid transparent;
}

// 时间样式
.thisTime{
    width: 100%;
    height: 100*$rem;
    line-height: 100*$rem;
    font-size: 26*$rem;
    text-align: center;
    color:#666;
}
</style>