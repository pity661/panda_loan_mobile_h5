<template> <!--基础部分-->
  <div class="page-infinite">
    <div class="infiniteWai"> <!--组件外层div为了现在底部下载熊猫贷款特加的-->
        <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }"> <!--最外层盒子-->
            <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" >
                <!-- 外层背景 -->
                <div class="productExternal"> 
                    <div v-for="(product,index) in allProduct" :key="product.id,index" class="product" @click="getUrl(product.id,index)"> <!--内容部分-->
                        <div class="productIcon"> <!--图标-->
                            <img v-bind:src="product.imgUrl" alt="" class="avatar">
                        </div>
                        <div class="productText"> <!--列表介绍-->
                            <div class="title">
                                <span class="title-word">{{product.title}}</span>
                                <div>
                                    <span v-for="(FirstTag,index) in product.firstTagArray" :key="index"  class="firstTages-border">{{FirstTag}}</span>
                                </div>
                            </div>
                            <div class="main-mes">
                                <div class="left-block">
                                    <span class="left-top">最高{{product.edu}}元</span>
                                    <br/>
                                        <!-- 期限判断 -->
                                    <span class="left-bottom" v-if="product.minTerm == product.maxTerm">期限{{product.maxTerm}}个月</span>
                                    <span class="left-bottom" v-else>期限{{product.minTerm}}~{{product.maxTerm}}个月</span>
                                </div>
                                <div class="right-block">
                                    <span class="right-top">日利率{{product.dayRate}}%起</span>
                                    <br/>
                                    <span class="right-bottom">{{product.description}}</span>
                                    <!-- <span class="right-bottom">五分钟审核，最快30秒放款</span> -->
                                </div>
                            </div>
                        </div>
                        <!-- 右侧箭头 -->
                        <div class="iconlist">
                            <img src="~@/assets/rightjian.png" class="click-icon">
                        </div>
                        <!-- 新品显示 -->
                        <div class="newButton" v-if="product.isNew">
                            <img src="~@/assets/newlist.png">
                        </div>
                    </div>

                    <!--底部正在加载html-->
                    <div class="loadwrap" ref="loadwrap" style="height:1.8rem;" v-if="showLoading">
                        <p v-if="loading" class="page-infinite-loading">
                        <mt-spinner type="sanke"></mt-spinner>
                        加载中...
                        </p>
                    </div>
                    <!--底部加载完毕样式-->
                    <div class="loadwrap" ref="loadwrap" style="height:1.8rem;" v-else>
                        <div class="nolive">
                            <div class="style-two" style="float:left"></div>
                                更多产品请下载APP
                            <div class="style-two" style="float:right"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- 底部固定下载 -->
    <div class="downPanda" v-if="downshow"> 
        <div class="downlogoText">
                <div class="downPandaImg">
            <img src="~@/assets/pandalogo2.png" alt="">
            <div class="downText">
                <p>熊猫贷款</p>
                <p>急用钱，用熊猫贷款</p>
            </div>
            </div>
        </div>
        <div class="downright">
            <div class="downzip" @click="downloadApp">
                <span>立即下载</span>
            </div>
            <div class="dowmexit" @click="downExit">
                <img src="~@/assets/exit.png" alt="">
            </div>
        </div>
    </div>

    <!-- 登录框 -->
    <div class="alet_container" v-if="clickDetails" @touchmove.prevent>
	    <section class="tip_text_container">
            <input type="text" class="alet_login" :placeholder="placeholder" v-model="logonphone" maxlength="11" @focus="focus()" @blur="blur()">
            <div class="loginbutton" @click="loginDeterminebutton">确定</div>
        </section>
    </div>
  </div>
</template>

<script> //js部分
    import resources from '../../resources'
    import { Toast } from 'mint-ui';
    import qs from 'qs';
    const productQuery = `
        query(
            $pageNumber: Int
            $pageSize: Int
        ){
            recommendProducts(
                pageNumber:$pageNumber
                pageSize:$pageSize
                packageName: "com.h5"
                channelId: "99"
            ){
                id
                title
                isNew
                firstTags
                secondTags
                description
                imgUrl
                url
                minAmount
                maxAmount
                dayRate
                creditAuth
                maxTerm
                minTerm
            }
	}`
  export default {
    name:'NologinproductList',
    data() {
      return {
        showLoading:true, //底部显示加载还是到底
        loading: false, //加载中
        wrapperHeight: 0, //列表高度
        allProduct:[], //数组
        pageSize: 6, //每页条数
        pageNumber: 1,//当前页
        showLoading:true, //底部显示加载还是到底
        downshow:true, //底部是否显示
        clickDetails:false, //遮挡层是否显示
        logonphone:'', //遮挡层手机号
        pid:'', //列表pid
        listIndex:'', //第几个点击
        Sid: '', //记录
        Uid: this.$route.params.Uid,    //记录
        placeholder:'填写手机号加入快速申请通道',
        AndroidDownloadUrl: '',
        unclick: false,
        userId: 0
      };
    },
    methods: {
            countDown(){ //防止重复点击
                var count = 5;
                var timer = setInterval(() => {
                    if (count > 0 ) {
                        count--;
                    } else {
                    this.unclick = false;
                    clearInterval(timer);
                    }
                }, 1000)
            },
            recordDownload() {
                let url = resources.recordDownload();
                let params = {
                    'userId': this.userId,
                    'downloadUrl': this.AndroidDownloadUrl
                }
                this.$ajax.post(url,qs.stringify(params),{
                    headers: {
                        'H5-Web-Name': 'NologinproductList',
                        'Landing-Channel-Uid': this.Uid,
                        'Platform-Id': '0'
                    }
                }).then( res => {
                    this.unclick = true
                })
            },
            getDownloadUrl() { //获取下载url链接
                let url = resources.h5DownloadUrl();
                let params = { };
                this.$ajax.post(url,qs.stringify(params),{
                    headers: {
                        'H5-Web-Name': 'NologinproductList',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Version': '1',
                        'User-Id': '0',
                        'Channel-Id': '14',
                        'Device-Id': '111',
                        'Request-Uri': 'http://119.23.12.36:8081/graphql/query',
                        'Package-Name': this.Uid,
                        'Landing-Channel-Uid': this.Uid,
                        'Platform-Id': '0'
                    }
                }).then( res =>{
                    // console.log(res)s
                    if (res.data == ''){
                        this.downExit();
                    }
                    this.AndroidDownloadUrl = res.data.downloadUrl;
                })
            },
            loginDeterminebutton(){ //弹框确认按钮
                var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
                if (phoneReg.test(this.logonphone)) {
                    this.postMes()
                } else {
                    Toast('请检查手机号是否正确');
                }
            },
            postMes(){ //登录
                let url = resources.token();
                let params = {};
                var phoneValue = this.logonphone;
                var phonefirst = phoneValue.substr(0, 1);
                var phonelast = phoneValue.substr(-1);
                var smsCapts = phonefirst + '00' + phonelast;
                params = {
                    'username':this.logonphone,
                    'keySMSCapt':'999',
                    'smsCapt': smsCapts
                }
                var qs = require('qs')
                this.$ajax.post(url,qs.stringify(params),{
                    headers:{
                        'H5-Web-Name': 'NologinproductList',
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    // console.log(res)
                        this.userId = res.data.obj1.id;
                        sessionStorage.setItem("userId",res.data.obj1.id)
                        this.getUrl(this.pid,this.listIndex)
                }).catch(error =>{
                        // console.log(error)
                })
            },
            getUrl(pid,index){ //已登录跳转详情
                if(sessionStorage.getItem('userId')==null){
                    this.clickDetails = true
                    this.pid = pid;
                    this.listIndex = index
                    // return;
                }else{
                    this.clickDetails = false;
                    let url = resources.recordUrl();
                    let params = {
                        'userId': sessionStorage.getItem("userId"),
                        'pid': pid,
                    }
                    var qs = require('qs');
                    this.$ajax.post(url,qs.stringify(params),{
                        headers: {
                            'H5-Web-Name': 'NologinproductList',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Version': '1',
                            'User-Id': sessionStorage.getItem("userId"),
                            'Channel-Id': '14',
                            'Device-Id': '111',
                            'Request-Uri': this.allProduct[index].url,
                            'Package-Name': this.Uid,
                            'Landing-Channel-Uid': this.Uid
                        },
                    }).then(res => {
                        var explorer =navigator.userAgent ;
                        var isiOS = !!explorer.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                        if(isiOS){
                            window.location.href = res.data
                        }else{
                            this.$router.push({path: '/Concisedetails?url=' +  res.data + '&title=' +   this.allProduct[index].title});
                        }
                    })
                }
            },
            loadMore() { //底部判断
                if(!this.loading) {
                    this.pageNumber ++
                    // console.log(this.pageNumber)
                    this.getProduct();
                }
            },
            downloadApp(){ //下载跳转
                var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf("iphone") == -1) {
                    //安卓跳转
                    if(this.unclick){
                        return;
                    }
                    this.recordDownload();
                    window.location.href = this.AndroidDownloadUrl;
                    this.countDown()
                } else {
                    //苹果跳转
                    window.location.href = "https://itunes.apple.com/cn/app/id1290678368?mt=8";
                }
            },
            downExit(){ //关闭下载
                this.downshow = false;
                this.wrapperHeight = (document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top);
            },
            enterMes(){ //记录进入当前次数页面方法
                let url = resources.landingPage();
                var qs = require('qs');
                let params = { }
                this.$ajax.post(url,qs.stringify(params),{
                    headers: {
                        'H5-Web-Name': 'NologinproductList',
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                   
                }).then(res => {
                })
            },
            createSid(){  //生成用户操作唯一标识
                this.Sid = this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+(new Date()).valueOf().toString(16);
            },
            S4() {  //生成一个4位16进制字符串
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
            },
            getProduct() { //请求数据
                this.loading = true;
                let params = {
                    "pageSize": this.pageSize,
                    "pageNumber": this.pageNumber,
                    'h5WebName':'NologinproductList',
                    'h5ChannelUid':this.Uid,
                    'platformId':'0',
                    "productTypeId": '5'
                };
                setTimeout(() => { //延时请求数据
                this.$ajax.post(`${resources.graphQlApi}`, {
                    'query': `${productQuery}`,
                    variables: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Version': '1',
                    'User-Id': '0',
                    'Channel-Id': '14',
                    'Device-Id': '111',
                    'Request-Uri': 'https://api.pinganzhiyuan.com/panda_loan/graphql/query',
                    'Package-Name': this.Uid
                }
                }).then(res => {
                   
                    var array = res.data.data.recommendProducts;
                    for (var i = 0; i < array.length ;i ++) {
                        array[i].firstTagArray = array[i].firstTags.split("|");
                    }
                    // console.log(res.data.data.recommendProducts.length)
                    if(res.data.data.recommendProducts.length==0){
                        this.showLoading = false
                        return
                    }
                    this.allProduct = this.allProduct.concat(array);
                    // console.log(this.allProduct)
                    this.loading = false;
                    this.allProduct.forEach(item => {
                    if (item.maxAmount > 10000) {
                        item.edu = item.maxAmount/10000 + '万';
                    } else {
                        item.edu = item.maxAmount;
                    }
                    if (item.firstTags === '') {
                        item.isFirstTags = false;
                    } else {
                        item.isFirstTags = true;
                    }
                    });
                })
                },700);
            },
            focus(){ //获取焦点的时候让显示文字为空
                this.placeholder = ''
            },
            blur(){ //失去焦点的时候
                if(this.logonphone==''){
                    this.placeholder = '填写手机号加入快速申请通道'
                }
            }
    },
    mounted() { 
        // 记录与生成id
        this.getDownloadUrl()
        this.createSid()
        this.enterMes()
        //第一次请求数据
        this.wrapperHeight = (document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top)-58;
        // 获取数据
        this.getProduct()
        if(!this.loading){
            this.getProduct();
        }
    },
    created(){
        document.documentElement.scrollTop=0
        document.body.scrollTop = 0
    }
  };
</script>

<style lang="scss">
 /*组件样式*/
    $rem:1rem/40;
    .page-infinite-loading{
        text-align: center;
        height: 1.8rem;
        line-height: 1.8rem;
        font-size: 28*$rem;
        color: rgb(56, 137, 255);
    }
    .page-infinite-loading div{
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        color: rgb(56, 137, 255);
    }
    .mint-spinner-snake{
        border-top-color: rgb(56, 137, 255) !important;
        border-left-color:  rgb(56, 137, 255) !important;
        border-bottom-color:  rgb(56, 137, 255) !important;
    }
    .mint-toast.is-placemiddle{
        top:28% !important;
    }
</style>

<style lang="scss" scoped> /*单页面样式*/
    $rem:1rem/40;

    // 登录弹出框
    .alet_container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.3);
        z-index: 200;
    }
    .tip_text_container{
        margin: 0 auto;
        margin-top:385*$rem;
        padding:34*$rem 36*$rem;
        padding-top:80*$rem;
        width:595*$rem;
        height:auto;
        background:#fff;
        flex-direction: column;
        border-radius: 0.2rem;
        overflow: hidden;
    }
    .alet_login{
        margin:0 auto;
        width: 520*$rem;
        height: 80*$rem;
        line-height: 80*$rem;
        font-size:32*$rem;
        color:rgb(51,51,51);
        border-bottom:2.1*$rem solid rgb(217,218,222);
        border-radius:0rem;
        text-align:center;
    }
    .loginbutton{
        margin:0 auto;
        margin-top:50*$rem;
        width: 520*$rem;
        height: 90*$rem;
        line-height: 90*$rem;
        font-size:39*$rem;
        text-align:center;
        background:#ffb14d;
        color:rgb(255,255,255);
    }

    // 内容外层背景
    .productExternal{
        padding: 10*$rem;
        width: 100%;
        height: auto;
        background: #f5f5f5;
        overflow: hidden;
    }
    .header{  //顶部header
        position: fixed;
        top: 0;
        z-index: 20;
        width: 100%;
        background: #3889ff !important;
        height:auto;
        border-bottom: 2*$rem  solid #ececef;
        overflow: hidden;
    }

    .page-infinite{
        text-align: center;
        color: #666;
        overflow: hidden;
    }
    .nolive{  /*我是有底线的*/
        margin:0 auto;
        width:450*$rem;
        text-align: center;
        height: 1.8rem;
        line-height: 1.8rem;
        font-size: 0.6rem;
        color: rgb(56, 137, 255);
    }
    .style-two{
        width:110*$rem;
        height: 2*$rem;
        margin-top: 0.9rem;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(56, 137, 255, 1), rgba(0, 0, 0, 0));
    }
    .page-infinite-wrapper{ /*样式最外层*/
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        .product{
            position: relative;
            margin: 0 auto;
            width: 725*$rem;
            height: auto;
            margin-bottom:20*$rem;
            padding: 37*$rem 27*$rem 33*$rem 27*$rem;
            background: url(~@/assets/listBack1.png) no-repeat;
            background-size:100% 100%;
            // background:#fff;
            overflow: hidden;

            //图标
            .productIcon{
                float: left;
                width:130*$rem;
                height:130*$rem;
                .avatar{
                    width:100%;
                    height: 100%;
                    border-radius: 10%;
                }
            }
            .productText{
                margin-left:24*$rem;
                float: left;
                width: 495*$rem;
                height:auto;
                overflow: hidden;
                .title{
                    text-align:left;
                    width: 495*$rem;
                    height:auto;
                .title-word{
                    float: left;
                    display: inline-block;
                    width: auto;
                    height: 40*$rem;
                    line-height: 42*$rem;
                    overflow: hidden;
                    color:rgb(51,51,51);
                    font-size:30*$rem;
                }
                .firstTages-border{
                    display: inline-block;
                    width: auto;
                    padding: 0rem 10*$rem;
                    height: 40*$rem;
                    line-height: 41*$rem;
                    border:2.1*$rem solid #999;
                    overflow: hidden;
                    border-radius: 5px;
                    font-size:18*$rem;
                    color: #999;
                    margin-left:20*$rem;
                }
            }
            .main-mes{
                text-align: left;
                border-top:2.1*$rem solid rgb(238,238,238);
                margin-top:15*$rem;
                padding-top:15*$rem;
                overflow: hidden;
                .left-block{
                    float: left;
                    text-align:left;
                    width: 180*$rem;
                    vertical-align: top;
                    display: inline-block;
                    border-right:2.1*$rem solid rgb(238,238,238);
                    overflow: hidden;
                    .left-top{
                        // padding-top:2px;
                        display: inline-block;
                        color: rgb(236, 18, 16);
                        width: auto;
                        height: auto;
                        height: 26*$rem;
                        line-height:32*$rem;
                        font-size: 26*$rem;
                        // line-height:32*$rem;
                    }
                    .left-bottom{
                        padding-top: 0.25rem;
                        display: inline-block;
                        color: rgb(102, 102, 102);
                        font-size: 26*$rem;
                    }
                }
                .middle-block{
                    margin-left: 1.3rem;
                    vertical-align: top;
                    display: inline-block;
                    width: 0.05rem;
                    height: 1.4rem;
                    background: rgb(214, 214, 214)
                }
                .right-block{
                    float: left;
                    width:315*$rem;
                    padding-left: 40*$rem;
                    .right-top{
                        display: inline-block;
                        font-size: 24*$rem;
                        color:#666;
                    }
                    .right-bottom{
                        line-height: 0.8rem;
                        padding-top: 0.3rem;
                        display: inline-block;
                        font-size: 24*$rem;
                        color:#666;
                    }
                }
            }
        }
        .iconlist{
                position: absolute;
                top:100*$rem;
                // right:30*$rem;
                vertical-align: center;
                display: inline-block;
                float: right;
                .click-icon{
                    margin-top: 0.5rem;
                    width:0.4rem;
                }
            }
        .newButton{ //新品
                position: absolute;
                top:0rem;
                right:0rem;
                    img{
                        width:65*$rem;
                    }
            }
        }
    }  

    .downPanda{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 120*$rem;
        border-top:2.1*$rem solid #eaeaea;
        background:rgba(255,255,255,1);
        // overflow: hidden;
    }
    .downPandaImg{
        float: left;
        width: auto;
        height: 120*$rem;
        line-height: 120*$rem;
        margin-left: 42*$rem;
    }

    .downPandaImg img{
        width: 77*$rem;
        vertical-align: middle
    }

    .downText{
        margin-left: 10px;
        margin-top: 30*$rem;
        float: right;
        width: auto;
        height: auto;
        line-height: 10*$rem;
    }

    .downText p {
        text-align:left;
        font-size:24*$rem;
        color:rgb(51,51,51);
        line-height:35*$rem;
    }

    .downText p:last-child{
        font-size:18*$rem;
        color:rgb(51,51,51);
        line-height:40*$rem;
    }
    
    //关闭下载
    .dowmexit{
        margin-right: 42*$rem;
        float: right;
        width: auto;
        height: 120*$rem;
        line-height: 120*$rem;
    }

    .dowmexit img{
        vertical-align: middle;
        width: 40*$rem;
    }

    

    // 底部下载
    .downright{
        float: right;
    }

    .downzip{
        float: left;
        width: 150*$rem;
        height: 64*$rem;
        line-height: 64*$rem;
        margin-right: 42*$rem;
        text-align: center;
        vertical-align: middle;
        background:rgb(72,147,255);
        border-radius: 10*$rem;
        margin-top: 28*$rem;
    }
    .downzip span{
        padding: 5px;
        font-size: 24*$rem;
        color:#fff;
    }

</style>