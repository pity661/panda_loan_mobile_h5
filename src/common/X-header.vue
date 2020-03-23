<template>
	<div>
		<div class="styleone" v-if="backSss"> <!--样式1-->
			<div class="back"  @click="goBack">
				<img src="../assets/backto.png" alt="" />
			</div>
			<h3>{{nameText}}</h3>
		</div>

		<div class="styletwo" v-if="backSs"> <!--样式2-->
			<div class="back" @click="goBack">
			<img src="../assets/headerBack.png" alt="" />
			</div>
			<h3>{{nameText}}</h3>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				mydemo: '公司全称',
				backSs:this.backtwo,
				backSss:this.backone
			}
		},
		props: ['nameText','backone','backtwo'],
		methods: {
			handleclick() { //提交公司名称函数
				alert("测试")
			},
			goBack(){
				this.$router.go(-1);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    $rem:1rem/40;

	// 样式1
	.styleone{
		width:100%;
		height: 88*$rem;
		line-height: 88*$rem;
		// background:#fff;	
		position:relative;
	}
	.styleone .back{
		width: auto;
		height:88*$rem;
		line-height: 88*$rem;
		position:absolute;
		left: 24*$rem;
	}
	.styleone .back img{
		width: 19*$rem;
		height: 36*$rem;
		vertical-align:middle;
	}
	.styleone h3{
		font-family: "微软雅黑";
		line-height: 88*$rem;
		font-size:32*$rem;
		color:#000;
		text-align: center;
	}

		// 样式2
	.styletwo{
		width:100%;
		height: 88*$rem;
		line-height: 88*$rem;
		// background:#fff;	
		position:relative;
	}
	.styletwo .back{
		width: auto;
		height:88*$rem;
		line-height: 88*$rem;
		position:absolute;
		left: 24*$rem;
	}
	.styletwo .back img{
		// width: 22*$rem;
		height: 36*$rem;
		vertical-align:middle;
	}
	.styletwo h3{
		font-family: "黑体,微软雅黑";
		line-height: 88*$rem;
		font-size:32*$rem;
		color:#fff;
		text-align: center;
	}
</style>