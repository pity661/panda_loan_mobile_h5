<template>
    <div class="loan-rate">
        <div class="top">
            <div class="top-title">采用央行2015年10月24日最新基准利率</div>
        </div>
        <div class="second-title">
            <div class="label"></div>
            <div class="right-word">贷款基准利率</div>
            <div class="separate-border"></div>
        </div>
        <div class="first-table">
            <table class="mytable">
                <tr>
                    <th>期限</th>
                    <th>年利率</th>
                </tr>
                <tr>
                    <td>1年以内(含1年)</td>
                    <td>4.35%</td>
                </tr>
                <tr>
                    <td>1年到5年(含5年)</td>
                    <td>4.75%</td>
                </tr>
                <tr>
                    <td>5年以上</td>
                    <td>4.90%</td>
                </tr>
            </table>
            <div class="mywords">
                以上为央行公布的贷款基准利率，房贷以此为基准上浮或下调。消费、经营贷款各银行利率差异很大，但是一般不会超过5年期利率的4倍。
            </div>
        </div>
        <div class="third-title">
            <div class="label"></div>
            <div class="right-word">公积金贷款基准利率</div>
            <div class="separate-border"></div>
        </div>

        <div class="first-table">
            <table class="mytable">
                <tr>
                    <th>期限</th>
                    <th>年利率</th>
                </tr>
                <tr>
                    <td>5年以内(含5年)</td>
                    <td>2.75%</td>
                </tr>
                <tr>
                    <td>5年以上</td>
                    <td>3.25%</td>
                </tr>
            </table>
            <div class="mywords">
                以上为央行公布的公积金贷款基准利率，公积金贷款只能用于房贷，各地会根据当地政策对利率进行上浮或下调。
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .loan-rate{
        background: #fff;
        position: absolute;
        width: 100%;
        top: 1px;
        bottom: 1px;
        .top{
            height: 12%;
            text-align: center;
            .top-title{
                font-weight: bold;
                color: #5497dd;
                position: relative;
                top: 50%;
                font-size: 0.7rem;
                transform: translateY(-50%);
            }
        }

        .second-title{
            .label{
                margin-left: 1rem;
                display: inline-block;
                background-color: black;
                height:0.6rem;
                width: 2%;
            }
            .right-word{
                display: inline-block;
                margin-left: 0.2rem;
                font-size: 0.6rem;
            }
            .separate-border{
                margin-left: 0.8rem;
                margin-top: 0.5rem;
                border:1px dashed #c5c5c5;
            }
        }

        .first-table{
            height: 25%;
            margin-top: 1rem;
            text-align: center;
            .mytable{
                width: 90%;
                text-align: center;
                margin:0 auto;
                th{
                    font-size: 0.5rem;
                    vertical-align:middle; text-align:center;
                    height:1.3rem;
                    width: 50%;
                    border:solid 1px #c5c5c5;
                }
                td{
                    font-size: 0.5rem;
                    vertical-align:middle; text-align:center;
                    height:1.3rem;
                    width: 50%;
                    border:solid 1px #c5c5c5;
                }
            }
            .mywords{
                font-size: 0.5rem;
                padding-top: 0.5rem;
                line-height: 1rem;
                text-align: left;
                width: 90%;
                margin: 0 auto;
                color: #969293;
            }
        }     

        .third-title{
            margin-top: 2rem;
            .label{
                margin-left: 1rem;
                display: inline-block;
                background-color: black;
                height:0.6rem;
                width: 2%;
            }
            .right-word{
                display: inline-block;
                margin-left: 0.2rem;
                font-size: 0.6rem;
            }
            .separate-border{
                margin-left: 1rem;
                margin-top: 0.5rem;
                border:1px dashed #c5c5c5;
            }
        }
    }
</style>