<template>
    <div class="landing-panda firstpage" v-bind:class="{secondpage:download}">
        <img style="position:absolute;left:0px;top:0px;width:35%;margin-left:10px;margin-top:10px;" src="~@/assets/XMDKFLOAT.png" />
        <!-- <img src="~@/assets/xmdk.png" style="float:left;padding-left:1rem;padding-top:1rem;width:40%" v-if="iphone"> -->
        <div class="landing-top" v-if="!download">
            <!-- <img src="~@/assets/toppic.png" class="top-pic"> -->
        </div>
        <div class="middle" v-if="!download">
            <div class="allinput">
                <div>
                    <input type="number" class="phone-input" placeholder="请填写注册手机号" v-model="phone"/>
                    <input type="button" class="code-button" v-bind:class="{cantClick:is_show}" :value="count+codeButtonText"  @click="getCode()"/>
                </div>
                <div>
                    <input type="number" class="code-input" placeholder="请填写短信验证码" v-model="smsCode"/>
                </div>
                <div v-if="picCode">
                    <input type="number" class="phone-input" placeholder="请填写验证码" v-model="imaCode"/>
                    <img :src="imageCode" alt="" class="image-code" @click="getImageCode">
                </div>
                <div>
                    <input type="button" class="comfirm-button" v-bind:class="{canClick:is_click}" value="立即借款" @click="comfirm()"/>
                </div>
                <div class="text-hint" @click="agreement()" >
                    <span class="text-left">点击立即借款既表示同意</span><span class="text-right">《平台服务协议》</span>
                </div>
            </div>
           
            <!-- <div class="download" v-if="false">
                <div class="down">
                    <div class="pic"><img src="~@/assets/apple.png"></div>
                    <div class="download-text">去App Store下载</div>
                </div>
                <div class="down">
                    <div class="pic"><img src="~@/assets/google.png"></div>
                    <div class="download-text">去Google Play下载</div>
                </div>
            </div> -->
        </div>

        <div class="buttom" v-if="!download">

        </div>

        <div class="download-top" v-if="download">
            
        </div>
        <div class="download-bottom" v-if="download">
            <div style="text-align:center">
                <span class="register-suc">恭喜你注册成功</span>
            </div>
            <div style="text-align:center">
                <input type="button" class="download-button" value="立即下载熊猫贷款APP" @click="downloadApp()"/>
            </div>
        </div>

        <div class="twobuttom" v-if="download">

        </div>

        <div class="copyright">
            <div class="footer">
                Copyright © 2017 熊猫贷款 All Rights Reserved
            </div>
            <div class="footercopy">
               闽ICP备17028012号-1 
            </div>
        </div>

        <div class="toast-wrap">
            <span class="toast-msg"></span>
        </div>
    </div>
    
    
</template>

<script>
    import resources from "../../resources";

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
            };
        },
        methods: {
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
            downloadApp(){
                //下载    
                var ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=="micromessenger") { 
                    this.toast('请在手机浏览器中打开')
                    return;
                }
                if (ua.indexOf("iphone") == -1) {
                    //android
                    window.location.href = "http://download.pinganzhiyuan.com/pandaloan/1.0.2/app-jucai-release.apk";
                } else {
                    // ios
                    window.location.href = "  https://itunes.apple.com/cn/app/熊猫贷款/id1290678368?mt=8";
                }
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
            
            smsCaptcha()
            {
                // 普通的ajax接口
                // 使用 application/x-www-form-urlencoded 格式化 
                // 参考：http://blog.csdn.net/fantian001/article/details/70193938
                
                let url = resources.smsCaptcha();

                // let params = new URLSearchParams();
                // params.append('phone',this.phone)

                let params = {
                    'phone': this.phone
                }
                
                var qs = require('qs');
                this.$ajax.post(url, qs.stringify(params),{
                    headers: {
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    this.keySMSCapt = res.data.obj1.keySMSCapt;
                    console.log(res)
                })

                

                // let url = resources.smsCaptcha();
                // let myParams = {
				// 	phone: this.phone,
                // };
                // this.$ajax({
                //     method: 'post',
                //     url: url,
                //     params: myParams
                // }).then((res) => {
                //     this.keySMSCapt = res.data.obj1.keySMSCapt;
                //     console.log(res)
                // })
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
                // let params = new URLSearchParams();
                // params.append('username',this.phone)//用户名（手机号）
                // params.append('keySMSCapt',this.keySMSCapt)//短信验证码的key
                // params.append('smsCapt',this.smsCode)//短信验证码
                // if (this.keyImage != '') {
                //     params.append('keyImageCapt',this.keyImage)//图形验证码的key 
                //     params.append('imageCapt',this.imaCode)//图形验证码
                // }

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
                console.log(params)

                this.$ajax.post(url, qs.stringify(params), {
                    headers: {
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    console.log(res)
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
                    console.log(res)
                })
            },
            getImageCode(){
                // 普通的ajax接口
                // 使用 application/x-www-form-urlencoded 格式化 
                // 参考：http://blog.csdn.net/fantian001/article/details/70193938
                let url = resources.imageCode();
                //let params = new URLSearchParams();
                
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
                    // if (this.flagNum === 3) {
                    //     this.smsCode = ''
                    // }
                    console.log(res.headers.keyimagecapt)
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

<style lang="scss">
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
        //color: #ffeeb9;
        //border:1px solid #ffeeb9; 
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


    .firstpage{
        background: url(~@/assets/firstpage.1151c40.jpg) no-repeat scroll; 
        background-size:100% 100%;
        min-height: 32rem;
    }
    .secondpage{
        background: url(~@/assets/secondpage.jpg) no-repeat scroll; 
        background-size:100% 100%;
    }
    .landing-panda{
        position: absolute;
        width: 100%;
        top: 1px;
        bottom: 1px;
        .download-top{
            height: 38%;
            //background: white;
            .top-pic{
                width: 100%;
                height: 100%;
            }
        }
        .download-bottom{
            height: 31%;
            //background: white;
            //上面三行垂直居中
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
            height: 45%;
            //background: white;
            .top-pic{
                width: 100%;
                height: 100%;
            }
        }
        
        .middle{
            height: 37%;
            //background: white;
            .twoinput{
                margin-top: 0rem;
            }
            .threeinput{
                margin-top: 0.2rem;
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
                .text-hint{
                    //position: absolute;
                    // align-content: bottom;
                    // bottom: 0.4rem;
                    // position: absolute;
                    // margin-left: 14%;
                    margin-top: 0.3rem;
                    text-align: center;

                    .text-left{
                        color: #d3d3d6;
                        font-size: 0.6rem;
                    }
                    .text-right{
                        color: #00abf3;
                        font-size: 0.6rem;
                    }
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
        
        .buttom{
            height: 9.4%;
        }
        .copyright{
            height: 6%;
            .footer{
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                //margin-top:-1rem;
                //height:0.5rem;
                text-align: center;
                color: #d9dadd;
                font-size: 0.6rem;
            }
            .footercopy{
                position: relative;
                top: 70%;
                transform: translateY(-50%);
                //margin-top:-1rem;
                //height:0.5rem;
                text-align: center;
                color: #d9dadd;
                font-size: 0.6rem;
            }
        }
        
    }
</style>