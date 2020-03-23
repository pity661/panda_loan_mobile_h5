<template>
    <div class="copon">
        <div class="top">
            <span class="top-text" v-bind:class="{click:unused}" @click="show(0)">未使用</span>
            <span class="top-text" v-bind:class="{click:used}" @click="show(1)">已使用</span>
            <span class="top-text" v-bind:class="{click:expired}" @click="show(2)">已过期</span>
        </div>
        <div class="hint-top" v-if="unused">
            <span class="hint-text">若已领取优惠券可在10分钟后查看</span>
        </div>
        <div class="center" v-if="unused">
            <img src="~@/assets/nocoupon.png" class="nocoupon">
            <div class="center-text">您没有可使用的优惠券</div>
        </div>
        <div class="center" v-if="used">
            <img src="~@/assets/nocoupon.png" class="nocoupon">
            <div class="center-text">您没有已使用的优惠券</div>
        </div>
        <div class="coupon-top" v-if="expired">
            <div class="discount">9.8折</div>
            <!-- <img src="~@/assets/coupon.png" class="coupon"> -->
            <div class="validity">
                <div class="validity-top">有效期至：2017.8.8-2017.8.20</div>
                <div class="validity-bottom">借款金额满3000元可用,最高抵扣9元</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
		data() {
			return {
                unused: true,
                expired: false,
                used: false
            }
        },
        methods: {
            show(num) {
                if (num === 0) {
                    this.unused = true;
                    this.expired = false;
                    this.used = false;
                } else if (num === 1) {
                    this.expired = false;
                    this.unused = false;
                    this.used = true;
                } else if (num === 2) {
                    this.unused = false;
                    this.expired = true;
                    this.used = false;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .click{
        color: rgb(254, 201, 70);
    }
    .copon{
        height: 100%;
        //width:100%;
        background-color: #f5f5f5;
        .coupon-top{
            height: 7.5rem;
            background: url(~@/assets/coupon.png) no-repeat scroll;
            background-size: 95%;
            background-position-x: 0.5rem;
            margin-top: 0.5rem;
            .discount{
                color: #ffffff;
                font-size: 1.95rem;
                margin-left: 12rem;
                padding-top: 1.3rem;
            }
            .validity{
                margin-left: 1.4rem;
                margin-top: 1.8rem;
                .validity-top{
                    font-size: 0.6rem;
                    color: rgb(153, 153, 153);
                }
                .validity-bottom{
                    margin-top: 0.45rem;
                    color: rgb(153, 153, 153);
                    font-size: 0.6rem;
                }
            }
        }
        .center{
            margin-top: 9rem;
            text-align: center;
            .nocoupon{
                width: 6rem;
            }
            .center-text{
                margin-top: 0.5rem;
                font-size: 0.75rem;
                color: rgb(107, 107, 107)
            }
        }
        .top{
            background-color: #ffffff;
            border-top: 1px solid rgb(214, 215, 220);
            border-bottom: 1px solid rgb(214, 215, 220);
            height: 2.5rem;
            width: 100%;
            font-size: 0;
            .top-text{
                line-height: 2.5rem;
                text-align: center;
                vertical-align: middle;
                font-size: 0.75rem;
                display: inline-block;
                height: 100%;
                width: 33.3%;
                border-right: 1px solid rgb(214, 215, 220);
            }
        }
        .hint-top{
            //width: 100%;
            height:1.5rem;
            background-color: rgb(255, 251, 214);
            .hint-text{
                display: inline-block;
                line-height: 1.5rem;
                font-size: 0.65rem;
                color: rgb(255, 209, 95);
                text-align: center;
                width: 100%;
            }
        }
    }
</style>