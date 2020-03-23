<template>
    <div>
        <div class="page-infinite-list page-loadmore-wrapper">
            <div class="productList-header"> <!--栏目-->
                <div class="productListHeader-list" @click="toClassification(index)" v-for="(item,index) in productListArrar" :key="index"> <!--单个-->
                    <img :src="item.iconUrl|imgdefault" alt="">
                    <p>{{item.title}}</p>
                </div>
            </div>
            <div v-for="(product,index) in allProduct" :key="product.id,index" class="product" @click="gotoUrl(index)">
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
import resources from "../../resources";
// 请求列表
const productQuery = `
        query( 
            $pageNumber: Int
            $pageSize: Int
            $h5WebName: String
            $h5ChannelUid: String
            $platformId: String
            $productTypeId: Long
        ){
            h5RecommendProducts(
                pageNumber:$pageNumber
                pageSize:$pageSize
                h5WebName: $h5WebName
                h5ChannelUid: $h5ChannelUid
                platformId: $platformId
                productTypeId: $productTypeId
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
    }`;
// 请求分类
const Classified = `
        query(
            $h5WebName:String
            $h5ChannelUid:String
            $platformId:String
        )
        {
            h5Columns(
               h5WebName: $h5WebName
               h5ChannelUid: $h5ChannelUid
               platformId:$platformId
            ){
                id
                h5ColumnKey
                h5ClientVersionId
                status
                name
                title
                subtitle
                url
                iconUrl
            }
        }
    `;

export default {
  data() {
    return {
      topNavs: [],
      showBottom: true,
      list: [],
      loading: true,
      allLoaded: false, //这个
      wrapperHeight: 0,
      allProduct: [],
      pageSize: 6,
      pageNumber: 1,
      tophint: true,
      nomore: false,
      noHeader: true,
      loadingIf: false,
      showBack: true,
      loading: "正在加载",
      nameText: "热门推荐",
      backone: true,
      Uid: this.$route.params.Uid,
      productListArrar: []
    };
  },
  filters: {
    imgdefault(value) {
      if (value == "") {
        return require("../../assets/gongjijin@2x.png");
      } else {
        return value;
      }
    }
  },
  methods: {
    SetProduct() {
      //添加数据
      var _this = this;
      _this.loadingIf = true;
      setTimeout(function() {
        // console.log('正在等待')
        _this.pageNumber++;
        _this.getProduct();
        _this.loadingIf = false;
      }, 1500);
    },
    gotoUrl(index) {
      //跳转链接
      window.location.href = this.allProduct[index].url;
      let url = this.allProduct[index].url;
      var str = "redirect=";
      var stringUrl = url.split(str)[1];
      window.location.href = decodeURIComponent(stringUrl);
    },
    getClassified() {
      //请求分类
      let params = {
        h5WebName: "appProductList",
        h5ChannelUid: this.Uid,
        platformId: "0"
      };
      this.$ajax
        .post(`${resources.graphQlApi}`, {
          query: `${Classified}`,
          variables: params,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Version": "1",
            "User-Id": "0",
            "Channel-Id": "14",
            "Device-Id": "111",
            "Request-Uri":"https://api.pinganzhiyuan.com/panda_loan/graphql/query",
            "Package-Name": this.Uid
          }
        })
        .then(res => {
            // console.log(res.data.data.h5Columns)
            var productList = res.data.data.h5Columns;
            for(var i =0;i<res.data.data.h5Columns.length;i++){
                if(res.data.data.h5Columns[i].id=='5'){
                    productList.splice(i, 1);
                    this.productListArrar = productList;
                }
            }
        })
        .catch(error => {
        //   console.log(error);
        });
    },
    getProduct() {
      //请求数据
      this.loadingIf = true;
      let params = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        h5WebName: "appProductList",
        h5ChannelUid: this.Uid,
        platformId: "0",
        productTypeId: "5"
      };
      this.$ajax.post(`${resources.graphQlApi}`, {
          query: `${productQuery}`,
          variables: params,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Version': "1",
            "User-Id": "0",
            "Channel-Id": "14",
            "Device-Id": "111",
            "Request-Uri":"https://api.pinganzhiyuan.com/panda_loan/graphql/query",
            "Package-Name": this.Uid
          }
        })
        .then(res => {
          this.loadingIf = false;
          this.loading = "加载更多";
          var array = res.data.data.h5RecommendProducts;
          for (var i = 0; i < array.length; i++) {
            array[i].firstTagArray = array[i].firstTags.split("|");
          }
          if (res.data.data.h5RecommendProducts.length < this.pageSize) {
            this.showBottom = false;
            this.nomore = true;
          }
          this.allProduct = this.allProduct.concat(array);
          this.allProduct.forEach(item => {
            if (item.maxAmount > 10000) {
              item.edu = item.maxAmount / 10000 + "万";
            } else {
              item.edu = item.maxAmount;
            }
            if (item.firstTags === "") {
              item.isFirstTags = false;
            } else {
              item.isFirstTags = true;
            }
          });
          localStorage.setItem('Uid',this.Uid)
        });
    },
    hideHint() {
      //点击隐藏
      this.tophint = false;
    },
    toClassification(index) {
      //跳转商品分类详情
        window.location.href="http://www.pinganzhiyuan.com/panda_loan_mobile_web/appClassification?title=" +this.productListArrar[index].title +"&id=" +this.productListArrar[index].id + '&uid=' + this.Uid
    }
  },
  mounted() {
    this.getProduct(); //首次请求
    this.getClassified(); //分类
  }
};
</script>

<style lang="scss" scoped>
$rem: 1rem/40; //配置rem比例

.header {
  //顶部header
  position: fixed;
  top: 0;
  z-index: 20;
  width: 100%;
  background: #fff;
  height: auto;
  border-bottom: 1*$rem solid #ececef;
  overflow: hidden;
}

.productList-header {
  //头部滑动菜单
  width: 100%;
  height: auto;
  background: #fff;
  border-bottom: 10*$rem solid #f5f5f5;
  overflow: hidden;
}

.productListHeader-list {
  float: left;
  width: 25%;
  // height: 200*$rem;
  text-align: center;
  padding-top: 40*$rem;
  padding-bottom: 40*$rem;
}

.productListHeader-list img {
  width: 50*$rem;
  height: 50*$rem;
}

.productListHeader-list p {
  font-size: 24*$rem;
  margin-top: 20*$rem;
  color: rgb(102, 102, 102);
}

// 加载更多
.page-infinite-loading {
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

.page-infinite-loading img {
  width: 0.7rem;
}

.page-infinite-listitem {
  height: 50px;
  line-height: 50px;
  border-bottom: solid 1px #eee;
  text-align: center;
}
.top {
  background: #ffffff;
  height: 2.5rem;
  border-bottom: 0.5rem solid #f5f5f5;
  .hint-pic {
    margin-left: 0.8rem;
    padding-top: 0.3rem;
    width: 1.6rem;
  }
  .vertical {
    margin-left: 0.8rem;
    margin-top: 0.3rem;
    vertical-align: top;
    display: inline-block;
    width: 0.05rem;
    height: 1.4rem;
    background: rgb(214, 214, 214);
  }
  .hint-text {
    margin-left: 0.8rem;
    color: rgb(51, 51, 51);
    font-size: 0.7rem;
    display: inline-block;
    //top:40%;
    transform: translateY(-70%);
  }
  .cancel {
    margin-left: 2.4rem;
    width: 0.8rem;
    display: inline-block;
    transform: translateY(-30%);
    //padding-top: 0.1rem;
  }
}

.nomore {
  padding-top: 0.6rem;
  height: 2rem;
  background: #f5f5f5;
  text-align: center;
  .nomore-border {
    color: #999;
    font-size: 0.7rem;
  }
  .nomore-text {
    color: #999;
    padding-right: 0.2rem;
    padding-left: 0.2rem;
    font-size: 0.7rem;
  }
}
.page-loadmore-wrapper {
  margin-top: -1px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch; //ios加载缓慢
  .product {
    background: #ffffff;
    height: auto;
    border-bottom: 0.25rem solid #f5f5f5;
    .title {
      height: 2rem;
      padding-left: 0.9rem;
      padding-top: 0.625rem;
      .avatar {
        border-radius: 50%;
        width: 1.4rem;
        height: 1.4rem;
        border: 1px solid #f5f5f5;
      }
      .title-word {
        padding-left: 0.25rem;
        padding-bottom: 1rem;
        display: inline-block;
        vertical-align: middle;
        font-size: 0.6rem;
      }
      .isNew {
        padding-left: 0.25rem;
        padding-bottom: 1rem;
        display: inline-block;
        vertical-align: middle;
        font-size: 0.4rem;
        .isNew-border {
          padding: 0.07rem 0.1rem 0 0.1rem;
          color: rgb(236, 18, 16);
          border: 1px solid rgb(236, 18, 16);
        }
      }
      .firstTages {
        padding-left: 0.2rem;
        padding-bottom: 1rem;
        display: inline-block;
        vertical-align: middle;
        font-size: 0.4rem;
        .firstTages-border {
          padding: 0.07rem 0.1rem 0 0.1rem;
          color: rgb(111, 143, 120);
          border: 1px solid rgb(111, 143, 120);
        }
      }
    }
    .main-mes {
      margin-left: 0.9rem;
      margin-top: 0.625rem;
      margin-bottom: 0.625rem;
      .left-block {
        width: 4.5rem;
        vertical-align: top;
        display: inline-block;
        .left-top {
          display: inline-block;
          color: rgb(236, 18, 16);
          font-size: 0.8rem;
        }
        .left-bottom {
          padding-top: 0.25rem;
          display: inline-block;
          color: rgb(102, 102, 102);
          font-size: 0.55rem;
        }
      }
      .middle-block {
        margin-left: 1.3rem;
        vertical-align: top;
        display: inline-block;
        width: 0.05rem;
        height: 1.4rem;
        background: rgb(214, 214, 214);
      }
      .right-block {
        width: 9.4rem;
        margin-left: 1rem;
        vertical-align: top;
        display: inline-block;
        .right-top {
          display: inline-block;
          font-size: 0.6rem;
          color: rgb(153, 153, 153);
        }
        .right-bottom {
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
      .iconlist {
        vertical-align: center;
        display: inline-block;
        .click-icon {
          margin-top: 0.5rem;
          width: 0.4rem;
        }
      }
    }
  }
}
</style>
