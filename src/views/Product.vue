<template>
    <div>
        <div class="top" v-if="tophint">
            <img src="~@/assets/hint.png" class="hint-pic">
            <div class="vertical"></div>
            <span class="hint-text">同时申请3个产品，通过率更高哦</span>
            <img src="~@/assets/cancel.png" class="cancel" @click="hideHint()">
        </div>

        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px'}" v-bind:class="{tophint:!tophint}">

            <mt-loadmore  :bottom-method="loadBottom"
                :bottom-all-loaded="bottomAllLoaded"
                ref="loadmore" @bottom-status-change="handleBottomChange"
                :auto-fill="false">

                <div v-for="product in allProduct" :key="product.id" class="product" @click="skip(product.url)">
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

            </mt-loadmore>
            <div class="nomore" v-if="nomore">
                <span class="nomore-border">—</span><span class="nomore-text">没有更多了哦</span><span class="nomore-border">—</span>
            </div>
        </div>



    </div>
</template>

<script>
    import resources from '../resources'

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
                allProduct: [],
                tophint: true,
                pageSize: 6,
                pageNumber: 1,
                bottomAllLoaded: false,
                wrapperHeight: 0,
                nomore: false
            }
		},
		methods: {
            skip(url){
                window.location.href = url;
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom() {
                setTimeout(() => {
                this.pageNumber ++;
                this.getProduct();
                this.$refs.loadmore.onBottomLoaded();
                }, 1500);
            },
            hideHint() {
                this.tophint = false;
                this.wrapperHeight = this.wrapperHeight + 50;
            },
            getProduct() {
                let params = {
                    "pageSize": this.pageSize,
                    "pageNumber": this.pageNumber
                };

                this.$ajax.post(`${resources.graphQlApi}`, {
                    'query': `${productQuery}`,
                    variables: params,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Version': '1',
                        'User-Id': '25027',
                        'User-Agent': '123',
                        'Channel-Id': '0',
                        'Device-Id': '',
                        'Request-Uri': 'http://192.168.123.222'
                    }
                })
                .then(res => {
                    console.log(res.data.data.recommendProducts);
                    var array = res.data.data.recommendProducts;
                    for (var i = 0; i < array.length ;i ++) {
                        array[i].firstTagArray = array[i].firstTags.split("|");
                        //console.log(array[i].firstTagArray)
                    }

                    this.allProduct = this.allProduct.concat(array);
                    //this.wrapperHeight = this.wrapperHeight + 40;
                    if (array.length < this.pageSize) {
                        this.bottomAllLoaded=true;
                        this.nomore = true;
                    } else {
                        this.bottomAllLoaded = false;
                    }
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
            }

        },
        mounted: function () {
            this.getProduct()
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
    }
</script>
<style lang="scss" scoped>
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
    .page-loadmore-wrapper{
        overflow: scroll;
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
