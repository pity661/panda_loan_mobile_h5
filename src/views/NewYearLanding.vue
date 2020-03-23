<template>
    <div class="ynlanding-panda ynfirstpage" v-bind:class="{ynsecondpage:download}">
        <img src="~@/assets/XMDKFLOAT.png" style="float:left;padding-left:1rem;padding-top:1rem;width:40%" v-if="iphone">
        <div class="yntop" v-if="!download"></div>
        <div class="ynmiddle" v-if="!download">
            <div class="ynallinput">
                <div style="padding-right:0.1rem;">
                    <input type="number" class="yncode-input" placeholder="请填写注册手机号" v-model="phone"/>
                </div>
                <div style="padding-right:0.1rem;">
                    <input type="number" class="ynphone-input" placeholder="请填写短信验证码" v-model="smsCode"/>
                    <input type="button" class="yncode-button" v-bind:class="{yncantClick:is_show}" :value="count+codeButtonText"  @click="getCode()"/>
                </div>
                
                <div v-if="picCode" style="padding-right:0.1rem;">
                    <input type="number" class="ynphone-input" placeholder="请填写验证码" v-model="imaCode"/>
                    <img :src="imageCode" alt="" class="ynimage-code" @click="getImageCode">
                </div>
                <div style="padding-right:0.1rem;">
                    <input type="button" class="yncomfirm-button" v-bind:class="{yncanClick:is_click}" value="立即借款" @click="comfirm()"/>
                </div>
                <div class="yntext-hint">
                    <span class="yntext-left">点击立即借款既表示同意</span><span class="yntext-right" @click="agreement()">
                        《<span v-if="!iphone" class="yntext-right">熊猫贷款</span><span v-if="iphone" class="yntext-right">熊猫贷款</span>平台服务协议》</span>
                </div>
            </div>
        </div>
        <div class="ynbuttom" v-if="!download"></div>
        <div class="yndownload-top" v-if="download"></div>
        <div class="yndownload-bottom" v-if="download">
            <div style="text-align:center">
                <img src="~@/assets/NYB.png" class="yndownload-button" @click="downloadApp()">
            </div>
        </div>
        <div class="yntwobuttom" v-if="download"></div>
        <div class="yncopyright">
            <div class="ynfooter">
                Copyright © 2017 <span v-if="!iphone" class="brand-text">熊猫贷款</span><span v-if="iphone" class="brand-text">熊猫贷款</span> All Rights Reserved
            </div>
        </div>
        <div class="yntoast-wrap">
            <span class="yntoast-msg"></span>
        </div>
    </div>
    
    
</template>

<script>
    import resources from "../resources";
    import qs from "qs"
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
                unclick: false,  //防止重复点击
                AndroidDownloadUrl: '', //安卓下载地址
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
            recordDownload(){ //下载记录
                let url = resources.recordDownload();
                let params = {
                    'userId':sessionStorage.getItem('userId'),
                    'downloadUrl':this.AndroidDownloadUrl
                }
                this.$ajax.post(url,qs.stringify(params),{
                    headers:{
                        'H5-Web-Name':'nylanding',
                        'Landing-Channel-Uid':this.Uid,
                        'Platform-Id':'0'
                    }
                }).then( res => {
                    this.unclick = true
                })
            },
            getDownloadUrl(){
                let url = resources.h5DownloadUrl();
                let params = {};
                this.$ajax.post(url,qs.stringify(params),{
                    headers:{
                        'H5-Web-Name': 'nylanding',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Version': '1',
                        'User-Id': '0',
                        'Channel-Id': '14',
                        'Device-Id': '111',
                        'Request-Uri': 'http://119.23.12.36:8081/graphql/query',
                        'Package-Name': this.Uid,
                        'Landing-Channel-Uid':this.Uid,
                        'Platform-Id': '0'
                    }
                }).then(res=>{
                    if(res.data == ''){

                    }
                    this.AndroidDownloadUrl = res.data.downloadUrl;
                })
            },
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
            downloadApp(){ //下载按钮
                var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf("iphone") == -1) {
                    //安卓跳转
                    if(this.unclick){
                        return;
                    }
                    this.recordDownload()
                    window.location.href = this.AndroidDownloadUrl;
                    this.countDown()
                } else {
                    //苹果跳转
                    window.location.href = "https://itunes.apple.com/cn/app/id1290678368?mt=8";
                }
            }, 
            agreement(){ //跳转按钮
                this.$router.push({ path: '/agreement' })
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
            
            smsCaptcha()
            {
                // 普通的ajax接口
                // 使用 application/x-www-form-urlencoded 格式化 
                // 参考：http://blog.csdn.net/fantian001/article/details/70193938         
                let url = resources.smsCaptcha();
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
                this.$ajax.post(url, qs.stringify(params), {
                    headers: {
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    this.download = true;
                    this.getDownloadUrl();
                    sessionStorage.setItem("userId",res.data.obj1.id);
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
                //let params = new URLSearchParams();
                var qs = require('qs');
                let params = { };
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
            },
            phoneType() {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf("iphone") == -1) {
                    //安卓
                    this.iphone = false;
                    document.title= "熊猫贷款";
                } else {
                    //苹果
                    this.iphone = true;
                    document.title = "熊猫贷款";
                }
            }
        },
        mounted: function () {
            //alert(this.Uid)
            this.phoneType();
            this.createSid();
            this.enterMes();
            //alert(this.Sid)
		}
    };
    
</script>

<style lang="scss">
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
        //color: #ffeeb9;
        //border:1px solid #ffeeb9; 
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
    .ynfirstpage{
        background: url(~@/assets/mnyf.jpg) no-repeat scroll; 
        background-size:100% 100%;
        height: 1400px;
        min-height: 32rem;
    }
    .ynsecondpage{
        background: url(~@/assets/mnys.jpg) no-repeat scroll; 
        background-size:100% 100%;
        height: 32rem;
    }
    .ynlanding-panda{
        position: absolute;
        width: 100%;
        top: 1px;
        bottom: 1px;
        .yndownload-top{
            height: 60%;
            //background: white;
            .yntop-pic{
                width: 100%;
                height: 100%;
            }
        }
        .yndownload-bottom{
            height: 12%;
            .yndownload-button{
                //background: #BE2E1B;
                //color: #FFFFFF;
                //font-size: 0.8rem;
                margin-top: 1.5rem;
                height: 3rem;
                width: 9.4rem;
            }
        }
        .yntwobuttom{
            margin-bottom: 1px;
            height: 23%;
        }

        .yntop{
            height: 60%;
            //background: white;
            .yntop-pic{
                width: 100%;
                height: 100%;
            }
        }
        
        .ynmiddle{
            height: 33%;
            //background: white;
            .yntwoinput{
                margin-top: 0rem;
            }
            .ynthreeinput{
                margin-top: 0.2rem;
            }
            .ynallinput{
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                //上面三行垂直居中
                text-align:center;
                // height: 3rem;
                .ynphone-input{
                    background: #FFFFFF;
                    height: 2.1rem;
                    width: 7.4rem;//1
                    margin-top: 0.2rem;
                    padding-top: 0.2rem;
                    padding-left: 1rem;
                    //border:1px solid #d3d3d6;
                    border-radius: 0.2rem;
                    font-size: 0.7rem;                    
                    line-height: 0.7rem;
                }
                .ynimage-code{
                    vertical-align:middle;//img图片和div在同一排
                    height: 2.1rem;
                    width: 3.9rem;
                    margin-left: 0.1rem; 
                    margin-top: 0.2rem;
                    //border:1px solid #d3d3d6;
                    border-radius: 0.2rem;
                }
                .yncode-button{
                    background: #b9121f;
                    color: #FFFFFF;
                    font-size: 0.7rem;
                    height: 2.1rem;
                    width: 3.9rem;
                    margin-left: 0.05rem; 
                    margin-top: 0.2rem;
                    //border:1px solid #d3d3d6;
                    border-radius: 0.2rem;
                }
                .yncantClick{
                    background: #d3d3d6;
                    padding-top: 0.2rem;
                }
                .yncode-input{
                    background: #FFFFFF;
                    height: 2.1rem;
                    width: 11.5rem;
                    margin-top: 0.2rem;
                    padding-top: 0.2rem;
                    padding-left: 1rem;
                    //border:1px solid #d3d3d6;
                    border-radius: 0.2rem;
                    font-size: 0.7rem;
                    line-height: 0.7rem;
                }
                .yncomfirm-button{
                    background: #d3d3d6;
                    color: #FFFFFF;
                    font-size: 0.8rem;
                    margin-top: 0.2rem;
                    height: 2rem;
                    width: 11.5rem;
                    border-radius: 1rem;
                    //border:1px solid #d3d3d6;
                    border-radius: 0.2rem;
                }
                .yncanClick{
                    background: #ffbb2b;
                    border-bottom:0.1rem solid #b9121f;
                }
                .ynphone-input::-webkit-input-placeholder{
                    text-align: left;
                    color: #d3d3d6;
                    font-size: 0.7rem;
                    
                }
                .yncode-input::-webkit-input-placeholder{
                    text-align: left;
                    color: #d3d3d6;
                    font-size: 0.7rem;
                }
                .yntext-hint{
                    //position: absolute;
                    // align-content: bottom;
                    // bottom: 0.4rem;
                    // position: absolute;
                    // margin-left: 14%;
                    margin-top: 1rem;
                    text-align: center;

                    .yntext-left{
                        color: #999999;
                        font-size: 0.4rem;
                    }
                    .yntext-right{
                        color: #00abf3;
                        font-size: 0.4rem;
                    }
                }

            }
            
            .yndownload{
                margin-top: 1.7rem;
                .yndown{
                    margin-left: 1.5rem;
                    background: #333333;
                    float: left;
                    width: 7.5rem;
                    height: 3rem;
                    border-radius: 0.2rem;
                    .ynpic{
                        text-align: center;
                        margin-top: 0.4rem;
                    }
                    .yndownload-text{
                        text-align: center;
                        color: #FFFFFF;
                        font-size: 0.7rem;
                        margin-top: 0.3rem;
                    }
                }
            }
        }
        
        .ynbuttom{
            margin-bottom: 1px;
            height: 2%;
        }
        .yncopyright{
            height: 5%;
            .ynfooter{
                position: relative;
                top: 60%;
                transform: translateY(-50%);
                //margin-top:-1rem;
                //height:0.5rem;
                text-align: center;
                color: #d9dadd;
                font-size: 0.5rem;
                .brand-text {   
                    color: #d9dadd;
                    font-size: 0.5rem;
                }
            }
        }
        
    }
</style>