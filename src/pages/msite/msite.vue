<template>

    <div id="msite">

        <div class="wrap">


            <!--头部开始-->
            <div class="header">
            <!--地址天气部分开始-->
            <div class="location-weather">
                <div class="location">

                    <i class="fa fa-map-marker"></i>
                    <span>{{addressName}}</span>
                    <i class="fa fa-caret-down"></i>

                </div>

                <div class="weather" v-if="weather">
                    <div class="desc">
                        <h2>{{temperature}}°</h2>
                        <span>{{description}}</span>
                    </div>

                    <img :src="imgUrl(weather.image_hash,'69x69')" alt="">
                </div>
            </div>
            <!--地址天气部分结束-->
            </div>
            <!--头部结束-->



                <!--搜索部分开始-->
            <div class="search">
                <router-link to="" class="link">
                    <i class="fa fa-search"></i>
                    搜索商家，商品名称

                </router-link>
            </div>
            <!--搜索部分结束-->


            <!--热搜词汇部分开始-->
            <div class="word">
                <div class="key">
                    <router-link to="" v-for="(a,index) in hotsearchwords" :key="index">
                        {{a.word}}

                    </router-link>
                </div>

            </div>
            <!--热搜词汇部分结束-->


            <!--外卖分类部分开始-->
            <div class="entries">

                <!--分类栏目开始-->
                <div class="entry-items" v-if="entries"
                     @touchstart="start" @touchmove="move" @touchend="end">

                    <div class="items-page">
                        <router-link to="" v-for="(a,index) in entries" :key="a.id" v-if="index<8">
                            <img :src="imgUrl(a.image_hash,'90x90')" alt="">
                            <span>{{a.name}}</span>
                        </router-link>
                    </div>

                    <div class="items-page">
                        <router-link to="" v-for="(a,index) in entries" :key="a.id" v-if="index>=8">
                            <img :src="imgUrl(a.image_hash,'90x90')" alt="">
                            <span>{{a.name}}</span>
                        </router-link>
                    </div>

                </div>
                <!--分类栏目结束-->


            </div>

            <!--分类翻页开始-->
            <div class="page-wrap">
                <div class="wrap-btn">
                    <a href=""></a>
                    <a href=""></a>
                </div>
            </div>
            <!--分类翻页结束-->
            <!--外卖分类部分结束-->

            <div id="restaurant">

                <div class="title">
                    <h3>推荐商家</h3>
                </div>

                <rest></rest>

            </div>




        </div>



        <liuxi-footer></liuxi-footer>
    </div>
</template>

<script type="text/ecmascript-6">

    import {
        getPosition,
        getAddress,
        getWeather,
        getEntries,
        getHotSearchWords,
    } from '@/data/getData';


    import{
        imgPath,
    } from '@/config/utils';

    import{
        setStoge,
        getStoge,
    } from '@/config/localStorage';

    import rest from '@/components/restaurants';
    import liuxiFooter from '@/components/footer';




    export default{


        name: 'msite',


        data(){

            return {
                location:null,
                address: null,
                weather: null,
                entries: [],
                hotsearchwords: [],
                addressName: "地址出错了",
                temperature: '',
                description: '',
                oldClientX: '',
                newClientX: '',
                moveX: '',
                touchElement: null
            }
        },


        watch: {
            location: function (newValue, oldValue) {

                this.initData();

                //存入Vuex模块
                this.setLocation(newValue);

                setStoge('location', newValue);
            }
        },

        mixins: [imgPath],

        methods: {
            initData(){


                //获取接口数据
                //获取地址
                getAddress(this.location.latitude,
                    this.location.longitude).then(response => {

                    this.address = response;
                    this.addressName = response.address;
                }).catch(error => {

                    console.log(error.code);
                    console.log(error.message);
                });

                //获取天气
                getWeather(this.location.latitude,
                    this.location.longitude).then(response => {

                    this.weather = response;
                    this.temperature = response.temperature;
                    this.description = response.description;
                }).catch(reject => {
                    console.log(reject);
                });



                //获取分类信息
                getEntries(this.location.latitude,
                    this.location.longitude).then(response => {

                    this.entries = response[0].entries;
                });

                //获取热搜词汇
                getHotSearchWords(this.location.latitude,
                    this.location.longitude).then(response => {

                    this.hotsearchwords = response;
                });


            },

            start(event){
                console.log('start');
                this.oldClientX = event.changedTouches[0].clientX;
                this.touchElement = event.target.offsetParent;
                console.log(event.target.offsetParent);
            },

            move(event){
                console.log('move');
                this.newClientX = event.changedTouches[0].clientX;
                this.moveX = this.newClientX - this.oldClientX;
                this.touchElement.setAttribute('transform', 'translate3d(' + this.moveX + 'px,0px,0px');
                console.log(this.moveX);
            },

            end(event){
                console.log('end');
                console.log(-this.moveX);
                this.touchElement.setAttribute('transform', 'translate3d(' + (-this.moveX) + 'px,0px,0px)');
                //console.log(event);
            },

            setLocation(newlocation){
                this.$store.commit('SAVE_LOCATION',newlocation);
            }

        },


        components: {
            liuxiFooter,
            rest
        },



        async mounted(){
            try {

                let position = await getPosition();

                this.location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                 setStoge('location',this.location);

            } catch (error) {
                console.log('无法获取地址');
                console.log(error);

                this.location = getStoge('location');
                this.setLocation(this.location);
            }



        },


    }
</script>

<style lang="scss">

    @import "../../scss/mixin";


    #msite {
        width: 100%;

        /*外卖页面主体开始*/
        .wrap {
            height: 90%;

            .header {
                @include property-of-rem('padding', 20px, 28px, 0px, 28px);
                background-color: #0af;

                /*地址天气部分样式*/
                .location-weather {
                    @include flex-content();
                    color: #fff;
                    height: pxToRem(69px);

                    /*地理位置名称*/
                    .location {
                        font-weight: 700;
                        background-color: #0af;
                        font-size: pxToRem(34px);

                        span {
                            max-width: 60%;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            display: inline-block;
                            vertical-align: bottom;
                        }
                    }

                    /*天气信息*/
                    .weather {
                        @include flex-content();

                        .desc {
                            @include flex-content(flex-start, center);
                            flex-direction: column;

                            h2 {
                                font-size: pxToRem(28px);
                            }

                            span {
                                font-size: pxToRem(20px);
                            }
                        }

                        img {
                            width: pxToRem(55px);
                            height: pxToRem(55px);
                            margin-left: pxToRem(8px);
                        }

                    }

                }
            }

            /*搜索部分样式*/
            .search {
                @include property-of-rem('padding', 15px, 28px);
                color: rgb(102, 102, 102);
                position: sticky;
                top: 0;
                left: 0;
                z-index: 999;
                background-color: #0af;

                a {
                    font-weight: 700;
                    height: pxToRem(72px);
                    text-align: center;
                    vertical-align: middle;
                    display: block;
                    font-size: pxToRem(26px);
                    line-height: pxToRem(72px);
                    background-color: #fff;

                }
            }

            /*热搜词汇部分样式*/
            .word {
                @include property-of-rem('padding', 15px, 28px, 30px, 28px);
                background-color: #0af;

                .key {
                    white-space: nowrap;
                    overflow-x: auto;

                    a {
                        color: #fff;
                        margin-right: pxToRem(30px);
                    }
                }
            }

            /*外卖分类样式开始*/
            .entries {
                height: pxToRem(300px);
                position: relative;
                overflow-x: auto;

                /*分类栏目*/
                .entry-items {
                    width: 200%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    background-color: #fff;
                    @include flex-content(flex-start);
                    transition: translate3d .5s;

                    .items-page {
                        width: 50%;
                        height: 100%;
                        @include flex-content(flex-start);
                        flex-wrap: wrap;

                        a {
                            display: inline-block;
                            width: 25%;
                            height: pxToRem(128px);
                            margin-top: pxToRem(22px);
                            @include flex-content(flex-start);
                            flex-direction: column;

                            img {
                                display: inline-block;
                                width: pxToRem(90px);
                                height: pxToRem(90px);

                            }

                            span {
                                display: inline-block;
                                color: rgb(102, 102, 102);
                                text-align: center;
                                width: 100%;
                                height: pxToRem(28px);
                            }

                        }

                    }

                }

            }
            /*外卖分类样式结束*/

            /*分类栏目翻页开始*/
            .page-wrap {
                height: pxToRem(50px);
                background-color: #fff;
                @include flex-content(center, flex-start);

                .wrap-btn {

                    a {

                        display: inline-block;
                        width: pxToRem(15px);
                        height: pxToRem(15px);
                        background-color: #000;
                        border-radius: pxToRem(7.5px);

                    }
                }

            }
            /*分类栏目翻页结束*/

            /*商家列表子组件*/
            #restaurant {
                width: 100%;
                background-color: #fff;
                margin-top: pxToRem(20px);

                .title {

                    h3 {
                        @include property-of-rem('padding', 32px, 20px, 0px, 20px);
                        margin-top: pxToRem(20px);
                    }
                }
            }



        }
        /*外卖页面主体开始*/


    }


</style>