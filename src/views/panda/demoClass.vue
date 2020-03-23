<template> <!--基础部分-->
  <div class="page-infinite">
    <div class="header" v-show="noHeader">
          <Xheader v-if="showBack" :showBack="showBack" :nameText="nameText" :backone="backone"   :backtwo="backtwo" ></Xheader>
    </div>
    <div class="pageOn">
            <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }"> <!--最外层盒子-->
      <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" >
        <div v-for="(product,index) in allProduct" :key="product.id,index" class="product" @click="getUrl(product.id,index)"> <!--内容部分-->
            <div class="title">
                <img v-bind:src="product.imgUrl" alt="" class="avatar">
                <span class="title-word">{{product.title}}</span>
                <span class="isNew" v-if="product.isNew"><span class="isNew-border">新上线</span></span>
                <span class="firstTages" v-for="(FirstTag,index) in product.firstTagArray" :key="index"><span class="firstTages-border">{{FirstTag}}</span></span>
            </div>
            <div class="main-mes">
                <div class="left-block">
                    <span class="left-top">最高{{product.edu}}元</span>
                    <br/>
                        <!-- 期限判断 -->
                    <span class="left-bottom" v-if="product.minTerm == product.maxTerm">期限{{product.maxTerm}}个月</span>
                    <span class="left-bottom" v-else>期限{{product.minTerm}}~{{product.maxTerm}}个月</span>
                </div>
                <div class="middle-block"></div>
                <div class="right-block">
                    <span class="right-top">日利率{{product.dayRate}}%起</span>
                    <br/>
                    <span class="right-bottom">{{product.description}}</span>
                </div>
                <div class="iconlist">
                    <img src="~@/assets/clickicon.png" class="click-icon">
                </div>
            </div>
        </div>
      </div>
       <!--底部正在加载html-->
      <div class="loadwrap" ref="loadwrap" style="height:1.8rem;" v-if="showLoading">
        <p v-if="loading" class="page-infinite-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
          加载中...
        </p>
      </div>
       <!--底部加载完毕样式-->
      <div class="loadwrap" ref="loadwrap" style="height:1.8rem;" v-else>
        <p class="nolive">
          我是有底线的
        </p>
      </div>
    </div>
    </div>
    <div class="footer">
        
    </div>

    <!-- 底部固定下载 -->
    <!-- <div class="downPanda"> 
        <div class="downlogoText">
                <div class="downPandaImg">
            <img src="~@/assets/pandaLogo.png" alt="">
            <div class="downText">
                <p>熊猫钱包</p>
                <p>好信用，不逾期</p>
            </div>
            </div>
        </div>
        <div class="downzip" @click="downloadApp">
            <span>立即下载</span>
        </div>
    </div> -->
  </div>
</template>

<script> //js部分
    import resources from '../../resources'
    import Xheader from '../common/X-header'
    const productQuery = `
        query(
            $pageNumber: Int
            $pageSize: Int
        ){
            recommendProducts(
                pageNumber:$pageNumber
                pageSize:$pageSize
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
    name:'demo3',
    components: {
        Xheader
    },
    data() {
      return {
        showLoading:true, //底部显示加载还是到底
        loading: false, //加载中
        wrapperHeight: 0,
        showBack:true,
        nameText:'热门推荐',
        noHeader:true,
        safari:false,
        backone:false,
        backtwo:true,
        allProduct:[],
        pageSize: 6,
        pageNumber: 1,
        showLoading:true, //底部显示加载还是到底
      };
    },
    methods: {
            getUrl(pid,index){ //数据通知与跳转详情
                console.log('第几个')
                console.log(index)
                let url = resources.recordUrl();
                let params = {
                    'userId': sessionStorage.getItem("userId"),
                    'pid': pid,
                }
                var qs = require('qs');
                this.$ajax.post(url,qs.stringify(params),{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Version': '1',
                        'User-Id': sessionStorage.getItem("userId"),
                        'Channel-Id': '14',
                        'Device-Id': '111',
                        'Request-Uri': this.allProduct[index].url,
                        'Package-Name': 'com.h5'
                    },
                }).then(res => {
                    console.log(res.data)
                    // window.location.href = res.data
                    var explorer =navigator.userAgent ;
                    var isiOS = !!explorer.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    if(isiOS){
                        window.location.href = res.data
                    }else{
                        this.$router.push({path: '/Concisedetails?url=' +  res.data + '&title=' +   this.allProduct[index].title});
                    }
                })
            },
            getProduct() { //请求数据
                this.loading = true;
                let params = {
                    "pageSize": this.pageSize,
                    "pageNumber": this.pageNumber,
                    "packageName": "com.h5",
                    "channelId": "99"
                };
                setTimeout(() => { //延时请求数据
                this.$ajax.post(`${resources.graphQlApi}`, {
                    'query': `${productQuery}`,
                    variables: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Version': '1',
                    'User-Id': sessionStorage.getItem("userId"),
                    'Channel-Id': '14',
                    'Device-Id': '111',
                    'Request-Uri': 'https://api.pinganzhiyuan.com/panda_loan/graphql/query',
                    'Package-Name': 'com.h5'
                }
                }).then(res => {
                    var array = res.data.data.recommendProducts;
                    for (var i = 0; i < array.length ;i ++) {
                        array[i].firstTagArray = array[i].firstTags.split("|");
                    }
                    if(res.data.data.recommendProducts.length==0){
                        this.showLoading = false
                        return
                    }
                    this.allProduct = this.allProduct.concat(array);
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
                },1000);
            },
            loadMore() { //底部判断
                if(!this.loading) {
                    this.pageNumber ++
                    this.getProduct();
                }
            },
            downloadApp(){
                var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf("iphone") == -1) {
                    //安卓跳转
                    window.location.href = "http://sj.qq.com/myapp/detail.htm?apkName=com.mg.pandawalletdaikuan";
                } else {
                    //苹果跳转
                    window.location.href = "https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1330125527&mt=8";
                }
            }
    },
    mounted() { //第一次请求数据
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      this.getProduct()
      if(!this.loading){
        this.getProduct();
      }
    }
  };
</script>

<style> /*组件样式*/
    .page-infinite-loading{
        text-align: center;
        height: 1.8rem;
        line-height: 1.8rem;
        font-size: 0.6rem;
    }
    .page-infinite-loading div{
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
    }
</style>

<style lang="scss" scoped> /*单页面样式*/
    $rem:1rem/40;
    .pageOn{
        // margin-bottom: 88*$rem;
    }
    .footer{
        position: fixed;
        bottom: 0;
        z-index: 20;
        width: 100%;
        background:rgba(57,138,255,0.5);
        height:1.8rem;
        overflow: hidden;
    }
    // 底部下载
    .downBottom{
        position: fixed;
        bottom: 0rem;
        z-index: 20;
        width: 100%;
        background: red;
        height:1.8rem;
        overflow: hidden;
    }
    .header{  //顶部header
        position: fixed;
        top: 0;
        z-index: 20;
        width: 100%;
        background: red;
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
      text-align: center;
      height: 1.8rem;
      line-height: 1.8rem;
      font-size: 0.6rem;
    }
    .page-infinite-wrapper{ /*样式最外层*/
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        margin-top: 88*$rem;
        .product{
            background: #ffffff;
            height: auto;
            border-bottom: 0.25rem solid #f5f5f5;
            .title{
                text-align: left;
                height: 2rem;
                padding-left: 0.9rem;
                padding-top: 0.625rem;
                
                .avatar{
                    border-radius: 50%;
                    width: 1.4rem;
                    height: 1.4rem;
                    border: 1px solid #f5f5f5;
                }
                .title-word{
                    padding-left: 0.25rem;
                    padding-bottom: 1rem;
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 0.6rem;
                }
                .isNew{
                    padding-left: 0.25rem;
                    padding-bottom: 1rem;
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 0.4rem;
                    .isNew-border{
                        padding: 0.07rem 0.1rem 0 0.1rem;
                        color: rgb(236, 18, 16);
                        border: 1px solid rgb(236, 18, 16);
                    }
                }
                .firstTages{
                    padding-left: 0.2rem;
                    padding-bottom: 1rem;
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 0.4rem;
                    .firstTages-border{
                        padding: 0.07rem 0.1rem 0 0.1rem;
                        color: rgb(111, 143, 120);
                        border: 1px solid rgb(111, 143, 120);;
                    }
                }
            }
            .main-mes{
                text-align: left;
                margin: 0.625rem 0.9rem;
                .left-block{
                    width: 4.5rem;
                    vertical-align: top;
                    display: inline-block;
                    .left-top{
                        display: inline-block;
                        color: rgb(236, 18, 16);
                        font-size: 0.8rem;
                    }
                    .left-bottom{
                        padding-top: 0.25rem;
                        display: inline-block;
                        color: rgb(102, 102, 102);
                        font-size: 0.55rem;
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
                    width: 9.4rem;
                    margin-left: 0.1rem;
                    vertical-align: top;
                    display: inline-block;
                    .right-top{
                        display: inline-block;
                        font-size: 0.6rem;
                        color: rgb(153, 153, 153);
                    }
                    .right-bottom{
                        width: 8.8rem;
                        line-height: 0.7rem;
                        padding-top: 0.3rem;
                        display: inline-block;
                        // white-space:pre-wrap;
                        // width:6rem;
                        // overflow: hidden;
                        // display: inline-block;
                        font-size: 0.6rem;
                        color: rgb(153, 153, 153);
                    }
                }
                .iconlist{
                    vertical-align: center;
                    display: inline-block;
                    float: right;
                    .click-icon{
                        margin-top: 0.5rem;
                        width:0.4rem;
                    }
                }
            }
        }
    }  

      .downlogoText{

    }

    .downPanda{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: auto;
        background: rgba(255,255,255,0.85);
        overflow: hidden
    }
    .downPandaImg{
        float: left;
        width: auto;
        height: 120*$rem;
        line-height: 120*$rem;
        margin-left: 42*$rem;
    }

    .downPandaImg img{
        width: 77px;
        vertical-align: middle
    }

    .downText{
        margin-left: 10px;
        margin-top: 30px;
        float: right;
        width: auto;
        height: auto;
        line-height: 10*$rem;
    }

    .downText p {
        font-size:24*$rem;
        color:rgb(51,51,51);
        line-height:30px;
    }

    .downText p:last-child{
        font-size:18*$rem;
        color:rgb(51,51,51);
        line-height:30px;
    }

    // 底部下载
    .downzip{
        float: right;
        width: 165*$rem;
        height: 50*$rem;
        line-height: 50*$rem;
        margin-right: 42*$rem;
        text-align: center;
        vertical-align: middle;
        background:rgb(72,147,255);
        border-radius: 10*$rem;
        margin-top: 35*$rem;
    }

    .downzip span{
        padding: 5px;
        font-size: 32*$rem;
        color:#fff;
    }

    
</style>