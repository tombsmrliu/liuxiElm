<template>

    <div id="rest">
        <!--商家列表开始-->
        <div class="rest-list" v-if="restaurants">

            <!--推荐商家项目开始-->
            <div class="rest-item" v-for="(rest,index) in restaurants" :key="rest.id">

                <router-link :to="{
                path:'/shop',
                query: {
                    rest_id:rest.id,
                }

            }">

                    <!--图片部分开始-->
                    <div class="rest-logo">
                        <img :src="imgUrl(rest.image_path,'130x130')" alt="">
                    </div>
                    <!--图片部分结束-->


                    <!--商家介绍开始-->
                    <div class="rest-introduce">

                        <!--商家基本信息开始-->
                        <div class="rest-info">

                            <!--商家名和服务开始-->
                            <div class="name-servive">
                                <h3 class="rest-name">{{rest.name}}</h3>

                                <div class="support">
                                    <span v-for="(item,index) in rest.supports"
                                          v-if="rest.supports">{{item.icon_name}}</span>
                                </div>
                            </div>
                            <!--商家名和服务结束-->


                            <!--评价与交易量开始-->
                            <div class="evaluation-amount">

                                <!--评价和交易量-->
                                <div class="evaluation">

                                    <star v-bind:rating="rest.rating"></star>

                                    <div class="amount">
                                        <span>{{rest.rating}}</span>

                                        <span>月售{{rest.recent_order_num}}单</span>
                                    </div>
                                </div>


                                <!--交付方式-->
                                <div class="delivery">

                            <span v-if="rest.delivery_mode" :style="{backgroundColor:'#'+rest.delivery_mode.color}">
                                {{rest.delivery_mode.text}}
                            </span>

                                </div>


                            </div>
                            <!--评价与交易量结束-->

                            <!--配送费与距离开始-->
                            <div class="cost-distance">
                                <div class="need-cost">
                                    <span>￥{{rest.float_minimum_order_amount}}起送</span>
                                    <span>{{rest.piecewise_agent_fee.tips}}</span>
                                </div>

                                <div class="distance">
                                    <span>{{getDistance(rest.distance)}}</span> |
                            <span>{{rest.order_lead_time}}分</span>
                                </div>
                            </div>
                            <!--配送费与距离结束-->


                            <!--虚分割线-->
                            <div class="slipt-line">

                            </div>


                            <div class="activities">
                                <!--活动子组件-->
                                <div class="items">

                                    <div class="items-show">

                                        <activity v-bind:activitie="item" v-for="(item,index) in rest.activities"
                                                  :key="item.id" v-if="index<2"></activity>

                                    </div>

                                    <div class="items-hidden">

                                        <activity v-bind:activitie="item" v-for="(item,index) in rest.activities"
                                                  :key="item.id" v-if="index>=2"></activity>

                                    </div>

                                </div>

                                <div class="show-num" v-if="rest.activities.length>2" id="activitesBtn"
                                     v-on:click.prevent="showHidden">
                                    <span>{{rest.activities.length}}个活动</span>
                                    <i class="fa fa-caret-down"></i>
                                </div>


                            </div>

                        </div>
                        <!--商家基本信息结束-->


                    </div>
                    <!--商家介绍结束-->

                </router-link>
            </div>
            <!--推荐商家项目结束-->

            <div class="load">
                <div class="tip">
                    <i class="fa fa-spinner fa-spin"></i>
                    <span>正在加载。。。</span>
                </div>
            </div>


        </div>
        <!--商家列表开始-->
    </div>

</template>

<script type="text/ecmascript-6">

    import{
        getRestaurants
    } from '@/data/getData';

    import {
        imgPath,
        getDistance
    }from '@/config/utils';

    import activity from '@/components/activity';
    import star from '@/components/star';

    export default{
        name: 'rest',

        components: {
            activity,
            star
        },

        data(){
            return {
                restaurants: [],
                offset: 0,
                isBottom: true,
                isShow: false,
            }
        },

        computed: {
            location: function () {
                return this.$store.state.location;
            }
        },

        watch:{
           location(){
               this.initData();
           }
        },


        mixins: [imgPath, getDistance],

        methods: {
            initData(){


                getRestaurants(this.location.latitude,
                    this.location.longitude, this.offeset).then(response => {

                    this.restaurants = response;

                }).catch(error => {
                    console.log(error);
                });
            },


            //window监听事件
            windowScroll(){

                let windowEle = document.documentElement;
                let scrollTop = windowEle.scrollTop;
                let scrollHeight = windowEle.scrollHeight;
                let clientHeight = windowEle.clientHeight;
                let offsetHeight = windowEle.offsetHeight;

                if (offsetHeight == scrollTop + clientHeight) {
                    console.log('到底部');

                    if (!this.isBottom) {
                        console.log('到达底部无法获取');
                        return;
                    }

                    this.isBottom = false;

                    this.offset += 20;

                    getRestaurants(this.location.latitude,
                        this.location.longitude, this.offeset).then(response => {

                        this.restaurants = this.restaurants.concat(response);
                        console.log(this.restaurants);

                        this.isBottom = true;

                    }).catch(error => {
                        console.log(error);
                    });


                }


            },

            //显示隐藏活动
            showHidden(event){

                var event = event || window.event;

                console.log(this.isShow);

                var hiddenDiv = event.currentTarget.previousElementSibling.querySelector('.items-hidden');
                var iEl = event.currentTarget.querySelector('i');

                console.log(hiddenDiv);

                if (!this.isShow){
                    hiddenDiv.style.display = 'block';
                    iEl.setAttribute('class', 'fa fa-caret-up');
                    this.isShow = !this.isShow;
                    console.log(this.isShow);
                }else {
                    hiddenDiv.style.display = 'none';
                    iEl.setAttribute('class', 'fa fa-caret-down');
                    this.isShow = !this.isShow;
                }
            }
        },

        created(){
            window.addEventListener('scroll', this.windowScroll, false);
        },

        mounted(){
        },

        beforeDestroy(){
            window.removeEventListener('scroll', this.windowScroll, false);
        },


    }

</script>

<style lang="scss">

    @import "../scss/mixin";

    #rest {

        .rest-list {
            width: 100%;
            padding-bottom: pxToRem(140px);


            .rest-item {
                width: 100%;
                height: 100%;
                border-bottom: pxToRem(1px) solid rgb(238, 238, 238);

                a {
                    @include flex-content(flex-start, flex-start);

                    .rest-logo {
                        height: 100%;
                        @include flex-content(center, flex-start);
                        @include property-of-rem('padding', 30px, 20px, 30px, 20px);

                        img {
                            width: pxToRem(130px);
                            height: pxToRem(130px);
                        }
                    }

                    .rest-introduce {
                        width: pxToRem(580px);
                        height: 80%;
                        @include property-of-rem('padding', 30px, 20px, 30px, 0px);

                        .rest-info {

                            /*商家名称和服务*/
                            .name-servive {
                                @include flex-content();

                                .support {
                                    display: inline-block;
                                    color: rgb(153, 153, 153);

                                    span {
                                        margin-left: pxToRem(5px);
                                        border: 1px solid rgb(211, 211, 211);
                                        width: pxToRem(26px);
                                        height: pxToRem(26px);

                                    }
                                }
                            }

                            /*评价与交易量*/
                            .evaluation-amount {
                                font-size: pxToRem(24px);
                                margin-top: pxToRem(15px);
                                @include flex-content();

                                .evaluation {

                                    .amount {
                                        margin-left: pxToRem(135px);
                                    }
                                }

                                .delivery {

                                    span {
                                        width: pxToRem(90px);
                                        height: pxToRem(26px);
                                        @include property-of-rem('padding', 0px, 4px);
                                        color: #fff;
                                    }
                                }
                            }

                            /*配送费和距离*/
                            .cost-distance {
                                font-size: pxToRem(24px);
                                margin-top: pxToRem(9px);
                                @include flex-content();
                            }

                            /*分割线*/
                            .slipt-line {
                                font-size: pxToRem(24px);
                                height: pxToRem(15px);
                                border-bottom: pxToRem(0.5px) dashed rgb(102, 102, 102);
                                margin-bottom: pxToRem(10px);

                            }

                            .activities {
                                font-size: pxToRem(24px);
                                position: relative;

                                .items {

                                    .items-hidden {
                                        display: none;

                                    }
                                }

                                .show-num {
                                    height: 100%;
                                    position: absolute;
                                    z-index: 999;
                                    right: 0;
                                    top: 0;
                                }

                            }

                        }

                    }
                }
            }

            .load {
                width: 100%;
                height: pxToRem(50px);
                background-color: #fff;
                /*display: none;*/
                @include flex-content(center);

                .tip {
                    height: pxToRem(20px);
                }

            }
        }
    }
</style>