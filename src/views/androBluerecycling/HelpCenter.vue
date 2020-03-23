<template>
    <div style="background-color:#f5f5f5;height:100%;">
        <div v-if="show">
            <div class="help-top">
                <span class="top-text">常见问题</span>
            </div>
            <div class="help-middle">
                <div class="middle-block" v-for="(item,index) in listQuestion" :key="index">
                    <div class="middle-border"></div>
                    <div class="middle-left" @click="skip(index)">
                        <span class="middle-point">●</span>
                        <span class="middle-text">{{item.value}}</span>
                    </div>
                    <div class="icon"><img src="~@/assets/helpclick.png" class="click-icon"></div>
                </div>
            </div>
            <div class="help-bottom">如未能解答您的疑问，可以反馈意见给我们</div>
        </div>
        <div v-if="!show">
            <div class="helpt-top" @click="back()">
                <span class="topt-text">{{listQuestion[questionNum].value}}</span>
            </div>
            <div class="help-middle" v-for="(item,index) in listAnswer" :key="item.index" v-if="index === questionNum">
                <div class="middlet-block" >
                    <div class="middle-border"></div>
                    <div class="middlet-left">
                        <span class="middle-text">{{item.value}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
		data() {
			return {
                listQuestion: [
                    {value:"小赢白卡是什么？"},
                    {value:"小赢白卡回收哪些电子产品？"},
                    {value:"我的机器多少钱回收？"},
                    {value:"小赢白卡的估价，可以议价吗？"},
                    {value:"机器在运输途中损坏怎么办？"},
                    {value:"我可以送货到小赢白卡吗?"},
                    {value:"小赢白卡不回收哪些机器？"},
                    {value:"多部手机如何操作回收？"},
                    {value:"快递费用如何收取？"},
                    {value:"回收款何时到账？"},
                    {value:"为什么我的机器会检测不通过？"},
                    {value:"机器检测不通过怎么办？"},
                    {value:"多久可以收到退回的机器？"}                    
                ],
                listAnswer: [
                    {value:"小赢白卡是专注为中国大陆地区互联网用户提供的智能终端的回收服务平台。"},
                    {value:"小赢白卡回收市场上多种品牌的智能手机及平板电脑。"},
                    {value:"用户可以在首页点击‘马上评估’，根据产品流程完善设备信息，提交订单后系统会在30分钟内给出报价。"},
                    {value:"小赢白卡给出的价格为综合机器品牌、使用时间等信息后，给出的综合评估价格，不接受议价。"},
                    {value:"小赢白卡已接入数帮保险，机器确为运输途中损坏的，数帮保险为您承保订单金额50%的货款。"},
                    {value:"小赢白卡为线上服务平台，不接受用户自行上门送货。"},
                    {value:"脏机（偷捡抢）、黑机（苹果套保机），不回收；不在小赢白卡回收类别中的设备，不回收。"},
                    {value:"小赢白卡仅限回收当前登录设备，如您有多部设备，需在待回收的设备上安装app进行操作。"},
                    {value:"快递费用由用户自行承担，小赢白卡不接收到付的快递订单。"},
                    {value:"小赢白卡会在用户确认接受评估价格后24小时内，将订单金额的30%作为首付款，汇至用户已绑定的银行卡上; 在收到用户设备并检测后，将尾款汇至用户的银行卡上。"},
                    {value:"小赢白卡收到用户的机器后会进行检测, 机器需要与提交订单时硬件检测的信息一致，对于不一致的机器，平台拒绝回收。"},
                    {value:"对于未能通过检测的机器，小赢白卡会将机器快递给用户，运费需要用户自行承担。"},
                    {value:"需要退回的机器，小赢白卡平台使用顺丰快递快递给您，通常在3-5个工作日可以到达。"},
                ],
                questionNum: '',
                show: true
            }
        },
        methods: {
            skip(index) {
                this.questionNum = index;
                this.show = false;
            },
            // back() {
            //     this.questionNum = '';
            //     this.show = true;
            // }
        }
    }
</script>
<style lang="scss">
        .helpt-top{
            height: 2rem;
            background-color: #ffffff;
            .topt-text{
                line-height: 2rem;
                font-size: 0.65rem;
                padding-left: 1rem;
                color: rgb(51, 51, 51);
            }
        }
        .help-top{
            height: 2rem;
            background-color: #ffffff;
            //border-top: 1px solid #f5f5f5;
            //border-top: 1px solid #f5f5f5;
            .top-text{
                line-height: 2rem;
                font-size: 0.65rem;
                padding-left: 1rem;
                color: #5883e2;
            }
        }
        .help-middle{
            background-color: #ffffff;
            .middlet-block{
                .middle-border{
                    background-color: #f5f5f5;
                    width: 100%;
                    height:2.1px;
                    margin-left: 1rem;
                }
                .middlet-left{
                    padding-left: 1rem;
                    .middle-text{
                        display: inline-block;
                        line-height: 1rem;
                        font-size: 0.6rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        color: rgb(102,102,102);
                    }
                }
            }
            .middle-block{
                height: 2rem;
                .middle-border{
                    background-color: #f5f5f5;
                    width: 100%;
                    height: 2px;
                    margin-left: 1rem;
                }
                .middle-left{
                    display: inline-block;
                    .middle-point{
                        margin-left: 1rem;
                        display: inline-block;
                        color: #5883e2;
                        line-height: 2rem;
                        //font-size: 0.1rem;
                    }
                    .middle-text{
                        width: 16rem;
                        display: inline-block;
                        padding-left: 0.3rem;
                        font-size: 0.6rem;
                    }
                }
                .icon{
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 0.6rem;
                    .click-icon{
                        width:0.35rem;
                    }
                }
            }
        }
        .help-bottom{
                    background-color: #f5f5f5;
            color: rgb(102,102,102);
            margin-top: 0.6rem;
            font-size: 0.6rem;
            margin-left: 1rem;
        }
</style>
