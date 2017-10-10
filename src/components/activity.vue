<template>

    <div id="activity">
        <div class="item">
            <span class="flag" :style="{backgroundColor:'#'+activitie.icon_color}">{{activitie.icon_name}}</span>
            <span class="name">{{activitie.description}}</span>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">


    export default{
        name: 'activity',


        props: ['activitie'],


    }
</script>

<style lang="scss">

    @import "../scss/mixin";

    #activity {

         .item{
             height: pxToRem(36px);
             overflow: hidden;
             white-space: nowrap;
             text-overflow: ellipsis;

             .flag {
                 color: #fff;
             }

         }


    }

</style>