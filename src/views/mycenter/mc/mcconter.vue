<template>
    <div id="app">
    <!-- <h1>手机号：{{phone}}</h1>
    <h1>名字：{{name}}</h1>
    <h1>版本{{versionCode}}</h1>
    <h1>认证状态：{{isCertified}}</h1> -->
    <!-- 信息 -->
    <div class="profile-head">
        <div class="profile-img">
            <img src="~@/assets/profileimg.png" alt="">
            <div class="profile-author">
                {{isCertified|capitalize}}
                <!-- 1通过 -->
                <!-- 0未通过1 -->
            </div>
        </div>
        <div class="profile-phone">{{phone}}</div>
        <div class="profile-name">
            <div class="profile_namedata">{{name}}</div>
        </div>
    </div>
        <!-- 单个表格 -->
    <div class="profile-table">
        <div class="profile-tab" @click="goHelp">
            <div class="profile-icon">
                <img src="~@/assets/helpcentericonblack.png" alt="">
            </div>
            <div class="profileicon-text">
                帮助中心
            </div>
            <div class="profileicon-right">
                <img src="~@/assets/localtions.png" alt="">
            </div>
        </div>
    </div>
       <!-- 多个表格 -->
    <div class="profile-tables">
        <div class="profile-tabs">
            <div class="profile-icons">
                <img src="~@/assets/settingblack.png" alt="">
            </div>
            <div class="profile-tabmenu" @click="goSetting">
                <div class="profileicon-texs">
                    设置
                </div>
                <div class="profileicons-right">
                    <img src="~@/assets/localtions.png" alt="">
                </div>
            </div>
        </div>
        <div class="profile-tabs" @click="goabouts">
            <div class="profile-icons">
                <img src="~@/assets/aboutsiconblack.png" alt="">
            </div>
            <div class="profile-tabmenu" style="border:none;">
                <div class="profileicon-texs">
                    关于我们
                </div>
                <div class="profileicons-right">
                    <img src="~@/assets/localtions.png" alt="">
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
            phone:'',
            name:'',
            versionCode:'',
            isCertified:'',
        };
    },
    filters:{
        capitalize(value){
            if(value==1){
                return '已认证'
            }else{
                return '未认证'
            }
        }
    },
    methods: {
        getMycenterdata(){ //获取客户端传参
            this.phone = this.$route.query.phone //手机号码
            this.name = this.$route.query.name //名称
            this.versionCode = this.$route.query.versionCode //版本号
            this.isCertified = this.$route.query.isCertified //认证状态
        },
        goSetting(){
            window.location.href="http://www.pinganzhiyuan.com/panda_loan_mobile_web/setting"
        },
        goHelp(){
            window.location.href="http://www.pinganzhiyuan.com/panda_loan_mobile_web/mchelpCenter"
        },
        goabouts(){
            window.location.href="http://www.pinganzhiyuan.com/panda_loan_mobile_web/mcaboutus"
        }
    },
  mounted(){
    this.getMycenterdata()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
$rem:1rem/40; //rem配置   
#app{
    background: #f5f5f5;
}
// 个人信息
.profile-head{
    padding-bottom: 50*$rem;
    width: 100%;
    height:auto;
    background:#fff;
    overflow: hidden;
    .profile-title{
        width: 100%;
        height: 88*$rem;
        line-height: 88*$rem;
        text-align: center;
        font-size: 30*$rem;
        color:#fff;
        background:#222;
    }
    .profile-img{
        position: relative;
        width: 100%;
        height: 232*$rem;
        background: url("~@/assets/blackimg.png") no-repeat;
        background-size:100% 100%;
        text-align: center;
        img{
            position: relative;
            display: inline-block;
            margin-top: 150*$rem;
            border: 20px solid #fff;
            border-radius:100%; 
            width: 150*$rem;
        }
        .profile-author{
            position: absolute;
            left: 50%;
            top:238*$rem;
            width: auto;
            padding: 5*$rem;
            color:#222;
            text-align: center;
            background: #ffd768;
            border-radius: 5*$rem;
        }
    }
    .profile-phone{
        margin-top:75*$rem; 
        text-align: center;
        font-size: 32*$rem;
        color:#222;
        overflow: hidden;
    }
    .profile-name{
        margin-top: 15*$rem;
        width: 100%;
        height:auto;
        line-height: 40*$rem;
        text-align: center;
        .profile_namedata{
            padding: 5*$rem 0 ;
            font-size: 32*$rem;
            color:#222;
        }
        .isCertifiedstyle{
            margin-left:10*$rem;
            float: left;
            text-align: left;
            width:auto;
            padding: 0 5*$rem;
            border: 2.1*$rem solid #fff;
            border-radius:0.2rem; 
            font-size: 18*$rem;
            color:#fff;
        }
    }
}
// 表格
.profile-table{
    margin-top: 15*$rem;
    width: 100%;
    height: auto;
    background: #fff;
    overflow: hidden;
    .profile-tab{
        padding: 0 25*$rem;
        width: 100%;
        height: 105*$rem;
        background: #fff;
    }
    .profile-icon{
        float: left;
        width: 40*$rem;
        height: 105*$rem;
        line-height: 105*$rem;
        img{
            width: 100%;
            vertical-align: middle;
        }
    }
    .profileicon-text{
        margin-left: 20*$rem;
        float: left;
        width: 520*$rem;
        height: 105*$rem;
        line-height: 105*$rem;
        font-size: 28*$rem;
        color:#696969;
    }
    .profileicon-right{
        float: right;
        width: 20*$rem;
        height: 105*$rem;
        line-height: 105*$rem;
            img{
                width: 100%;
                vertical-align: middle;
            }
    }
}

// 设置、关于我们表格
.profile-tables{
    margin-top: 15*$rem;
    width: 100%;
    height: auto;
    background: #fff;
    overflow: hidden;
    .profile-tabs{
        padding-left:25*$rem;
        width: 100%;
        height: 105*$rem;
        background: #fff;
    }
    .profile-icons{
        float: left;
        width: 40*$rem;
        height: 105*$rem;
        line-height: 105*$rem;
        img{
            width: 100%;
            vertical-align: middle;
        }
    }
    .profile-tabmenu{ //菜单下载
        float: right;
        padding-right: 25*$rem;
        width: 665*$rem;
        height: 105*$rem;
        border-bottom: 2.1*$rem solid #d6d7dc;
        overflow: hidden;
        .profileicon-texs{
            float: left;
            width: 520*$rem;
            height: 105*$rem;
            line-height: 105*$rem;
            font-size: 28*$rem;
            color:#696969;
        }
        .profileicons-right{
            float: right;
            width: 20*$rem;
            height: 105*$rem;
            line-height: 105*$rem;
            img{
                width: 100%;
                vertical-align: middle;
            }
        }
    }
}
</style>