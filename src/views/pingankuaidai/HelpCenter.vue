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
                    {value:"平安快贷是什么？"},
                    {value:"申请平安快贷的条件是什么？"},
                    {value:"如何申请平安快贷？"},
                    {value:"申请贷款后，平台会联系我填写的联系人吗？"},
                    {value:"为什么拒绝我的贷款申请？"},
                    {value:"贷款申请被拒绝后还可以再申请吗？"},
                    {value:"我申请的贷款什么时间到账？"},
                    {value:"平安快贷支持哪些还款方式？"},
                    {value:"平安快贷什么时间进行自动扣款？"}
                ],
                listAnswer: [
                    {value:"平安快贷是福建泰宁晋农商大金湖村镇银行股份有限公司为互联网用户提供的无抵押、无担保的信用贷款服务平台。"},
                    {value:"年满十八周岁且具有中华人民共和国法律规定的完全民事行为能力人。"},
                    {value:"用户可通过平安快贷APP按照操作提示，申请贷款。"},
                    {value:"平台仅在客户未能如期偿还贷款时，联系客户申请时填写的联系人。"},
                    {value:"对于不符合贷款要求的借款申请，平台将拒绝贷款申请。"},
                    {value:"贷款申请被审批拒绝后，过后再次提交借款申请。"},
                    {value:"平安快贷平台可在借款申请审核通过后的24小时内，完成放款。"},
                    {value:"平安快贷同时支持系统自动划扣和客户主动还款两种方式。"},
                    {value:"系统会在账单的到期还款日自动从用户绑定的银行借记卡上划扣相应金额。"}
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
                color: rgb(129, 175, 252);
            }
        }
        .help-middle{
            background-color: #ffffff;
            .middlet-block{
                .middle-border{
                    background-color: #f5f5f5;
                    width: 100%;
                    height: 2px;
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
                        color: rgb(129, 175, 252);
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
