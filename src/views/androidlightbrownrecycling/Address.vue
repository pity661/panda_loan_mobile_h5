<template>
    <div class="myReceivingaddress">
        <div class="noaddress" v-if="noaddress">
            <img src="~@/assets/noaddress.png" alt="">
            <div class="noaddressbutton"  @click="setAddress">添加收货地址</div>
        </div>
        <div class="myaddress" v-for="(item,index) in haveBeensavedArrar" :key="index">
            <div class="haveBeensaved" >
                <div class="addressName">
                    <span class="addressnameone">{{item.name}}</span>
                    <span  class="addressphone">{{item.phone}}</span>
                </div>
                <div class="localtiondata">
                    <span>{{item.detailedAddress}}</span>
                </div>
            </div>
            <div class="delImg" >
                <div class="del" @click="delAddress(index)">
                    <img src="~@/assets/814288334974768703_03.png" alt="" class="delimgs">
                    <span>删除</span>
                </div>
            </div>
        </div>
        <div class="setAddress" @click="setAddress" v-if="newsetAddress">
           新建地址
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                haveBeensavedArrar:[],
                noaddress:false,
                newsetAddress:true,
            };
        },
        methods: {
            setAddress(){
                //跳转到添加页面
                this.$router.push({path: '/androidBrownSetaddress'});
            },
            delAddress(index){
                this.haveBeensavedArrar.splice(index,1);
                localStorage.setItem('addressData',JSON.stringify(this.haveBeensavedArrar))
               if(this.haveBeensavedArrar.length==0){
                    this.noaddress = true
                    this.newsetAddress= false;
                }
            },
            watchCount(){
                if(localStorage.getItem('addressData')==null){
                     this.noaddress = true
                    this.newsetAddress= false;
                }else{
                    var str = localStorage.getItem('addressData')
                    this.haveBeensavedArrar = JSON.parse(str)
                    if(this.haveBeensavedArrar.length==0){
                        this.noaddress = true
                        this.newsetAddress= false;
                    }
                }
            }
        },
        mounted() {

        },
        created(){
            this.watchCount()
        }
    };

</script>

<style lang="scss" scoped>
    // 底部下载样式
    $rem:1rem/40;
    .myReceivingaddress{ //背景
        width: 100%;
        height:100%;
        background: #f5f5f5;
        // overflow: hidden;
    }

    .noaddress{
        padding-top: 445*$rem;
        text-align: center;
        img{
            width: 300*$rem;
        }
        overflow: hidden;
    }
    .noaddressbutton{
        margin: 0 auto;
        margin-top: 50*$rem;
        width: 250*$rem;
        height: 88*$rem;
        line-height: 88*$rem;
        color: #fff;
        text-align: center;
        background: #c9aa71;
        border-radius: 5px;
        font-size: 30*$rem;
    }
   
    .setAddress{  // 添加地址按钮
        margin: 0 auto;
        margin-top: 26*$rem;
        width: 700*$rem;
        height: 100*$rem;
        line-height: 100*$rem;
        color: #fff;
        text-align: center;
        background: #c9aa71;
        border-radius: 5px;
        font-size: 30*$rem;
    }
    .myaddress{ //循环最外层
        width: auto;
        height: auto;
        margin-bottom: 15*$rem;
        background: #fff;
        overflow: hidden;
    }
    .haveBeensaved{ //手机号地址信息
        border-bottom: 2*$rem solid #d6d7dc;
        padding: 25*$rem;
        .addressName{
            width: auto;
            height: auto;
            overflow: hidden;
        }
        .addressnameone{
            float: left;
            width: auto;
            height: 28*$rem;
            line-height:32*$rem;
            font-size: 28*$rem;
            color: #666;
         
            overflow: hidden;
        }
        .addressphone{
            float: right;
            width: auto;
            height: 28*$rem;
            line-height:32*$rem;
            font-size: 28*$rem;
            color: #666;
            overflow: hidden;
        }
        .localtiondata{
            margin-top: 25*$rem;
            font-size: 28*$rem;
            line-height: 32*$rem;
            width: 600*$rem;
            overflow: hidden;
            text-overflow: ellipsis; //3.设置超出样式为省略号
            -webkit-line-clamp: 1;   //4.设置2行应用省略
            -webkit-box-orient: vertical;
            span{
                color: #999;
            }
        }
    }
    .delImg{
        width: 100%;
        height: 80*$rem;
        line-height: 80*$rem;
        padding: 0rem 25*$rem ;
        img{
            margin-top: -6*$rem;
            width: 28*$rem;
            height:28*$rem;
            vertical-align: middle;
            
        }
        span{
            height: 80*$rem;
            line-height: 80*$rem;
            font-size: 21*$rem;
            color: #fd4e33;
        }
        .del{
            width: auto;
            height: 80*$rem;
            line-height: 81*$rem;
            float: right;
            overflow: hidden;
            img{
                vertical-align: middle;
            }
            span{
                color: #999;
            }
        }
    }


</style>
