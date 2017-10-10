<template>

    <div id="settlement">
        <h2>结算页面</h2>
    </div>
 
</template>

<script type="text/ecmascript-6">


    import{
        getStoge,
        setStoge
    } from '@/config/localStorage';

    export default{
        name:'settlement',

        data(){

            return{
                rest_id:0
            }
        },


        beforeRouteEnter(to,from,next){
            let username = getStoge('username');
            if (username) {
               next({path:'/order'});
            }else {
               next('/login');
            }
        },

        mounted(){
        }


    }

</script>

<style>

</style>