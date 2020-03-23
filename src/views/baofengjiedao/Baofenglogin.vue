<template>
    <div class="ynlanding-panda">
        <img class="logo" src="~@/assets/baofenglogo.png" />
        <div class="yntop"></div> <!--占位div-->
        <div class="ynmiddle">  <!--表单-->
            <div class="ynallinput">
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
                <!-- 协议 -->
                <div class="bftext-hint"><span class="yntext-left">点击立即申请既表示同意</span><span class="yntext-right" @click="agreement()">
                    《<span class="yntext-right"></span>平台服务协议》</span>
                </div>
            </div>
        </div>
        <div class="copyright">
            <div class="copytext">
                内蒙古惠风金融信息科技有限公司 蒙ICP备17005582号
            </div>
             <div class="copytext">
                本服务由熊猫科技提供技术支持
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
                this.$router.push({ path: '/baofengproductList' })
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
            smsCaptcha(){
                let url = resources.smsCaptcha();
                let params = {
                    'phone': this.phone
                }
                var qs = require('qs');
                this.$ajax.post(url, qs.stringify(params),{
                    headers: {
                        'H5-Web-Name': 'baofenglogin',
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    this.keySMSCapt = res.data.obj1.keySMSCapt;
                })
            },
            comfirm(){ //立即申请调用
                if (!this.is_click) {
                    return ;
                }
                if (this.phone == '') {
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
                        'H5-Web-Name': 'baofenglogin',
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
                        'H5-Web-Name': 'baofenglogin',
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                })
            },
            getImageCode(){ //获取验证码
                let url = resources.imageCode();
                var qs = require('qs');
                let params = { };
                this.$ajax.post(url, qs.stringify(params), {
                    headers: {
                        'H5-Web-Name': 'baofenglogin',
                        'Landing-Channel-Uid': this.Uid,
                        'Sid': this.Sid,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    responseType: 'arraybuffer'
                }).then(res => {
                    console.log(res)
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
                this.$router.push({ path: '/baofengproductList' })
            }
        }
    };

</script>

<style lang="scss" scoped>
    // 底部下载样式
    $rem:1rem/40;
    $height:(682/1438)*100;
    // logo
    .logo{
       position:absolute;
       left:0px;
       top:0px;
       width:193*$rem;
       margin-left:24*$rem;
       margin-top:24*$rem;
    }
    .copyright{
        position: absolute;
        bottom: 8*$rem;
        width: 100%;
        height:85*$rem;
        .copytext{
            text-align: center;
            color:#fff;
            font-size:22*$rem;
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
    .ynlanding-panda{
        position: relative;
        background: url(~@/assets/baofengloginbackground.png) no-repeat scroll;
        background-size:100% 100%;
        height:1648*$rem;
        .yntop{ //占位样式
            height:760*$rem;
        }
        .ynmiddle{
            padding-top:50*$rem; 
            height:auto;
            overflow: hidden;
            .ynallinput{
                //上面三行垂直居中
                text-align:center;
                .baofenginput{ //手机号
                    margin:0 auto;
                    padding: 30*$rem 0rem;
                    width: 625*$rem;
                    height: 115*$rem;
                    line-height:115*$rem;
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
                            width:36*$rem;
                        }
                    }
                    input{
                        float: left;
                        width: 400*$rem;
                        height: 55*$rem;
                        line-height:55*$rem;
                        padding-left:30*$rem;
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
                    margin-top: 26*$rem;
                    width: 625*$rem;
                    height: 115*$rem;
                    line-height:115*$rem;
                    .piccodeinput{
                        float: left;
                        padding: 30*$rem 0rem;
                        width: 385*$rem;
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
                                width:36*$rem;
                            }
                        }
                        .piccodenput{
                            float: left;
                            width: 270*$rem;
                            height: 55*$rem;
                            line-height:55*$rem;
                            padding-left:30*$rem;
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
                        width: 215*$rem;
                        height: 115*$rem;
                        line-height:115*$rem;
                        border-radius: 0.2rem;
                    }
             
                }
                
                .ynmes{ //短信
                    margin:0 auto;
                    margin-top: 26*$rem;
                    width: 625*$rem;
                    height: 115*$rem;
                    line-height:115*$rem;
                    border-radius: 0.2rem;
                        .ynmes-input{
                            float: left;
                            padding-left:30*$rem;
                            width: 385*$rem;//1
                            height: 115*$rem;
                            line-height:115*$rem;
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
                            margin-left:24*$rem;
                            width: 215*$rem;
                            height: 115*$rem;
                            line-height:115*$rem;
                            font-size: 32*$rem;
                            color: black;
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
                    height:130*$rem;
                    width: 625*$rem;
                    background: url(~@/assets/baofengbutton.png) no-repeat;
                    background-size:100% 100%;
                }
                .bftext-hint{ //协议
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
