<!--  微页面  -->
<template>
	<div class="wechat-page">

			<img class="logo" alt="logo" id="logo"/>
			<el-input class="input" v-model="loginForm.phone" placeholder="请输入手机号" size="small"></el-input> 
			
			<el-input class="input captcha" v-model="loginForm.imgCaptcha" placeholder="请输入图形验证码" size="small" @blur="checkCaptchaInput"></el-input>
			<img class="captcha-img" v-bind:src="loginForm.captchImg" alt="点击刷新验证码" id="captchaImg" @click="getCaptcha"/>
			 
			<el-input class="input sms" v-model="loginForm.smsCaptcha" placeholder="请输入短信验证码" size="small"></el-input>
 			<el-button class="captcha-sms-button" >获取验证码</el-button>

			<el-button class="login-button" @click="login()">登录</el-button>

			<div class="agreement"><span>点击登录表示同意《熊猫元宝平台服务协议》</span></div>
			<div class="footer"><span>Copyright 2017 熊猫元宝 All Rights Reserved</span></div>
			<!-- <label>学号</label>
			<input size="large" type="text" v-model="loginForm.studentNo" placeholder="请输入您的学号">

			<label>姓名</label>
			<input size="large" type="text" v-model="loginForm.name" placeholder="请输入您的姓名">
			<p v-if="verifyError" class="error-msg">该账号不存在，请联系客服 </p> -->
		
		<!-- <button @click="step == 1 ? next() : submit()" v-bind:disabled="isLoading">{{step == 1 ? '下一步' : '提交'}}</button> -->
	</div>
</template>

<script>
	import resources from '../resources'
	import md5 from 'js-md5'
	import { Loading, Message } from 'element-ui'

	const universitiesQuery = `
	{
		universities {
			id
			name
		}
	}`;

	const studentQuery = `
	query(
		$universityId: Long
		$studentNo: String
		$name: String
	){
		student(
			universityId: $universityId,
			studentNo: $studentNo
			name: $name
		){
			name
			id
			userId
		}
	}`

	export default {
		data() {
			return {
				step: 1,
				openid: '',
				isLoading: false,
				universities: [],
				loginForm: {
					// 测试账号: 15210231110 name: 林金鸿
					universityId: 1,
					studentNo: '',
					name: '',
					password: '',
					rePassword: '',
					phone: '',
					imgCaptcha: '',
					smsCaptcha: '',
					captchImg: '' //验证码图片
				},
				userId: '',
				verifyError: false, // 学号与姓名验证结果
				passError: false,
				passErrorMsg: ''
			}
		},
		watch: {
			'loginForm': {
				handler: function (val, oldval) {
					this.isLoading = false;
					this.verifyError = false;
					this.passError = false;
				},
				deep: true //对象内部的属性监听，也叫深度监听  
			}
		},
		methods: {
			// getUniversities() {
			// 	this.$ajax.post(`${resources.graphQlApi}`, {
			// 		'query': `${universitiesQuery}`
			// 	})
			// 		.then(res => {
			// 			this.universities = res.data.data.universities;
			// 		});
			// },
			// next() {
			// 	let _this = this;

			// 	if (!this.loginForm.name || !this.loginForm.universityId || !this.loginForm.studentNo) {
			// 		Message.error({
			// 			message: '学校／学号／姓名不能为空'
			// 		})
			// 		return;
			// 	}

			// 	let params = {
			// 		universityId: this.loginForm.universityId,
			// 		studentNo: this.loginForm.studentNo.trim(),
			// 		name: this.loginForm.name.trim()
			// 	}
			// 	_this.isLoading = true;
			// 	this.$ajax.post(`${resources.graphQlApi}`, {
			// 		'query': `${studentQuery}`,
			// 		variables: params
			// 	})
			// 		.then(res => {
			// 			if (res.data.data.student) {
			// 				try {
			// 					_this.userId = res.data.data.student.userId;
			// 					// 调用一次user更新接口，更新userid
			// 					let updateUrl = resources.users(_this.userId);
			// 					this.$ajax({
			// 						method: 'post',
			// 						url: updateUrl,
			// 						timeout: 10000,
			// 						params: {
			// 							'openid': _this.openid
			// 						}//this is important !
			// 					}).then((res) => {
			// 						console.log('成功更新openid')
			// 						Message.success({
			// 							message: '学籍信息验证成功！'
			// 						})
			// 						_this.step++;
			// 						_this.isLoading = false;
			// 					})
			// 				} catch (e) {
			// 					alert(e)
			// 				}
			// 			} else {
			// 				_this.verifyError = true;
			// 			}
			// 		});
			// },
			// submit() {
			// 	let _this = this;
			// 	let reg = /^[0-9a-zA-Z]+$/;
			// 	if (this.loginForm.password !== this.loginForm.rePassword) {
			// 		_this.passError = true;
			// 		_this.passErrorMsg = '两次密码输入不一致，请重新输入';
			// 		return
			// 	}

			// 	if (this.loginForm.password.length < 6 || this.loginForm.password.length > 12 || !reg.test(this.loginForm.password)) {
			// 		_this.passError = true;
			// 		_this.passErrorMsg = '请输入6~12位，包含英文或者数字的密码';
			// 		return;
			// 	}

			// 	_this.passError = false;
			// 	let url = resources.users(this.userId);
			// 	this.$ajax({
			// 		method: 'post',
			// 		url: url,
			// 		timeout: 10000,
			// 		params: {
			// 			'studentNo': this.loginForm.studentNo,
			// 			'password': md5(this.loginForm.password),
			// 			'openid': this.openid
			// 		}//this is important !
			// 	}).then((res) => {
			// 		Message.success({
			// 			message: '成功更新密码！'
			// 		});
			// 		window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.guangyangyundong.sport';
			// 	})

			// },
			getCaptcha() {
				this.loginForm.captchImg = resources.host + "/captcha?" + Math.random();				
			},
			checkCaptchaInput() {  
				console.log('开始验证~'); 
				var captchaText = this.loginForm.imgCaptcha;
				// if(captchaText.length <=3 ){ //验证码一般大于三位  
				// 	$("#captchaChecked").hide();  
				// 	return;  
				// }  
				var url = resources.host + '/verifyCaptcha';
				var ckey = this.getCookie("Cookie");
				var params = {
					captcha : captchaText,
					key: ckey
				}
				
				
				$.post(url, params).success(function(res) {
					console.log(res);
					// if (res) {
					// 	$(this).attr('disabled', 'disabled');
					// 	$("#captchaChecked").show();
					// } else {
					// 	$("#captchaChecked").hide();
					// }
				})
				if(event.keyCode==13){  
					ctrl.login();
				}  
			}, 
			getCookie(objname) {//获取指定名称的cookie的值
				var arrstr = document.cookie.split("; ");
				for(var i = 0;i < arrstr.length;i ++){
				var temp = arrstr[i].split("=");
				if(temp[0] == objname) return unescape(temp[1]);
				}
			},
			login() {
				console.log('开始登录~'); 
				// var originPas = $('#password').val();
				var salt = Math.ceil(Math.random()*10);
				var ckey = this.getCookie("Cookie");
				var params = {
					username: this.loginForm.phone,
					password: md5((md5(originPas + "").toString() + salt.toString())),
					salt: salt,
					expiredHour: 168,
					key: ckey
				}
				console.log("phone: "  +this.loginForm.phone );
				console.log("originPas: "  + originPas );
				var url = resources.host + '/tokens';
				$.post(url, params)
				.success(function(res) {
					if (!res) {
						console.log('验证码错误~'); 
					} else {
						// document.cookie = "user_id=" + res.obj1.id;
						// document.cookie = "user_type=" + res.obj1.userType;
						// document.cookie = "xmheart_token=" + res.obj2;
						var url = 'http://' + window.location.host + '/'
						window.location.replace(url);
					}
				})
				.error(function() {
					console.log('账号或密码错误，登录失败~'); 
				})
        	},
			
		},
		mounted: function () {
			// this.getUniversities();
			this.getCaptcha();
			
			// this.openid = getQueryString('openid') || getCookie('openid');
			// // 获取url参数
			// function getQueryString(name) {
			// 	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			// 	var r = window.location.search.substr(1).match(reg);
			// 	if (r != null) return unescape(r[2]);
			// 	return null;
			// }

			// // 获取cookies
			// function getCookie(name) {
			// 	var arr = document.cookie.split('; ');
			// 	var i = 0;
			// 	for (i = 0; i < arr.length; i++) {
			// 		var arr2 = arr[i].split('=');
			// 		if (arr2[0] == name) {
			// 			var getC = decodeURIComponent(arr2[1]);
			// 			return getC;
			// 		}
			// 	}
			// 	return '';
			// }
		}
	}

</script>

<style lang="scss" scoped>
	.wechat-page {
		color: #AAAAAA;
		background: #fff;
		height: 100%;
		width: 100%;
		position: relative; 
		.page-1,
		.page-3 {
			padding: 10px;
		}
		.page-2 {
			text-align: center;
			padding: 0;
			padding-top: 60px;
		}
		label {
			display: block;
			margin: 10px 0;
			font-size: 16px;
		}
		select {
			width: 90%;
			color: #AAAAAA;
			border: none;
			border-radius: 0;
			border-bottom: 1px solid #AAAAAA;
			outline: none;
			background: transparent;
			margin: 5px;
		}

		input {
			color: #AAAAAA;
			background: transparent;
			border: none;
			border-bottom: 1px solid #AAAAAA;
			width: 90%;
			outline: none;
			margin: 5px;
		}

		button {
			width: 95%;
			height: 35px;
			background: #AAAAAA;
			border: 1px solid #AAAAAA;
			border-radius: 12px;
			outline: none;
			margin: 0 auto;
			margin-top: 10px;
			display: block;
		}

		::-webkit-input-placeholder {
			/* WebKit browsers */
			color: #AAAAAA;
		}

		:-moz-placeholder {
			/* Mozilla Firefox 4 to 18 */
			color: #AAAAAA;
		}

		::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			color: #AAAAAA;
		}

		:-ms-input-placeholder {
			/* Internet Explorer 10+ */
			color: #AAAAAA;
		}
		.el-form-item__content {
			width: 90%;
		}
		.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
		.avatar-uploader .el-upload:hover {
			border-color: #20a0ff;
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #AAAAAA;
			width: 178px;
			height: 178px;
			line-height: 178px;
			text-align: center;
			border: 3px solid #AAAAAA;
			border-radius: 50%;
		}
		.avatar {
			width: 178px;
			height: 178px;
			display: block;
		}
		.error-msg {
			font-size: 12px;
			color: #59f4df;
			margin: 5px;
		}
		.logo {
			margin-left: 40%;
			margin-top: 40%;
		}
		.captcha-img {
			width: 25%;
			background-color: #fff;
			background-image: none;
			border-radius: 4px;
			border: 1px solid #bfcbd9;
			padding: 1px;
			margin-top: 10px;
			transition: border-color .2s cubic-bezier(.645,.045,.355,1);
		}
		.captcha-sms-button {
			height: 30px;
			width: 25%;
			background-color: #AAAAAA;
			color: #fff;
			border-radius: 4px;
			border: 1px solid #bfcbd9;
			padding: 1px;
			margin-top: 5%;
			margin-right: 10%;
			transition: border-color .2s cubic-bezier(.645,.045,.355,1);
			float: right;
		}
		.input {
			// left: 50px;
			// top: 50px;
			margin-left: 10%;
			margin-right: 10%;
			width: 80%;
			margin-top: 5%;
		}
		
		.captcha {
			width: 50%;
			margin-right: 0%;
		}
		.sms {
			width: 50%;
			margin-right: 0%;
			
		}
		.login-button {
			height: 30px;
			width: 70%;
			background-color: #AAAAAA;
			color: #fff;
			border-radius: 4px;
			border: 1px solid #bfcbd9;
			padding: 1px;
			margin-top: 30px;
			transition: border-color .2s cubic-bezier(.645,.045,.355,1);
		}
		.footer {
			position: absolute; 
			bottom: 5%;
			margin-left: 15%;
		}
		.agreement {
			margin-top: 5%;
			margin-left: 15%;
		}
		
	}
</style>