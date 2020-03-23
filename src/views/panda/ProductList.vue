<template>
    <div >
        <div class="header" v-show="noHeader">
            <Xheader v-if="showBack" :showBack="showBack" :nameText="nameText" :backone="backone"></Xheader>
        </div>
        <div class="page-infinite-list page-loadmore-wrapper">
            <div class="productList-header"> <!--栏目-->
                <div class="productListHeader-list" @click="toClassification(index)" v-for="(item,index) in productListArrar" :key="index"> <!--单个-->
                    <img :src="item.imgUrl" alt="">
                    <p>{{item.title}}</p>
                </div>
            </div>
            <div v-for="(product,index) in allProduct" :key="product.id,index" class="product" @click="getUrl(product.id,index)">
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
         <div class="nomore" v-if="nomore">
                    <span class="nomore-border">—</span><span class="nomore-text">没有更多了哦</span><span class="nomore-border">—</span>
                </div>
        <p v-if="showBottom" class="page-infinite-loading" @click="SetProduct">
            <img src="~@/assets/loading.gif" alt="" v-if="loadingIf">{{loading}}
        </p>

    </div>
</template>
<script type="text/babel">
    import resources from '../../resources'
    import Xheader from 'common/X-header'
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
        components: {
            Xheader
        },
        data() {
            return {
                topNavs:[],
                showBottom:true,
                list: [],
                loading: true,
                allLoaded: false,//这个
                wrapperHeight: 0,
                allProduct: [],
                pageSize: 6,
                pageNumber: 1,
                tophint:true,
                nomore:false,
                noHeader:true,
                loadingIf:false,
                showBack:true,
                loading:'正在加载',
                nameText:'热门推荐',
                backone:true,
                productListArrar:[{
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
                }],
            };
        },
        methods: {
            SetProduct(){ //添加数据
                var _this = this
                _this.loadingIf = true
                setTimeout(function(){
                _this.pageNumber ++;
                _this.getProduct()
                _this.loadingIf = false
                },1500)

            },
            getUrl(pid,index){
                let url = resources.recordUrl();
                let params = {
                    'userId': sessionStorage.getItem("userId"),
                    'pid': pid,
                }
                var qs = require('qs');
                this.$ajax.post(url,qs.stringify(params),{
                    headers: {
                        'H5-Web-Name': 'yearLanding',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Version': '1',
                        'User-Id': sessionStorage.getItem("userId"),
                        'Channel-Id': '14',
                        'Device-Id': '111',
                        'Request-Uri': this.allProduct[index].url,
                        'Package-Name': sessionStorage.getItem("Uid"),
                        "Landing-Channel-Uid": sessionStorage.getItem("Uid")
                    },
                }).then(res => {
                    window.location.href = res.data
                    // this.$router.push({path: '/Detailspage?url=' +  res.data + '&title=' +   this.allProduct[index].title});
                })
            },
            getProduct() { //请求数据
                this.loadingIf = true
                let params = {
                    "pageSize": this.pageSize,
                    "pageNumber": this.pageNumber,
                    'h5WebName': 'yearLanding',
                    'h5ChannelUid': sessionStorage.getItem("Uid"),
                    'platformId': '0',
                    'productTypeId': '5'
                };
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
                        'Package-Name': sessionStorage.getItem("Uid")
                    }
                }).then(res => {
                    this.loadingIf = false
                    this.loading = '加载更多'
                    var array = res.data.data.recommendProducts;
                    for (var i = 0; i < array.length ;i ++) {
                        array[i].firstTagArray = array[i].firstTags.split("|");
                    }
                    if(res.data.data.recommendProducts.length<this.pageSize){
                        this.showBottom = false
                        this.nomore = true
                    }
                    this.allProduct = this.allProduct.concat(array);
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
            },
            hideHint(){ //点击隐藏
                this.tophint = false
            },
            toClassification(index){ //跳转商品分类详情
                this.$router.push({
                    path: '/DetailsOfclassification?title=' + this.productListArrar[index].title  + '&id=' + this.productListArrar[index].id
                });
            }
        },
        mounted() {
            this.getProduct() //首次请求
        }
    };
</script>

<style lang="scss" scoped>
    $rem:1rem/40; //配置rem比例

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

    // 加载更多
    .page-infinite-loading{
        text-align: center;
        height: 2rem;
        line-height: 2rem;
        font-size: 0.7rem;
        background: #f5f5f5;
        div {
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
        }
    }

    .page-infinite-loading img{
        width: 0.7rem
    }

    .page-infinite-listitem{
         height: 50px;
        line-height: 50px;
        border-bottom: solid 1px #eee;
        text-align: center;
    }
    .top{
        background: #ffffff;
        height: 2.5rem;
        border-bottom: 0.5rem solid #f5f5f5;
        .hint-pic{
            margin-left: 0.8rem;
            padding-top: 0.3rem;
            width: 1.6rem;
        }
        .vertical{
            margin-left: 0.8rem;
            margin-top: 0.3rem;
            vertical-align: top;
            display: inline-block;
            width: 0.05rem;
            height: 1.4rem;
            background: rgb(214, 214, 214)
        }
        .hint-text{
            margin-left: 0.8rem;
            color: rgb(51, 51, 51);
            font-size: 0.7rem;
            display: inline-block;
            //top:40%;
            transform:translateY(-70%);
        }
        .cancel{
            margin-left: 2.4rem;
            width: 0.8rem;
            display: inline-block;
            transform:translateY(-30%);
            //padding-top: 0.1rem;
        }
    }

    .nomore{
        padding-top: 0.6rem;
        height: 2rem;
        background: #f5f5f5;
        text-align: center;
        .nomore-border{
            color: #999;
            font-size: 0.7rem;
        }
        .nomore-text{
            color: #999;
            padding-right: 0.2rem;
            padding-left: 0.2rem;
            font-size: 0.7rem;
        }
    }
    .page-loadmore-wrapper{
        margin-top: -1px;
        overflow: scroll;
         -webkit-overflow-scrolling: touch; //ios加载缓慢
         margin-top: 88*$rem;
        .product{
            background: #ffffff;
            height: auto;
            border-bottom: 0.25rem solid #f5f5f5;
            .title{
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
                margin-left: 0.9rem;
                margin-top: 0.625rem;
                margin-bottom: 0.625rem;
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
                    margin-left: 1rem;
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
                    .click-icon{
                        margin-top: 0.5rem;
                        width:0.4rem;
                    }
                }
            }
        }
    }

</style>
