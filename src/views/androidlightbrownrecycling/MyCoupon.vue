<template>
	<div id="app">
        <div class="myCouponexternal">
            <div class="titleName">
              使用规则
            </div>
            <div class="titleNameson">
                <div class="titleCircular">●</div> 加价券仅能使用一次，逾期时不可使用。
            </div>
            <div class="titleNameson">
                <div class="titleCircular">●</div> 加价券仅可用于一台手机。
            </div>
            <div class="titleNameson">
                <div class="titleCircular">●</div> 加价券仅限有效期内使用，过期无效。
            </div>
            <div class="titleNameson" style="border:none">
                <div class="titleCircular">●</div> 加价券一经使用，立即失效。
            </div>
        </div>
	</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
$rem: 1rem/40; //rem配置

#app {
  //页面颜色
  background: #f5f5f5;
}

.myCouponexternal{
    width: auto;
    height: auto;
    background: #fff;
}
.titleName {
  width: 100%;
  height: 80*$rem;
  line-height: 80*$rem;
  font-size: 26*$rem;
  color: #c9aa71;
  border-bottom: 1px solid #d6d7dc;
  padding-left: 24*$rem;
  overflow: hidden;
}

.titleCircular {
  margin-right: 12*$rem;
  vertical-align: middle;
  margin-top: .1*$rem;
  font-size: 10*$rem;
  display: inline;
  color: #c9aa71;
}
.titleNameson {
  width: 100%;
  height: 80*$rem;
  line-height: 80*$rem;
  font-size: 26*$rem;
  color: #111;
  border-bottom: 2.1*$rem solid #d6d7dc;
  margin-left: 24*$rem;
  overflow: hidden;
}
</style>