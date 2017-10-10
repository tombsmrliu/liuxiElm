<template>

    <footer>
        <router-link v-bind:class="{active:isMsite}" to="/msite"><i class="fa fa-edge fa-2x"></i> <span>外卖</span></router-link>
        <router-link v-bind:class="{active:isDiscover}" to="/discover"><i class="fa fa-safari fa-2x"></i><span>发现</span></router-link>
        <router-link v-bind:class="{active:isOrder}" to="/order"><i class="fa fa-file-text-o fa-2x"></i><span>订单</span></router-link>
        <router-link v-bind:class="{active:isProfile}" to="/profile"><i class="fa fa-user-o fa-2x"></i><span>我的</span></router-link>
    </footer>
 
</template>


<script type="text/ecmascript-6">

       export default {
           name:'footer',

           data(){
               return{
                   isMsite:false,
                   isDiscover:false,
                   isOrder:false,
                   isProfile:false
               }
           },

           created(){

               this.isActive(this.$route.path);

           },

           methods:{
               isActive(path){
                   switch (path){
                       case '/msite':
                           this.isMsite = true;
                           break;
                       case '/discover':
                           this.isDiscover = true;
                           break;
                       case '/order':
                           this.isOrder = true;
                           break;
                       case '/profile':
                           this.isProfile = true;
                           break;
                   }
               }
           },



       }
</script>

<style lang="scss">

    @import "../scss/mixin";

    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
        width: 100%;
        background-color: #fff;
        height: pxToRem(100px);
        padding-top: pxToRem(9px);
        @include flex-content();


        a {
            width:pxToRem(189px);
            flex-wrap: wrap;
            flex: 1;
            text-align: center;

            &.active {
                color: #0089dc;
            }

            span{
                display: block;
            }


        }

    }



</style>