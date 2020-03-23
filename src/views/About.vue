<template>
    <div class="panda">
        <div class="panda-img">
            <div class="panda-pic">
                <img v-bind:src="Image" alt="" class="head-pic">
            </div>
        </div>
        <div class="mes-list">
            <div class="mes">
				<div class="left-text">
                    <span>版本</span>
                </div>
				<div class="right-text">
                    <span class="gray">{{version}}</span>
                    <!-- <i class="fa fa-angle-right"></i> -->
                </div>
			</div>
            <div>
                <div class="left-border"></div>
                <div class="right-border"></div>
            </div>
            <div class="mes">
				<div class="left-text">
                    <span>微信公众号</span>
                </div>
				<div class="right-text" style="color:#999">
                    <span class="gray">敬请期待</span>
                    <!-- <i class="fa fa-angle-right"></i> -->
                </div>
			</div>
            <div>
                <div class="left-border"></div>
                <div class="right-border"></div>
            </div>
            <div class="mes">
				<div class="left-text">
                    <span>客服QQ</span>
                </div>
				<div class="right-text">
                    <span class="gray">{{QQNumber}}</span>
                    <!-- <i class="fa fa-angle-right"></i> -->
                </div>
			</div>
            <!-- <div class="mes">
				<div class="left-text">
                    <span>4008-XXX-XXX</span>
                </div>
				<div class="right-text">
                    <span></span>
                    <i class="fa fa-angle-right"></i>
                </div>
			</div> -->
        </div>

        <div class="bottom">

        </div>
    </div>
</template>


<script>

import resources from "../resources";


    const versionQuery = `
        query (
            $platformId: Byte
            $channelId: Int
            $packageName: String 
            $versionCode: Int
        ) {
            version(
                platformId: $platformId 
                channelId: $channelId
                packageName: $packageName
                versionCode: $versionCode
            ) {
                name
                logoUrl
            }
        }`;
        
    export default {
        data() {
            return {
                version: this.$route.query.version,
                packageName: this.$route.query.packageName,
                channelId: this.$route.query.channelId,
                versionCode: this.$route.query.versionCode,
                QQNumber:'敬请期待',
                Image: ''
            };
        },
        methods: {
            //@click="awakeApp('weixi')"
            //@click="awakeApp('QQ')"
            awakeApp(appName) {
                var params = {
                    scheme: appName
                };
                var ua = navigator.userAgent.toLowerCase();
                var isIphone = true;
                if (ua.indexOf("iphone") == -1) {
                    isIphone = false;
                }
                isIphone ? window.webkit.messageHandlers.awakeApp.postMessage(params) : panda.awakeApp(appName);
            },
            getPic(){
                var params = {
                    channelId: this.channelId,
                    packageName: this.packageName,
                    versionCode: this.versionCode,
                }
                var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf("iphone") == -1) {
                    params.platformId = 0
                } else {
                    params.platformId = 1
                }
                this.$ajax.post(`${resources.graphQlApi}`, {
                    'query': `${versionQuery}`,
                    variables: params
                })
                    .then(res => {
                        console.log(res)
                        this.loading = false
                        this.Image = res.data.data.version.logoUrl
                    });
                }
        },
        mounted: function () {
            //alert(this.version + " " + this.packageName + " " + this.channelId + " " + this.versionCode)
            this.getPic();
		}
    };
    
</script>

<style lang="scss">
    .panda{
        background: #f2f3f9;
        position: absolute;
        width: 100%;
        color: #fff;
        top: 1px;
        bottom: 1px;
        .panda-img{
            height: 8rem;
            .panda-pic{
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                //上面三行垂直居中
                text-align:center;
                .head-pic{
                    width: 5rem;
                    height: 5rem;
                    border-radius: 1.2rem;
                }
            }
        }
        .mes-list{
            background: #fff;
            color: #000000;
            .mes{
                font-family: "微软雅黑";
                padding: 0.9rem 0.5rem;
                height: 2.6rem;
                //border-bottom: 1px solid #dfdfdf;
                .left-text{
                    float: left;
                    width: 49%;
                    text-align: left;
                    font-size: 0.8rem;
                }
                .right-text{
                    float: left;
                    width: 49%;
                    text-align: right;
                    font-size: 0.8rem;
                    .gray{
                        color: #999999
                    }
                }
            }
            .left-border{
                float: left;
                background:#fff;
                height: 1px;
                width: 0.5rem;
            }
            .right-border{
                overflow: hidden;
                background: #e7e8f1;
                height: 2px;
            }
        }
        .bottom{
            margin-bottom: 1px;
        }
    }
</style>
