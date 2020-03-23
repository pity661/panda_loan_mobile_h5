<template> <!--基础部分-->
  <div class="page-infinite">
    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }"> <!--最外层盒子-->
      <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" >
        <!-- <li v-for="(item,index) in list" class="page-infinite-listitem"><span v-text="index+'  :  '"></span>{{ item.publishUserName }}</li>  -->
        <div v-for="product in list" :key="product.id" class="product" @click="skip(product.url)"> <!--遍历数据-->
           <!--标题-->
          <div class="title">
            <img v-bind:src="product.imgUrl" alt="" class="avatar">
            <span class="title-word">{{product.title}}</span>
            <span class="isNew" v-if="product.isNew"><span class="isNew-border">新上线</span></span>
            <span class="firstTages" v-for="(FirstTag,index) in product.firstTagArray" :key="index"><span class="firstTages-border">{{FirstTag}}</span></span>
          </div>
           <!--介绍-->
          <div class="main-mes">
            <div class="left-block">
              <span class="left-top">最高{{product.edu}}元</span>
              <br/>
              <span class="left-bottom" v-if="product.minTerm === product.maxTerm">期限{{product.minTerm}}个月</span>
              <span class="left-bottom" v-if="product.minTerm != product.maxTerm">期限{{product.minTerm}}~{{product.maxTerm}}个月</span>
            </div>
            <div class="middle-block"></div>
            <div class="right-block">
              <span class="right-top">日利率{{product.dayRate}}%起</span>
              <br/>
              <span class="right-bottom">{{product.description}}</span>
            </div>
            <div class="icon">
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
import api from '../../api' //测试数据
import resources from '../../resources' 
  const productQuery = `
    query(
      $pageNumber: Int
      $pageSize: Int
    ){
    recommendProducts(
      pageNumber:$pageNumber,
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
    data() {
      return {
        list: [], //数组
        showLoading:true, //底部显示加载还是到底
        loading: false, //加载中
        wrapperHeight: 0,
        currentPage:0,
      };
    },
    methods: {
      getData(){ //请求数据
        console.log('第       '+ this.currentPage+'       页')
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
        console.log('加载中')
          if(!this.loading) {
            this.currentPage ++
            this.getData();
          }
      }
    },
    mounted() { //第一次请求数据
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      if(!this.loading){
        this.getData();
      }
    }
  };
</script>

<style> /*组件样式*/
    .page-infinite-loading{
        text-align: center;
        height: 1.8rem;
        line-height: 1.8rem;
    }
    .page-infinite-loading div{
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
    }
</style>

<style lang="scss" scoped> /*单页面样式*/
    $rem:1rem/40;
    .page-infinite{
        text-align: center;
        color: #666;
        overflow: hidden;
    }

    .page-infinite-wrapper{
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .page-infinite-listitem{
        height: 250px;
        line-height: 250px;
        border-bottom: solid 1px black;
        text-align: center;
    }
    .nolive{
      text-align: center;
      height: 1.8rem;
      line-height: 1.8rem;
    }
        .mint-loadmore-text{
        font-size: 0.6rem;
    }
    .top{
        position: relative;
        float: top;
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
    .page-infinite-wrapper{
        .nomore{
            padding-top: 0.6rem;
            height: 2rem;
            background: #f5f5f5;
            text-align: center;
            .nomore-border{
                color: #999999;
                font-size: 0.7rem;
            }
            .nomore-text{
                color: #999999;
                padding-right: 0.2rem;
                padding-left: 0.2rem;
                font-size: 0.7rem;
            }
        }
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
                        padding: 0.05rem 0.1rem 0 0.1rem;
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
                        padding: 0.05rem 0.1rem 0 0.1rem;
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
                .icon{
                    vertical-align: center;
                    display: inline-block;
                    .click-icon{
                        margin-top: 0.2rem;
                        width:0.4rem;
                    }
                }
            }
        }
    }  
    
</style>