<template> <!--基础部分-->
  <div class="page-infinite">
    <div class="header" v-show="noHeader">
        <Xheader v-if="showBack" :showBack="showBack" :nameText="nameText" :backone="backone"></Xheader>
    </div>
    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }"> <!--最外层盒子-->
      <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" >
        <div class="productList-header"> <!--栏目-->
            <div class="productListHeader-list" @click="toClassification(index)" v-for="(item,index) in productListArrar" :key="index"> <!--单个-->
                <img :src="item.imgUrl" alt="">
                <p>{{item.title}}</p>
            </div>
        </div>
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
        list: [], //数组
        showLoading:true, //底部显示加载还是到底
        loading: false, //加载中
        wrapperHeight: 0,
        currentPage:0,
        showBack:true,
        nameText:'热门推荐',
        noHeader:true,
        safari:false,
        backone:true,
        allProduct:[],
        pageSize: 6,
        pageNumber: 1,
        showLoading:true, //底部显示加载还是到底
        productListArrar:[ //tab数组
            {
                title:'新品推荐',
                id:'1',
                imgUrl:require("../../assets/new@2x.png")
            },
            {
                title:'苹果专区',
                id:'4',
                imgUrl:require("../../assets/apple@2x.png")
            },
            {
                title:'用信用卡贷',
                id:'3',
                imgUrl:require("../../assets/xinyong@2x.png")
            },
            {
                title:'用公积金贷',
                id:'2',
                imgUrl:require("../../assets/gongjijin@2x.png")
            }
        ]
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
                        this.$router.push({path: '/Detailspage?url=' +  res.data + '&title=' +   this.allProduct[index].title});
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
            getData(){ //请求数据
                this.loading = true;
                setTimeout(() => { //延时请求数据
                    this.$ajax.get(api.getmoments(this.currentPage,7)).then((res) => {
                        if(res.data.obj.object.list.length==0){ //如果没有数据了
                            this.showLoading = false
                        return
                        }else{ //有数据的话
                            this.list = this.list.concat(res.data.obj.object.list);
                            this.loading = false;
                        }
                    })
                },1000);
            },
            loadMore() { //底部判断
                if(!this.loading) {
                    this.pageNumber ++
                    this.getProduct();
                }
            },
            toClassification(index){ //跳转商品分类详情
                this.$router.push({
                    path: '/DetailsOfclassification?title=' + this.productListArrar[index].title  + '&id=' + this.productListArrar[index].id
                });
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

    .header{  //顶部header
        position: fixed;
        top: 0;
        z-index: 20;
        width: 100%;
        background: #fff;
        height:auto;
        border-bottom: 1*$rem  solid #ececef;
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
    
    .productList-header{ //头部滑动菜单
        width: 100%;
        height: auto;
        background: #fff;
        border-bottom: 10*$rem solid #f5f5f5;
        overflow: hidden;
    }

    .productListHeader-list{
        float: left;
        width: 25%;
        // height: 200*$rem;
        text-align: center;
        padding-top: 40*$rem;
        padding-bottom: 40*$rem;
    }

    .productListHeader-list img{
        width: 50*$rem;
        height: 50*$rem;
    }

    .productListHeader-list p{
        font-size: 24*$rem;
        margin-top: 20*$rem;
        color:rgb(102, 102, 102)
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

    
</style>