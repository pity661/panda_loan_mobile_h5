<template lang="html">
  <div class="list">
    <div class="header">
      <i class="back fa fa-angle-left"></i>
      <h3>芝麻分贷</h3>
    </div>
    <div class="list-main" v-infinite-scroll="loaderMore" infinite-scroll-immediate-check='check' infinite-scroll-distance="10" infinite-scroll-disabled="loading">
      <div class="list-item" v-for="item in listItem">
        <div class="list-item-img">
          <img src="item.img" alt="">
        </div>
        <div class="list-item-info">
          <div class="list-item-info-title">
            <h3>{{item.itemtitle}}</h3>
            <span class="category" v-for="cate in item.category">{{cate}}</span>
          </div>
          <p class="list-item-info-desc">{{item.itemDesc}}</p>
          <p class="list-item-info-price">{{item.itemInfoPrice}}</p>
        </div>
        <i class="list-item-next fa fa-angle-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listItem: [{
        img: '#',
        itemtitle: '读秒',
        category: ['不查征信', '当日放款'],
        itemDesc: '最高可借1万元',
        itemInfoPrice: '日利率万分之三'
      }],
      q: {
        per_page: 10,
        page: 1
      },
      totalCount: 0
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
         this.$ajax({
          url: resources.host + "/graphql/query",
          method: 'post',
          data: {
            userId: 1,
            name: this.personName,
            idNo: this.personCard,
            edu: this.picker3Value, 
            guarantee: this.picker2Value,
            profession: this.picker1Value 
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        
        }).then(res=>{
          if (res.status != 201) {
            panda.showAlert("身份验证有误");
          } else {
            panda.showResult(res);
          }
        })
        // const paramQuery = isEmpty(this.$route.query) ? '' : this.$route.query
        // this.api.getCatePros(cateId, paramQuery).then((res) => {
        //   this.loading = false
        //   this.categoryItem = this.categoryItem.concat(res.data.items)
        //   this.totalCount = res.data.paginate_meta.total_count
        // })
    },
    loaderMore () {

      // if (this.categoryItem.length >= this.totalCount) {
      //   this.$toast({
      //     message: '无更多数据可加载',
      //     position: 'middle',
      //     duration: 2000
      //   })
      //   return
      // }
      // this.loading = true
      // this.q.page = this.q.page + 1
      // this.fetchData()
    }
  }
}
</script>

<style lang="scss">
 .list {
   .header {
     width: 100%;
     height: 90px;
     background: #fff;
     text-align: center;
     line-height: 90px;
     .back {
       float: left;
       line-height: 90px;
       margin-left: 40px;
     }
     h3 {
       text-align: center;
       font-size: 32px;
       color: #575757;
     }
   }
   .list-main {
     margin-top: 46px;
     padding: 0 16px;
     .list-item {
       background: #fff;
       border-bottom: #ccc solid 1px; /*no*/
       overflow: hidden;
       position: relative;
       .list-item-next {
         position: absolute;
         width: 90px;
         height: 90px;
         right: 0;
         top: 46px;
         text-align: center;
         line-height: 90px;
       }
       .list-item-img {
         width: 100px;
         height: 100px;
         float: left;
         border-radius: 50%;
         background: #ccc;
         float: left;
         margin: 40px 46px 0 14px;
         img {
           width: 100px;
           height: 100px;
         }
       }
       .list-item-info {
         float: left;
         width: 510px;
         .list-item-info-title {
           height: 46px;
           margin-top: 22px;
           h3 {
             line-height: 46px;
             font-size: 28px;
             float: left;
             margin-right: 8px;
           }
           .category {
             display: inline-block;
             height: 32px;
             line-height: 32px;
             color: #fff;
             font-size: 20px;
             background: #aaa;
             border-radius: 5px;
             padding: 0 10px;
             float: left;
             margin: 5px 8px 0 0;
           }
         }
         .list-item-info-desc {
           margin-top: 14px;
           color: #ff9800;
           font-size: 26px;
           height: 46px;
           line-height: 46px;
           margin-top: 6px;
         }
         .list-item-info-price {
           color: #AAA;
           font-size: 26px;
           height: 46px;
           line-height: 46px;
           margin-top: 6px;
         }
       }
     }
   }
 }
</style>
