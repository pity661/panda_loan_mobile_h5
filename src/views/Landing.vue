<template>
    <div class="landing-panda firstpage" v-bind:class="{secondpage:download}">
        <!-- logo -->
        <img style="position:absolute;left:0px;top:0px;width:35%;margin-left:10px;margin-top:10px;" src="~@/assets/XMDKFLOAT.png" v-if="!download"/>
        <!-- 占位符 -->
        <div class="landing-top" v-if="!download">
        </div>
        <!-- 表单部分 -->
        <div class="middle" v-if="!download">
            <!-- 手机号 -->
            <div class="baofenginput"> 
                <div class="baofenginputimg">
                    <img src="~@/assets/baofengphone.png" alt="">
                </div>
                <input type="number" class="yncode-input" placeholder="请输入手机号码" v-model="phone"/>
            </div>
            <!-- 验证码 -->
            <div class="piccodestyle"  v-if="picCode" > 
                <div class="piccodeinput">
                    <div class="piccodestyleimg">
                        <img src="~@/assets/baofengpass.png" alt="">
                    </div>
                    <input type="number" class="piccodenput" placeholder="请填写验证码" v-model="imaCode"/>
                </div>
                <img :src="imageCode" alt="" class="piccodeimg" @click="getImageCode">
            </div>
            <!-- 短息验证 -->
            <div class="ynmes">
                <input type="number" class="ynmes-input" placeholder="请填写短信验证码" v-model="smsCode"/>
                <input type="button" class="ynmes-button" v-bind:class="{yncantClick:is_show}" :value="count+codeButtonText"  @click="getCode()"/>
            </div>
            <!-- 提交按钮 -->
            <div class="bfcomfirm-button" @click="comfirm()">
            </div>
            <div class="text-hint" @click="agreement()" >
                <span class="text-left">点击立即借款既表示同意</span><span class="text-right">《平台服务协议》</span>
            </div>
        </div>
        <!-- 下载部分 -->
        <div class="download-top" v-if="download">
        </div>
        <!-- 下载部分 -->
        <div class="download-bottom" v-if="download">
            <div style="text-align:center">
            </div>
            <div style="text-align:center">
                <img src="~@/assets/newSBB.png" style="width:78%;margin-top:8.5rem;" @click="downloadApp()"/>
            </div>
        </div>
        <div class="twobuttom" v-if="download">
        </div>
        <!-- 版权部分 -->
        <div class="copyright" :class="{setheight: download}">
            <div class="footer" :class="{clolorfont: download}">
                Copyright © 2017 熊猫贷款 All Rights Reserved
            </div>
            <div class="footercopy" :class="{clolorfont: download}">
                闽ICP备17028012号-1 
            </div>
        </div>
        <!-- 提示框 -->
        <div class="toast-wrap">
            <span class="toast-msg"></span>
        </div>
    </div>
</template>

<script>
    import resources from "../resources";
    import qs from 'qs'
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
                AndroidDownloadUrl: '',
                unclick: false,
                PlatformId:0 //请求downurl
            };
        },
        methods: {
            countDown(){ //防止重复点击
                var count = 5;
                var timer = setInterval(() => {
                    if (count > 0 ) {
                        count--;
                    } else {
                    this.unclick = false;
                    clearInterval(timer);
                    }
                }, 1000)
            },
            // 获取请求下载链接
            getApp(){
                var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf("iphone") == -1) {
                    // 安卓
                    this.PlatformId = 0
                    this.getDownloadUrl()
                } else {
                    // ios
                    this.PlatformId = 1
                    this.getDownloadUrl()
                }
            },
            recordDownload() { //下载记录
                let url = resources.recordDownload();
                let params = {
                    'userId': sessionStorage.getItem('userId'),
                    'downloadUrl': this.AndroidDownloadUrl
                }
                this.$ajax.post(url,qs.stringify(params),{
                    headers: {
                        'H5-Web-Name': 'landing',
                        'Landing-Channel-Uid': this.Uid,
                        'Platform-Id': this.PlatformId
                    }
                }).then( res => {
                    this.unclick = true
                })
            },
            getDownloadUrl() {
                let url = resources.h5DownloadUrl();
                let params = { };
                this.$ajax.post(url,qs.stringify(params),{
                    headers: {
                        'H5-Web-Name': 'landing',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Version': '1',
                        'User-Id': '0',
                        'Channel-Id': '14',
                        'Device-Id': '111',
                        'Request-Uri': 'http://119.23.12.36:8081/graphql/query',
                        'Package-Name': this.Uid,
                        'Landing-Channel-Uid': this.Uid,
                        'Platform-Id': this.PlatformId
                    }
                }).then( res =>{
                    this.AndroidDownloadUrl = res.data.downloadUrl;
                })
            },
            toast(msg){
                setTimeout(function(){
                    document.getElementsByClassName('toast-wrap')[0].getElementsByClassName('toast-msg')[0].innerHTML=msg;
                    var toastTag = document.getElementsByClassName('toast-wrap')[0];
                    toastTag.className = toastTag.className.replace('toastAnimate','');
                    setTimeout(function(){
                        toastTag.className = toastTag.className + ' toastAnimate';
                    }, 100);
                },500);
            },
            downloadApp(){ //点击下载
                if(this.unclick){
                    return;
                }
                this.recordDownload();
                window.location.href = this.AndroidDownloadUrl;
                this.countDown()
            },
            agreement(){
                this.$router.push({ path: '/agreement' })
            },
            getCode(){
                //倒计时的时候不能点按钮
                if (this.is_show) {
                    return;
                }
                //如果输入的手机号不符合格式直接返回，不走下面的逻辑
                if (!(/^1\d{10}$/.test(this.phone))){
                    this.toast('手机号格式不符')
                    //this.lackMessage('手机号格式不符')
                    return ;
                }
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
            olduser(){
                let url = resources.token();
                var phonefirst = this.phone.substr(0,1);
                var phonelast =  this.phone.substr(-1);
                var smsCapts = phonefirst + '00' + phonelast
                let params = {
                    'username': this.phone,
                    'keySMSCapt': this.keySMSCapt,
                    'smsCapt':smsCapts
                }
                var qs = require('qs');
                this.$ajax.post(url, qs.stringify(params), {
                    headers: {
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    setTimeout(out=>{
                        this.getApp();
                        sessionStorage.setItem("userId",res.data.obj1.id);
                        this.download = true;
                    },2000)
                  
                }).catch(error => {              

                });
            },
            smsCaptcha(){
                let url = resources.smsCaptcha();
                let params = {
                    'phone': this.phone,
                }
                var qs = require('qs');
                this.$ajax.post(url, qs.stringify(params),{
                    headers: {
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'H5-Web-Name':'landing'
                    }
                }).then(res => {
                    if(res.data.statusMsg=="已存在"){
                        this.toast('老用户无需登录，带您进入加速下载通道')
                        this.olduser()  
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
                    //this.lackMessage("短信验证码不能为空")
                    this.toast('短信验证码不能为空')
                    return ;
                }
                if (this.flagNum < 4) {
                    this.postMes();
                    this.flagNum ++;
                } else {
                    //  alert(this.flagNum + '错误验证码次数');
                    if (this.imaCode == '') {
                        //this.lackMessage("图片验证码不能为空")
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
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    this.getApp();
                    sessionStorage.setItem("userId",res.data.obj1.id);
                    this.download = true;
                }).catch(error => {              
                    //this.lackMessage(error.response.data.statusMsg)
                    this.toast(error.response.data.statusMsg)
                    if (error.response.data.statusMsg === '短信验证码不正确') {
                        this.smsCode = '';
                    }
                    if (this.flagNum > 2) {
                        this.imaCode = '';
                        this.getImageCode()
                        // if (!this.picCode) {   
                        //     this.getImageCode();
                        // }
                    }
                });
            },
            // lackMessage(mistakeMes){
            //     this.$notify({
            //         title: '警告',
            //         message: mistakeMes,
            //         type: 'warning'
            //         });
            // },
            enterMes(){
                let url = resources.landingPage();
                var qs = require('qs');
                let params = { }

                this.$ajax.post(url,qs.stringify(params),{
                    headers: {
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                })
            },
            getImageCode(){
                // 普通的ajax接口
                // 使用 application/x-www-form-urlencoded 格式化 
                // 参考：http://blog.csdn.net/fantian001/article/details/70193938
                let url = resources.imageCode();
                var qs = require('qs');
                let params = { }

                this.$ajax.post(url, qs.stringify(params), {
                    headers: {
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
            //生成用户操作唯一标识
            createSid(){
                this.Sid = this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+(new Date()).valueOf().toString(16);
            },
            //生成一个4位16进制字符串
            S4() {  
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
            }
        },
        mounted () {
            this.createSid();
            this.enterMes();
		}
    };
    
</script>

<style lang="scss" scoped>
$rem:1rem/40;
    // 提示框
    .toast-wrap{
        opacity: 0;
        position: fixed;
        bottom: 50%;
        color: #fff;
        width: 100%;
        text-align: center;
    }
    .toast-msg{
        height: 1rem;
        background-color: #333333;
        //background-color: #7a260f;
        padding: 0.5rem 0.8rem;
        font-size: 0.8rem;
        letter-spacing: 1px;
        border-radius: 0.2rem;
        color: #fff
    }
    .toastAnimate{
        animation: toastKF 2s;
    }
    @keyframes toastKF{
        0% {opacity: 0;}
        25% {opacity: 1; z-index: 9999}
        50% {opacity: 1; z-index: 9999}
        75% {opacity: 1; z-index: 9999}
        100% {opacity: 0; z-index: 0}
    }


    // 最外层背景图片
    .firstpage{
        background: url(~@/assets/landingBackgroundImg.png) no-repeat scroll; 
        background-size:100% 100%;
        min-height: 1570*$rem;
    }
    // 下载背景图
    .secondpage{
        background: url(~@/assets/sbbb.png) no-repeat scroll; 
        background-size:100% 100%;
        min-height: 1334*$rem;
    }
    // 表单组件最外层
    .landing-panda{
        position: absolute;
        width: 100%;
        top: 1px;
        bottom: 1px;
        .download-top{
            height: 38%;
            .top-pic{
                width: 100%;
                height: 100%;
            }
        }
        .download-bottom{
            height: 31%;
            .register-suc{
                letter-spacing:0.2rem;//字间距
                display: inline-block;
                margin-top: 3rem;
                color: #BE2E1B;
                font-size: 1rem;
                font-weight: bold;//文字加粗
            }
            .download-button{
                background: #BE2E1B;
                color: #FFFFFF;
                font-size: 0.8rem;
                height: 2rem;
                width: 12rem;
                border-radius: 0.2rem;
                margin-top: 1.5rem;
            }
        }
        .twobuttom{
            margin-bottom: 1px;
            height: 25%;
        }
        .landing-top{
            height: 785*$rem;
            .top-pic{
                width: 100%;
                height: 100%;
            }
        }
        
        // 表单样式部分
        .middle{
            text-align: center;
            //手机号
            .baofenginput{ 
                margin:0 auto;
                padding: 20*$rem 0rem;
                width: 550*$rem;
                height: 90*$rem;
                line-height:90*$rem;
                background: #FFFFFF;
                border-radius: 0.2rem;
                .baofenginputimg{
                    float: left;
                    width: 95*$rem;
                    height: 55*$rem;
                    line-height:55*$rem;
                    border-right:2.1*$rem solid #cfcfcf; 
                    img{
                        vertical-align: middle;
                        width:33*$rem;
                    }
                }
                input{
                    float: left;
                    width: 400*$rem;
                    height: 55*$rem;
                    line-height:55*$rem;
                    padding-left:25*$rem;
                    font-size: 32*$rem;
                    color:rgb(148,148,148);
                }
                input::-webkit-input-placeholder{
                    text-align: left;
                    color: #d3d3d6;
                    font-size: 32*$rem;
                    color:rgb(148,148,148);
                }
            }
            .piccodestyle{ //验证码
                    margin:0 auto;
                    margin-top: 25*$rem;
                    width: 550*$rem;
                    height: 90*$rem;
                    line-height:90*$rem;
                    .piccodeinput{
                        float: left;
                        padding: 20*$rem 0rem;
                        width: 345*$rem;
                        height: auto;
                        background: #FFFFFF;
                        border-radius: 0.2rem;
                        overflow: hidden;
                        .piccodestyleimg{
                            float: left;
                            width: 95*$rem;
                            height: 55*$rem;
                            line-height:55*$rem;
                            border-right:2.1*$rem solid #cfcfcf; 
                            img{
                                vertical-align: middle;
                                width:33*$rem;
                            }
                        }
                        .piccodenput{
                            float: left;
                            width: 220*$rem;
                            height: 55*$rem;
                            line-height:55*$rem;
                            padding-left:25*$rem;
                            font-size: 32*$rem;
                            color:rgb(148,148,148);
                        }
                        .piccodenput::-webkit-input-placeholder{
                            text-align: left;
                            color: #d3d3d6;
                            font-size: 32*$rem;
                            color:rgb(148,148,148);
                        }
                    }
                    // 验证码图形
                    .piccodeimg{
                        float: right;
                        vertical-align:middle;//img图片和div在同一排
                        width: 195*$rem;
                        height: 90*$rem;
                        line-height:90*$rem;
                        border-radius: 0.2rem;
                    }
             
                }
                
                .ynmes{ //短信
                    margin:0 auto;
                    margin-top: 35*$rem;
                    width: 550*$rem;
                    height: 90*$rem;
                    line-height:90*$rem;
                    border-radius: 0.2rem;
                        .ynmes-input{
                            float: left;
                            padding-left:30*$rem;
                            width: 345*$rem;//1
                            height: 90*$rem;
                            line-height:90*$rem;
                            background: #FFFFFF;
                            border-radius: 0.2rem;
                            font-size: 32*$rem;
                            color:rgb(148,148,148);
                        }
                        .ynmes-input::-webkit-input-placeholder{
                            text-align: left;
                            color:rgb(148,148,148);
                            font-size: 32*$rem;
                            color:rgb(148,148,148);
                        }
                        .ynmes-button{
                            margin-left:10*$rem;
                            width: 195*$rem;
                            height: 90*$rem;
                            line-height:90*$rem;
                            font-size: 32*$rem;
                            color: #f2532f;
                            border-radius: 0.2rem;
                            background:rgb(255,216,64);
                        }
                        .yncantClick{
                            background: #d3d3d6;
                            color:#fff;
                        }
                }
                // 立即申请按钮样式
                .bfcomfirm-button{
                    margin: 0 auto;
                    margin-top:36*$rem;
                    height:95*$rem;
                    width: 550*$rem;
                    background: url(~@/assets/buttonBackground.png) no-repeat;
                    background-size:100% 100%;
                }
            .allinput{
                position: relative;
                top: 47%;
                transform: translateY(-50%);
                //上面三行垂直居中
                text-align:center;
                // height: 3rem;
                .phone-input{
                    background: #FFFFFF;
                    height: 2.2rem;
                    width: 9rem;//1
                    margin-top: 0.2rem;
                    padding-top: 0.2rem;
                    padding-left: 1rem;
                    border:1px solid #d3d3d6;
                    border-radius: 0.2rem;
                    font-size: 0.7rem;                    
                    line-height: 0.7rem;
                }
                .image-code{
                    vertical-align:middle;//img图片和div在同一排
                    height: 2.2rem;
                    width: 4rem;
                    margin-left: 0.3rem; 
                    margin-top: 0.2rem;
                    //border:1px solid #d3d3d6;
                    border-radius: 0.2rem;
                }
                .code-button{
                    background: #ff5808;
                    color: #FFFFFF;
                    font-size: 0.7rem;
                    height: 2.2rem;
                    width: 4rem;
                    margin-left: 0.3rem; 
                    margin-top: 0.2rem;
                    //border:1px solid #d3d3d6;
                    border-radius: 0.2rem;
                }
                .cantClick{
                    background: #d3d3d6;
                    padding-top: 0.2rem;
                }
                .code-input{
                    background: #FFFFFF;
                    height: 2.2rem;
                    width: 13.5rem;
                    margin-top: 0.2rem;
                    padding-top: 0.2rem;
                    padding-left: 1rem;
                    border:1px solid #d3d3d6;
                    border-radius: 0.2rem;
                    font-size: 0.7rem;
                    line-height: 0.7rem;
                }
                .comfirm-button{
                    background: #d3d3d6;
                    color: #FFFFFF;
                    font-size: 0.8rem;
                    height: 2rem;
                    width: 13.5rem;
                    border-radius: 1rem;
                    margin-top: 0.2rem;
                    //border:1px solid #d3d3d6;
                    border-radius: 0.2rem;
                }
                .canClick{
                    background: #ff5808; 
                }
                .phone-input::-webkit-input-placeholder{
                    text-align: left;
                    color: #d3d3d6;
                    font-size: 0.7rem;
                }
                .code-input::-webkit-input-placeholder{
                    text-align: left;
                    color: #d3d3d6;
                    font-size: 0.7rem;
                }
               
            }
            
            .download{
                margin-top: 1.7rem;
                .down{
                    margin-left: 1.5rem;
                    background: #333333;
                    float: left;
                    width: 7.5rem;
                    height: 3rem;
                    border-radius: 0.2rem;
                    .pic{
                        text-align: center;
                        margin-top: 0.4rem;
                    }
                    .download-text{
                        text-align: center;
                        color: #FFFFFF;
                        font-size: 0.7rem;
                        margin-top: 0.3rem;
                    }
                }
            }
        }
        // 版权样式
        .copyright{
            width: 100%;
            position: absolute;
            bottom: 8*$rem;
            text-align: center;
            line-height: 40*$rem;
            .footer{
                margin: 0 auto;
                width: 100%;
                height: auto;
                color: #fff;
                font-size: 0.6rem;
            }
            .footercopy{
                width: 100%;
                height: auto;
                text-align: center;
                color: #fff;
                font-size: 0.6rem;
            }
        }
        // 协议
        .text-hint{
            margin-top: 20*$rem;;
            text-align: center;
            .text-left{
                color: #d3d3d6;
                font-size: 0.6rem;
            }
            .text-right{
                color: #fff;
                font-size: 0.6rem;
            }
        }
        // 版权样式判断部分
        .setheight{
            height: 2%;
        }
        .clolorfont{
            color: #a4a4a4!important;
        }
    }
</style>