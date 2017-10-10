<template>

    <div id="star">

        <div class="bottom">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
        </div>

        <div class="top" :style="{width:ratingToWidth}">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">

    export default{
        name: 'star',

        props: ['rating'],

        computed: {
            ratingToWidth: function () {

                return (this.rating / 5) * 99+'%';
            }
        }
    }

</script>

<style lang="scss">

    @import "../scss/mixin";

    #star {
        position: relative;
        font-size: pxToRem(20px);
        width: pxToRem(116px);

        .bottom {
            width: pxToRem(116px);
            position: absolute;
            left: 0;
            top: 0;
            color: rgb(102, 102, 102);

        }

        .top {
            width: pxToRem(116px);
            position: absolute;
            white-space: nowrap;
            overflow-x: auto;
            left:0;
            top: 0;
            color: gold;
        }
    }

</style>