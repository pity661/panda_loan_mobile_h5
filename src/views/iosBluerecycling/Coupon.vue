<template>
    <div class="copon">
        <div class="top">
            <span class="top-text" v-bind:class="{click:unused}" @click="show(0)">未使用</span>
            <span class="top-text" v-bind:class="{click:used}" @click="show(1)">已使用</span>
            <span class="top-text" v-bind:class="{click:expired}" @click="show(2)">已过期</span>
        </div>
        <div class="hint-top" v-if="unused">
            <span class="hint-text">若已领取加价券可在10分钟后查看</span>
        </div>
        <div class="center" v-if="unused">
            
            <img src="~@/assets/nocoupon.png" class="nocoupon">
            <div class="center-text">您没有可使用的加价券</div>
        </div>
        <div class="coupon-top" v-if="used">
            <div class="discount">有效期至：2018-4-30</div>
            <!-- <img src="~@/assets/coupon.png" class="coupon"> -->
            <div class="validity">
               订单满3000元即可使用
            </div>
        </div>
        <div class="hint-top1" v-if="expired">
        </div>
        <div class="center" v-if="expired">
            <img src="~@/assets/nocoupon.png" class="nocoupon">
            <div class="center-text">您没有已过期的加价券</div>
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
    $rem:1rem/45;
    .click{
        color: #5883e2;
    }
    .copon{
        height: 100%;
        //width:100%;
        background-color: #f5f5f5;
        .coupon-top{
            margin: 0 auto;
            width: 780*$rem;
            height: 350*$rem;
            background: url(~@/assets/ioscouon.png) no-repeat scroll;
            background-size: 100%;
            margin-top: 0.5rem;
            .discount{
                color: #ffffff;
                font-size: 34*$rem;
                margin-left:355*$rem;
                padding-top:165*$rem;
            }
            .validity{
                margin: 0 auto;
                width: 640*$rem;
                height: auto;
                font-size: 48*$rem;
                margin-top:70*$rem;
                text-align: center;
                color: #fff;
                // border-bottom: 3px solid #fff;
                overflow: hidden;
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
            background-color: #a0b7eb;
            .hint-text{
                display: inline-block;
                line-height: 1.5rem;
                font-size: 0.65rem;
                color: #5883e2;
                text-align: center;
                width: 100%;
            }
        }
        .hint-top1{
            //width: 100%;
            height:1.5rem;
        }
    }
</style>