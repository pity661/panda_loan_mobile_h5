<template>
    <div class="ynlanding-panda ynfirstpage">
          <img style="position:absolute;left:0px;top:0px;width:35%;margin-left:10px;margin-top:10px;" src="~@/assets/XMDKFLOAT.png" />
        <div class="yntop"></div> <!--占位div-->
        <div class="ynmiddle">  <!--表单-->
            <div class="ynallinput">
                <div> 
                    <input type="number" class="yncode-input" placeholder="请输入手机号码" v-model="phone"/>
                </div>
                <div>
                    <input type="number" class="ynphone-input" placeholder="请填写短信验证码" v-model="smsCode"/>
                    <input type="button" class="yncode-button" v-bind:class="{yncantClick:is_show}" :value="count+codeButtonText"  @click="getCode()"/>
                </div>
                <!-- 图片验证码 -->
                <div v-if="picCode"> 
                    <input type="number" class="ynphone-input" placeholder="请填写验证码" v-model="imaCode"/>
                    <img :src="imageCode" alt="" class="ynimage-code" @click="getImageCode">
                </div>
                <!-- 协议 -->
                <div class="yntext-hint"><span class="yntext-left">点击立即借款既表示同意</span><span class="yntext-right" @click="agreement()">
                        《<span class="yntext-right"></span>平台服务协议》</span>
                </div>
                <div class="yncomfirm-button" @click="comfirm()">
                </div>

            </div>
        </div>
        <div class="copyright">
            <div class="copytext">
                Copyright © 2017 熊猫贷款 All Rights Reserved
            </div>
             <div class="copytext">
                 闽ICP备17028012号-1 
            </div>
        </div>
        <!-- 提示框 -->
        <div class="yntoast-wrap">
            <span class="yntoast-msg"></span>
        </div>
    </div>
</template>

<script>
    import resources from "../../resources";
    export default {
        data() {
            return {
                iphone: false,
                download: false,
                picCode: false,
                is_show: false,
                is_click: false,
                codeButtonText: '获取验证码',
                show: true,
                count: '',
                timer: null,
                flagNum: 0,
                imageCode: '',
                Sid: '0',
                phone: '',
                smsCode: '',
                imaCode: '',
                keySMSCapt: '',
                keyImage:'',
                Uid: this.$route.params.Uid,
            };
        },
        methods: {
            toast(msg){ //提示框
                setTimeout(function(){
                    document.getElementsByClassName('yntoast-wrap')[0].getElementsByClassName('yntoast-msg')[0].innerHTML=msg;
                    var toastTag = document.getElementsByClassName('yntoast-wrap')[0];
                    toastTag.className = toastTag.className.replace('yntoastAnimate','');
                    setTimeout(function(){
                        toastTag.className = toastTag.className + ' yntoastAnimate';
                    }, 100);
                },500);
            },
            agreement(){ //跳转协议
                this.$router.push({ path: '/agreement' })
            },
            toProduct(){ //跳转产品列表页面
                this.$router.push({ path: '/ConciseproductList' })
            },
            getCode(){
                //倒计时的时候不能点按钮
                if (this.is_show) {return;}
                //如果输入的手机号不符合格式直接返回，不走下面的逻辑
                if (!(/^1\d{10}$/.test(this.phone))){this.toast('手机号格式不符');return ;}
                //获取验证码
                this.smsCaptcha();
                //倒计时开始
                this.is_show = true;
                this.is_click = true;
                this.codeButtonText = "S";
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                            this.count = '';
                            this.codeButtonText = '获取验证码';
                            this.is_show = false;
                        }
                    }, 1000)
                }
            },
            olduser(){ //老用户跳转函数
                let url = resources.token();
                var phoneValue = this.phone;
                var phonefirst = phoneValue.substr(0, 1);
                var phonelast = phoneValue.substr(-1);
                var smsCapts = phonefirst + '00' + phonelast;
                let params = {
                    'username': this.phone,
                    'keySMSCapt': this.keySMSCapt, //验证码判断
                    'smsCapt': smsCapts
                };
                var qs = require('qs');
                this.$ajax.post(url, qs.stringify(params), {
                    headers: {
                        'H5-Web-Name': 'Conciselogin',
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    sessionStorage.setItem("Uid",this.Uid)
                    sessionStorage.setItem("userId",res.data.obj1.id)
                    setTimeout( out=> {
                        this.toProduct()
                    },1500)
                }).catch(error => {
                    this.toast(error.response.data.statusMsg)
                });
            },
            smsCaptcha(){ //表单手机号正确时调用返回验证码
                let url = resources.smsCaptcha();
                let params = {
                    'phone': this.phone
                }
                var qs = require('qs');
                this.$ajax.post(url, qs.stringify(params),{
                    headers: {
                        'H5-Web-Name': 'Conciselogin',
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if(res.data.statusMsg=="已存在"){
                        this.toast('老用户特权，已进入快速审核通道')
                        this.olduser()   //老用户跳转调用
                    }
                    this.keySMSCapt = res.data.obj1.keySMSCapt;
                })
            },
            comfirm(){
                if (!this.is_click) {
                    return ;
                }
                if (this.phone == '') {
                    //this.lackMessage("手机号不能为空")
                    this.toast('手机号不能为空')
                    return ;
                } else if (this.smsCode == ''){
                    this.toast('短信验证码不能为空')
                    return ;
                }
                if (this.flagNum < 4) {
                    this.postMes();
                    this.flagNum ++;
                } else {
                    if (this.imaCode == '') {
                        this.toast('图片验证码不能为空')
                        return ;
                    }
                    this.postMes();
                }
            },
            postMes(){
                let url = resources.token();
                let params = { }
                if (this.keyImage != '') {
                    params = {
                        'username': this.phone,
                        'keySMSCapt': this.keySMSCapt,
                        'smsCapt': this.smsCode,
                        'keyImageCapt': this.keyImage,
                        'imageCapt': this.imaCode
                    }
                } else {
                    params = {
                        'username': this.phone,
                        'keySMSCapt': this.keySMSCapt,
                        'smsCapt': this.smsCode
                    }
                }
                var qs = require('qs');
                this.$ajax.post(url, qs.stringify(params), {
                    headers: {
                        'H5-Web-Name': 'Conciselogin',
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    this.toProduct()
                    sessionStorage.setItem("Uid",this.Uid)
                    sessionStorage.setItem("userId",res.data.obj1.id)
                }).catch(error => {
                    this.toast(error.response.data.statusMsg)
                    if (error.response.data.statusMsg === '短信验证码不正确') {
                        this.smsCode = '';
                    }
                    if (this.flagNum > 2) {
                        this.imaCode = '';
                        this.getImageCode()
                    }
                });
            },
            enterMes(){
                let url = resources.landingPage();
                var qs = require('qs');
                let params = { }
                this.$ajax.post(url,qs.stringify(params),{
                    headers: {
                        'H5-Web-Name': 'Conciselogin',
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    // console.log(res)
                })
            },
            getImageCode(){ //获取图片验证码
                let url = resources.imageCode();
                var qs = require('qs');
                let params = { };
                this.$ajax.post(url, qs.stringify(params), {
                    headers: {
                        'H5-Web-Name': 'Conciselogin',
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    responseType: 'arraybuffer'
                }).then(res => {
                    this.keyImage = res.headers.keyimagecapt
                    return 'data:image/jpeg;base64,' + btoa(
                    new Uint8Array(res.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                }).then(data => {
                    this.imageCode = data;
                    this.picCode = true;
                });
            },
            createSid(){  //生成用户操作唯一标识
                this.Sid = this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+(new Date()).valueOf().toString(16);
            },
            S4() {     //生成一个4位16进制字符串
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
            }
        },
        mounted() {
            this.createSid();
            this.enterMes();
        },
        created(){
            if(sessionStorage.getItem("userId")==null){
            }else{
                this.$router.push({ path: '/ConciseproductList' })
            }
        }
    };

</script>

<style lang="scss" scoped>
    // 底部下载样式
    $rem:1rem/40;
    $height:(682/1438)*100;

    .copyright{
        position: absolute;
        bottom: 0;
        width: 100%;
        height:85*$rem;
        .copytext{
            text-align: center;
            color:#fff;
            font-size:24*$rem;
            line-height: 1rem;
        }
    }

    // 底部下载
    .downzip{
        float: right;
        width: 165*$rem;
        height: 50*$rem;
        line-height: 50*$rem;
        margin-right: 42*$rem;
        text-align: center;
        vertical-align: middle;
        background:rgb(72,147,255);
        border-radius: 10*$rem;
        margin-top: 35*$rem;
    }
    .downzip span{
        padding: 5px;
        font-size: 32*$rem;
        color:#fff;
    }

    // 提示框样式
    .yntoast-wrap{
        opacity: 0;
        position: fixed;
        bottom: 50%;
        color: #fff;
        width: 100%;
        text-align: center;
    }
    .yntoast-msg{
        height: 1rem;
        background-color: #333333;
        //background-color: #7a260f;
        padding: 0.5rem 0.8rem;
        font-size: 0.8rem;
        letter-spacing: 1px;
        border-radius: 0.2rem;
        color: #fff
    }
    .yntoastAnimate{
        animation: toastKF 2s;
    }
    @keyframes toastKF{
        0% {opacity: 0;}
        25% {opacity: 1; z-index: 9999}
        50% {opacity: 1; z-index: 9999}
        75% {opacity: 1; z-index: 9999}
        100% {opacity: 0; z-index: 0}
    }

    // 背景图以及最大外部div
    .ynfirstpage{
        background: url(~@/assets/conciseloginBackgroungimg5.png) no-repeat scroll;
        background-size:100% 100%;
        height: 1438px;
        min-height:1438*$rem;
    }
    .ynlanding-panda{
        position: relative;
        .yntop{ //占位样式
            height:690*$rem;
        }
        .ynmiddle{
            padding-top:70*$rem; 
            height:auto;
            overflow: hidden;
            .ynallinput{
                //上面三行垂直居中
                text-align:center;
                // height: 3rem;
                .ynphone-input{
                    background: #FFFFFF;
                    height: 86*$rem;
                    width: 333*$rem;//1
                    margin-top: 34*$rem;
                    padding-left:30*$rem;
                    //border:1px solid #d3d3d6;
                    border-radius: 0.2rem;
                    font-size: 0.7rem;
                    line-height:86*$rem;
                    color:#f79f55;
                }
                .ynimage-code{
                    vertical-align:middle;//img图片和div在同一排
                    height: 86*$rem;
                    width: 190*$rem;//1
                    margin-left: 0.1rem;
                    margin-top: 34*$rem;
                    border-radius: 0.2rem;
                }
                .yncode-button{
                    background:rgb(255,216,64);
                    color: rgb(224,89,37);
                    font-size: 0.7rem;
                    height: 2.1rem;
                    width: 190*$rem;
                    margin-left: 0.05rem;
                    margin-top: 34*$rem;
                    //border:1px solid #d3d3d6;
                    border-radius: 0.2rem;
                }
                .yncantClick{
                    background: #d3d3d6;
                    padding-top: 0.2rem;
                }
                .yncode-input{
                    background: #FFFFFF;
                    height: 86*$rem;
                    width: 535*$rem;
                    padding-left:30*$rem;
                    border-radius: 0.2rem;
                    font-size: 0.7rem;
                    line-height: 86*$rem;
                    color:#f79f55;
                }
                .yncomfirm-button{
                    margin: 0 auto;
                    background: url(~@/assets/liji.png) no-repeat;
                    background-size:100% 100%;
                    margin-top:24*$rem;
                    height:100*$rem;
                    width: 460*$rem;
                }
                .yncanClick{
                    background: #ffbb2b;
                    border-bottom:0.1rem solid #b9121f;
                }
                .ynphone-input::-webkit-input-placeholder{
                    text-align: left;
                    color: #d3d3d6;
                    font-size: 0.7rem;
                    color:#f79f55;

                }
                .yncode-input::-webkit-input-placeholder{
                    text-align: left;
                    color: #d3d3d6;
                    font-size: 0.7rem;
                    color:#f79f55;
                }
                .yntext-hint{ //协议
                    margin: 0 auto;
                    width: 540*$rem;
                    height: auto;
                    overflow: hidden;
                    margin-top:24*$rem;
                    text-align: center;
                    padding-top: 0.1rem;
                    overflow: hidden;
                    .yntext-left{
                        color: #fff;
                        font-size: 22*$rem;
                    }
                    .yntext-right{
                        color: #ffb800;
                        font-size: 22*$rem;
                    }
                }
            }
        }
    }
</style>
