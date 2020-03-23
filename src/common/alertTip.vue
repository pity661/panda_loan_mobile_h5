 <template>
    <div class="alet_container">
	    <section class="tip_text_container">
            <p class="tip_text">{{alertText}}</p>
        </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                positionY: 0,
                timer: null,
            }
        },
        mounted(){
      
        },
        props: ['alertText'],
        methods: {
            closeTip(){
                this.$emit('closeTip')
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '../styles/mixin';
	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alet_container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
    }
    .tip_text_container{
        margin: 0 auto;
        margin-top: 120%;
        width: 9rem;
        animation: tipMove .4s ;
        background-color: rgba(0, 0, 0, 0.5);
        border: 1px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px;
        border-radius: 0.25rem;
        .tip_text{
            @include sc(.7rem, #333);
            line-height: 1.9rem;
            text-align: center;
            padding: 0 .4rem;
            color:#fff;
        }
    }
    
</style>