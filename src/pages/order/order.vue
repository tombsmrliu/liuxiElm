<template>

    <div id="order">
        <h3>订单完成</h3>




        <liuxi-footer></liuxi-footer>
    </div>
</template>

<script type="text/ecmascript-6">

    import liuxiFooter from '@/components/footer';

    export default{
        name:'order',
        components:{
            liuxiFooter,
        },

        computed:{

        },

        methods:{

        },

        beforeCreate(){
            console.log('order beforeCreate');
        },

        created(){
            console.log('order created');
        },
        beforeMount(){
            console.log('order beforeMount');
        },
        mounted(){
            console.log('order mounted');
        },



        beforeRouteEnter(to,from,next){
            console.log('order beforeEnter');
            console.log('to',to);
            next();
        },

        beforeRouteUpdate(to,from,next){
            console.log('order beforeRouteUpdate');
            console.log('to',to);
            console.log('from',from);
            console.log('this',this);
            next();
        },

        beforeRouteLeave(to,from,next){
            console.log('order beforeRouteLeave');
            console.log('to',to);
            console.log('from',from);
            console.log('this',this);
            next();
        },

        beforeUpdate(){
            console.log('order beforeUpdate');
        },
        updated(){
            console.log('order updated');
        },
        activated(){
            console.log('order activated');
        },
        deactivated(){
            console.log('order deactvated');
        },
        beforeDestroy(){
            console.log('order beforeDestory');
        },
        destroyed(){
            console.log('order destroy');
        }
    }
</script>

<style>

</style>