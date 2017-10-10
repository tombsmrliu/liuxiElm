<template>

    <div id="shop" v-on:scroll>


        <!--TODO 1.头部 -->
        <!--TODO v-if指令 让模板在数据获取回来之后再编译模板，避免没有数据而报错，因为在vue生命周期（初始化->data设置到vue实例—>编译模板->挂载页面)，如果不写v-if 后面的模板将不会编译生命周期中断，无法完成页面挂载，所以在模板中用到数据应当使用v-if指令去控制知否编译模板-->
        <div class="header-wrap" v-if="restaurantHeader">

            <!--TODO 头部背景外部div v-bind指令绑定style属性 注意赋值为js对象 stryle中我使用的是bgkUrl方法 应该改成计算属性 这样会动态监测图片的变化 而且会带有缓存，由于背景图片变化并不频繁所以计算属性更好 我的方式-->
            <div class="header-background" :style="{backgroundImage:'url('+bgkUrl(restaurantHeader.image_path)+')'}">


                <!--头部返回按钮部分开始-->
                <!--TODO 1.2 返回上一页-->
                <nav class="header-navbar">

                    <!--TODO $router 是怎么来的？  $router是创建vue根实例的时候注入的一个根实例属性 在每个组件中都可以访问到这个属性-->

                    <!--TODO go(-1) 什么含义？ 和原生的调用window下的history一样的 他是对原生的一个封装 将该功能封装到vue的router模块中 可以根据浏览器历史记录去进行相应的返回前进操作-->
                    <div class="return" @click="$router.go(-1)">
                        <i class="fa fa-angle-left"></i>
                    </div>
                </nav>
                <!--头部返回按钮部分开始-->


                <!--头部商家基本信息部分开始-->
                <div class="header-main">

                    <img class="logo" :src="imgUrl(restaurantHeader.image_path,'130x130')" alt="">

                    <div class="content">
                        <h2 class="shopName">{{restaurantHeader.name}}</h2>
                        <p class="delivery">
                            <span v-if="restaurantHeader.delivery_mode">{{restaurantHeader.delivery_mode.text}}/</span>
                            <span>{{restaurantHeader.order_lead_time}}分钟送达/</span>
                            <span v-if="restaurantHeader.piecewise_agent_fee">{{restaurantHeader.piecewise_agent_fee.tips}}</span>
                        </p>
                        <div class="notice">
                            <span>公告：</span>
                            <span>{{restaurantHeader.promotion_info}}</span>
                        </div>
                    </div>

                </div>
                <!--头部商家基本信息部分结束-->


                <!--头部活动部分开始-->
                <div class="activities" v-on:click.parent="showInfo" v-if="restaurantHeader">
                    <activity :activitie="restaurantHeader.activities[0]" v-if="restaurantHeader.activities"></activity>
                    <div class="activityCount" v-if="restaurantHeader.activities">
                        <span>{{restaurantHeader.activities.length}}个活动</span>
                        <i class="fa fa-caret-right"></i>
                    </div>
                </div>

                <!--头部活动部分结束-->


            </div>

            <!--活动信息-->
            <transition name="fade">

                <div class="activities-content" v-if="isShow">

                    <!--商家信息部门-->
                    <div class="wrap" v-if="restaurantHeader">

                        <h2>{{restaurantHeader.name}}</h2>

                        <h2 class="star">
                            <star :rating="restaurantHeader.rating"></star>
                        </h2>

                        <h3>
                           <span>
                            优惠信息
                           </span>
                        </h3>

                        <activity :activitie="item" v-for="(item,index) in restaurantHeader.activities"
                                  :key="item.id" v-if="index<2"></activity>


                        <h3>
                            <span>
                            商家公告
                            </span>
                        </h3>

                        <div class="promotion">
                            {{restaurantHeader.promotion_info}}















                        </div>

                    </div>

                    <!--关闭按钮-->
                    <div class="close" v-on:click.parent="toClose">
                        <i class="fa fa-remove"></i>
                    </div>

                </div>

            </transition>

        </div>
        <!--TODO 1.头部 结束 -->


        <!--TODO 2.选项-->
        <div class="shop-tab" v-on:click="toggleTab">

            <div class="good">
                <span :class="{active:isGood}">商品</span>
            </div>

            <div class="evaluate">
                <span :class="{active:isEvaluate}">评价</span>
            </div>

            <div class="store">
                <span :class="{active:isStore}">店铺</span>
            </div>

        </div>
        <!--TODO 2.选项 结束-->


        <!--TODO 3.商品详情-->
        <div class="shop-detail">


            <!--TODO 3.1商品页面-->
            <div class="good-content" v-if="isGood">


                <!--TODO 3.1.1商品导航-->
                <ul class="good-nav" v-if="restaurants">
                    <li v-for="(item,index) in restaurants" ref="nav"
                        v-on:click.prevent="showFoodList(index,$event)">
                        <span class="itemCount" v-if="itemCount[index]>0">{{itemCount[index]}}</span>
                        <img src="" alt="" v-if="item.icon_url">
                        <span>{{item.name}}</span>

                    </li>

                </ul>

                <!--TODO 3.1.2商品列表-->
                <div class="good-list" v-if="restaurants" v-on:scroll="foodScroll" ref="good">


                    <dl v-for="(item,menuIndex) in restaurants" ref="list">

                        <dt>
                        <div class="catgory-title">
                            <strong>{{item.name}}</strong>
                            <span>{{item.description}}</span>
                        </div>
                        </dt>

                        <dd v-if="item.foods">

                            <div v-for="(food,foodIndex) in item.foods">
                                <div class="food-pannel">
                                       <span class="food-img">
                                            <img :src="imgUrl(food.image_path,'140x140')" alt="">
                                       </span>

                                    <div class="food-info">
                                        <h3 class="food-title">{{food.name}}</h3>

                                        <p class="food-description">
                                            {{food.description}}
                                            </p>

                                        <p class="food-sales">
                                            <span>月售{{food.month_sales}}份</span>
                                            <span>好评率{{food.satisfy_rate}}%</span>
                                        </p>

                                        <p class="food-activity" v-if="food.activity">
                                            <span>{{food.activity.benefit_text}}</span>
                                            <span>{{food.activity.applicable_quantity_text}}</span>
                                        </p>


                                        <div class="price-cart">

                                            <strong class="food-price">

                                                <span>￥</span>

                                                <span>{{food.specfoods[0].price}}</span>

                                                <del class="food-price-origin" v-if="food.specfoods[0].original_price">
                                                    {{food.specfoods[0].original_price}}




                                                </del>


                                            </strong>

                                            <div class="cart-button">
                                                <div class="sub" v-if="foodCount[menuIndex][foodIndex]>0">
                                                    <i class="fa fa-minus-circle"
                                                       @click="deleteToCart(menuIndex,foodIndex,$event)"></i>
                                                    <span>{{foodCount[menuIndex][foodIndex]}}</span>
                                                </div>
                                                <div class="select" v-if="food.specifications.length"
                                                     @click="showModel(menuIndex,foodIndex,$event)">
                                                    <span>选规格</span>

                                                </div>

                                                <div class="plus" v-else>
                                                    <i class="fa fa-plus-circle"
                                                       @click="addToCart(menuIndex,foodIndex,$event)"></i>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>


                        </dd>


                    </dl>


                    <div class="select-model">

                        <transition name="zoom">
                            <div class="model-wrap" v-if="isShowModel">
                                <h1>{{restaurants[selectIndexs[0]].foods[selectIndexs[1]].name}}</h1>

                                <div class="conditionGroup">

                                    <div class="speci">
                                        <h2>
                                            {{restaurants[selectIndexs[0]].foods[selectIndexs[1]].specifications[0].name}}</h2>
                                        <span v-for="(value,index) in restaurants[selectIndexs[0]].foods[selectIndexs[1]].specifications[0].values"
                                              :class="{speciActive:selectsSpeci ===index}"
                                              @click="addSelect(index,$event)">
                                        {{value}}
                                    </span>
                                    </div>


                                    <div v-for="(attr,aindex) in restaurants[selectIndexs[0]].foods[selectIndexs[1]].attrs"
                                         v-if="restaurants[selectIndexs[0]].foods[selectIndexs[1]].attrs"
                                         class="attr">
                                        <h2>{{attr.name}}</h2>
                                        <span v-for="(value,vindex) in attr">{{value}}</span>
                                    </div>


                                </div>


                                <div class="selectedresult">

                                    <p>
                                        <span>￥</span>
                                        <span>{{restaurants[selectIndexs[0]].foods[selectIndexs[1]].specfoods[0].price}}</span>
                                    </p>

                                    <div class="selectedbtn">
                                    <span class="cartadd"
                                          @click="addToCart(selectIndexs[0],selectIndexs[1],$event)">选好了
                                    </span>
                                    </div>

                                </div>


                                <span class="closebtn" @click="closeModel">
                                   <i class="fa fa-remove"></i>
                            </span>

                            </div>
                        </transition>

                        <transition name="fade">
                            <div class="model-bg-layer" v-if="isShowModel"></div>
                        </transition>
                    </div>

                </div>


            </div>
            <!--TODO 3.1商品页面结束-->


            <!--评价页面-->
            <div class="evaluate-content" v-if="isEvaluate">
                <h2>评价页面</h2>

            </div>


            <!--店铺页面-->
            <div class="store-content" v-if="isStore">
                <h2>店铺页面</h2>
            </div>


        </div>
        <!--TODO 3.商品详情 结束-->


        <!--TODO --------------优化调整结构1-------------------- 4.底部购物车-->
        <div class="cart-footer">


            <transition name="fade">
                <div class="cartmask" v-show="isShowCartList" v-if="cartList" @click="isShowCartList=false">

                </div>
            </transition>


            <transition name="push">
                <div class="cartbody" v-show="isShowCartList" v-if="cartList">


                    <div class="cart-header">

                        <span class="cart-header-text">购物车</span>

                        <a href="javascript:" @click="clearList" class="header-remove">
                            <i class="fa fa-trash"></i>
                            <span>清空</span>
                        </a>

                    </div>


                    <div class="cart-body-scroll">

                        <ul>

                            <li class="entityList" v-for="(food,foodId) in shopCartList" :key="foodId">

                                <span class="entityname">{{food.name}}</span>

                                <span class="entitytotal">
                                        {{ (food.count * Math.round(food.price * 100) / 100).toFixed(2) }}
                                </span>

                                <span class="entitybtn">

                                     <a href="javascript:" class="sub" @click="deleteFood(foodId)">
                                            <i class="fa fa-minus-circle"></i>
                                     </a>

                                     <span class="selectednum">{{food.count}}</span>

                                     <a href="javascript:" class="plus" @click.stop="addFood(foodId, food.name,food.original_price, food.price, food.spec)">
                                            <i class="fa fa-plus-circle"></i>
                                     </a>

                                </span>

                            </li>

                        </ul>
                    </div>


                </div>
            </transition>


            <div class="cartnav" @click="isShowCartList=!isShowCartList;">

                <span class="cart-icon" @animationend="removeAnimation"
                      :class="{'cart-icon-animation':isAnimation}">
                      <i class="fa fa-shopping-cart fa-3x"></i>
                      <i class="foodNum" v-if="foodTotalCount">{{foodTotalCount}}</i>
                </span>

                <div class="cart-info">

                    <p class="carttotal">
                        <span v-if="foodTotalPrice">{{foodTotalPrice}}</span>
                    </p>

                    <p class="cartdelivery">
                        配送费￥3
                    </p>

                </div>

                <a @click.prevent="toSettlement" class="submitbtn" v-if="foodTotalPrice>=20">
                    <span>去结算</span>
                </a>

                <a href="javascript:" v-if="foodTotalPrice<20">
                    <span>￥20起送</span>
                </a>

            </div>


            <div class="ball-container">

                <transition-group tag="div" name="drop"
                                  v-on:before-enter="beforeEnter"
                                  v-on:enter="enter"
                                  v-on:after-enter="afterEnter">

                    <div class="ball" v-for="(ball,index) in balls" v-show="ball.show" :key="index">
                        <div class="inner inner-hook" ref="inner-hook"></div>
                    </div>

                </transition-group>

            </div>


        </div>
        <!--TODO --------------优化调整结构1-------------------- 4.底部购物车 结束-->


    </div>


</template>


<!--TODO template
********************************************************************************-->

<script type="text/ecmascript-6">


    import{
        getRestaurantHeader,
        getRestaurant
    } from '@/data/getData';

    import {
        imgPath,
        bgkPath
    }from '@/config/utils';

    import {mapState, mapMutations} from 'vuex';

    import activity from '@/components/activity';
    import star from '@/components/star';

    export default{

        //TODO components
        components: {
            activity,  //TODO activity
            star,     //TODO star
        },

        name: 'shop',

        //TODO data
        data(){

            return {
                restaurantHeader: {},   //TODO 1.1保存商家头部数据
                restaurants: [],
                isGood: true,
                isEvaluate: false,
                isStore: false,
                isShow: false,
                currIndex: 0,
                scrollLength: 0,  //之前滚动过得距离
                foodCounts: [],
                itemCounts: [],
                selectIndexs: [],
                isShowModel: false,
                selectsSpeci: 0,
                isShowBall: false,
                balls: [
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    },
                    {
                        show: false,
                    }

                ],

                dropBalls: [],
                isAnimation: false,
                isShowCartList: false,
                rest_id: this.$route.query.rest_id,
                specIndex: '',

            }
        },


        //TODO mixins
        mixins: [imgPath, bgkPath],

        //TODO computed
        computed: {

            ...mapState(['location', 'cartList']),


            shopCartList(){


                return this.cartList?this.cartList[this.rest_id]:null;

            },


            foodTotalPrice(){

                let price = 0;

                if (this.shopCartList) {
                    Object.values(this.shopCartList).forEach(function (food) {
                        price += food.count * Math.round(food.price * 100);
                    });
                }

                return (price / 100);

            },

            foodTotalCount(){

                let count = 0;

                if (this.shopCartList) {
                    Object.values(this.shopCartList).forEach(function (food) {
                        count += food.count;
                    });
                }


                return count;

            },


            foodCount: {
                get: function () {
                    return this.foodCounts;
                },

                set: function (index, value) {
                    this.foodCounts[index] = value;
                }
            },

            itemCount(){
                this.itemCounts.length = this.foodCounts.length;
                for (let i = 0; i < this.foodCounts.length; i++) {

                    this.itemCounts[i] = 0;

                    for (let j = 0; j < this.foodCounts[i].length; j++) {
                        this.itemCounts[i] += this.foodCount[i][j];
                    }
                }

                return this.itemCounts;
            }
        },

        //TODO watch
        watch: {

            restaurants(){
                this.initFoodCounts();
            }

        },


        //TODO method
        methods: {

            ...mapMutations(['ADD_CART','REDUCE_CART','CLEAR_CART']),

            //添加购物车方法
            addFood(foodId, name, original_price, price, spec){

                this.ADD_CART({shopId: this.rest_id, foodId, name, original_price, price, spec});

            },

            deleteFood(foodId){

                this.REDUCE_CART({shopId:this.rest_id,foodId});

                if (this.foodTotalCount==0) {
                    this.isShowCartList = false;
                }
            },

            clearList(){

                this.CLEAR_CART();

                this.foodCount.fill(0);
                this.itemCounts.fill(0);

            },


            //TODO 1获取数据方法 在mounted中调用
            initData(){

                //TODO 1.1获取商家头部数据
                getRestaurantHeader(this.location.latitude,
                    this.location.longitude, this.rest_id).then(response => {

                    //TODO  this.restaurantHeader = response 赋值后会触发beforeUpdate(),updated()声明周期钩子函数，重新编译模板
                    this.restaurantHeader = response;

                }).catch(error => {
                    console.log(error);
                })


                getRestaurant(this.location.latitude,
                    this.location.longitude, this.rest_id).then(response => {

                    this.restaurants = response;

                }).catch(error => {
                    console.log(error);
                })


            },

            showInfo(event){

                var event = event || window.event;

                this.isShow = !this.isShow;
            },

            toClose(event){
                var event = event || window.event;

                this.isShow = !this.isShow;
            },

            isActive(className){
                switch (className) {
                    case 'good':
                        this.isGood = true;
                        this.isEvaluate = false;
                        this.isStore = false;
                        break;
                    case 'evaluate':
                        this.isGood = false;
                        this.isEvaluate = true;
                        this.isStore = false
                        break;
                    case 'store':
                        this.isGood = false
                        this.isEvaluate = false;
                        this.isStore = true;
                        break;
                }
            },

            toggleTab(event){

                var event = event || window.event;


                var clickTagName = event.target.tagName;

                if (clickTagName == 'DIV') {
                    this.isActive(event.target.classList.item(0));
                } else {
                    this.isActive(event.target.parentElement.classList.item(0));
                }


                //console.log(event.target);
                //console.log(event.currentTarget);
            },


            foodScroll(event){
                var event = event || window.event;


                var scrollDiv = event.currentTarget;


                document.body.scrollTop += scrollDiv.scrollTop;


                this.scrollLength = scrollDiv.scrollTop;

                this.$nextTick(this.linkage(scrollDiv));


                //console.log(event.currentTarget);
                //console.log(this.scrollLength);
            },


            linkage(scrollDiv){
                //获取当前Top值
                var currScrollTop = scrollDiv.scrollTop;

                var heights = this.getHeights();

                for (var i = 1; i < heights.length; i++) {

                    if (currScrollTop < heights[i] && currScrollTop > heights[i - 1]) {
                        this.$refs.nav[this.currIndex].classList.remove('active');
                        this.currIndex = i;
                        this.$refs.nav[i].classList.add('active');
                    }
                }

                if (currScrollTop == 0) {
                    this.$refs.nav[1].classList.remove('active');
                    this.currIndex = 0;
                    this.$refs.nav[0].classList.add('active');
                }


                //console.log('top',scrollDiv.scrollTop);
                //console.log('scroll',scrollDiv.scrollHeight);
                //console.log('client',scrollDiv.clientHeight);

            },


            getHeights(){
                var heights = [];
                var offset = 0;
                var dlArr = this.$refs.list;

                for (var i = 0; i < dlArr.length; i++) {
                    offset += dlArr[i].clientHeight;
                    heights[i] = offset;
                }

                return heights;
            },


            showFoodList(index, event){
                this.$refs.nav[this.currIndex].classList.remove('active');
                this.currIndex = index;
                this.$refs.nav[index].classList.add('active');

                var heights = this.getHeights();

                this.$refs.good.scrollTop = heights[index - 1];

            },


            initFoodCounts(){

                //console.log(this.restaurants.length);

                this.foodCount = new Array(this.restaurants.length);

                for (let i = 0; i < this.restaurants.length; i++) {

                    let foodsArr = this.restaurants[i].foods;

                    this.foodCount[i] = new Array(foodsArr.length).fill(0);

                }

                //console.log('arr',this.foodCount);
            },


            addToCart(menuIndex, foodIndex, event){

                var event = event || window.event;

                var arr = this.foodCount[menuIndex];

                arr[foodIndex] += 1;

                //触发数组响应式
                this.$set(this.foodCount, menuIndex, arr);


                this.isShowModel = false;
                this.specIndex = 0;

                //点选显示小球
//                this.isShowBall = true;
//                this.ballPlus = event.currentTarget;

                if (event) {
                    this.drop(event.currentTarget);
                }


                let food = this.restaurants[menuIndex].foods[foodIndex].specfoods[this.specIndex];

                this.addFood(food.food_id, food.name, food.original_price, food.price, food.spec);



            },





            deleteToCart(menuIndex, foodIndex, event){

                var event = event || window.event;

                var arr = this.foodCount[menuIndex];

                arr[foodIndex] -= 1;

                //触发数组响应式
                this.$set(this.foodCount, menuIndex, arr);

                let food = this.restaurants[menuIndex].foods[foodIndex].specfoods[this.specIndex];

                this.deleteFood(food.food_id);

            },


            //显示选择规格模态框
            showModel(menuIndex, foodIndex, event){

                var event = event || window.event;


                this.isShowModel = true;
                this.selectIndexs.push(menuIndex);
                this.selectIndexs.push(foodIndex);
            },


            closeModel(event){

                var event = event || window.event;

                this.isShowModel = false;
            },


            //点选规格
            addSelect(index, event){

                var event = event || window.event;

                this.selectsSpeci = index;


            },


            //小球抛体过度钩子函数

            drop(el){
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i]

                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },


            beforeEnter(el){

                let count = this.balls.length;


                while (count--) {
                    let ball = this.balls[count];

                    if (ball.show) {
                        //获取元素位于屏幕位置
                        let rect = ball.el.getBoundingClientRect();
                        //console.log(rect);

                        let x = rect.left - 65;
                        let y = -(window.innerHeight - rect.top - 145);
                        //console.log(el);

                        el.style.transform = 'translate3d(0,' + y + 'px,0)';
                        el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)';

                        //console.log('x', x, 'y', y);

                        let inner = el.firstElementChild;
                        //console.log(inner);

                        inner.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
                        inner.style.transform = 'translate3d(' + x + 'px,0,0)';

                    }
                }


            },

            enter(el){

                let ref = el.offsetHeight;

                this.$nextTick(function () {

                    el.style.transform = 'translate3d(0,0,0)';
                    el.style.webkitTransform = 'translate3d(0,0,0)';


                    let inner = el.firstElementChild;

                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';

                })

            },

            afterEnter(){

////                this.ballPlus = null;
////                this.isShowBall = false;

                let ball = this.dropBalls.shift();

                if (ball) {
                    ball.show = false;
                }

                this.isAnimation = true;
            },


            removeAnimation(){
                this.isAnimation = false;
            },


            toSettlement(){
                console.log('toSettlement');

                this.$router.push({path:'/settlement',query:{rest_id:this.rest_id}});

            }




        },

        //TODO created
        created(){


        },




        //TODO mounted
        mounted(){

            this.initData();
            //TODO 1.调用获取数据方法
        },


        //TODO updated
        updated(){
            this.$nextTick(function () {

                if (this.$refs.nav) {
                    this.$refs.nav[0].classList.add('active');
                }

            });
        },


    }

</script>


<!--TODO js
********************************************************************************-->

<style lang="scss" type="text/scss">

    /*TODO 声明使用scss语法  scss是css预处理器，可以在css代码中使用变量方法等.比如将 px单位转化为rem单位*/
    /*TODO lang=scss的作用 ：项目编译的时候可以使用scss处理器将scss语法解释成浏览器可以识别的css代码（实际就是解析变量，方法，以及嵌套语法等）*/
    /*TODO 不写lang=scss 而使用了scss语法 编译时候会出错 提示没有找到识别语法的依赖包*/
    /*TODO 在vue中使用scss 需要下载相关的依赖包，把配置项添加到pakage.json 的devDependencies（生产环境）对象里面添加相关依赖包名称和版本*/
    /*TODO type=text/scss 的作用 让编译器识别scss的语法，而不会报语法错误 ，但是不影响项目的实际运行*/
    @import "../../scss/mixin";
    /*TODO @import 是scss语法 作用是导入mixin文件中的方法 混合器 变量*/

    #shop {
        width: 100%;
        height: 100vh; /*1vh表示屏幕的百分之一尺寸 100表示100%屏幕尺寸*/
        overflow-y: auto;

        /*fadein过度效果*/
        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
        }

        .fade-leave-to, .fade-enter {
            opacity: 0;
        }

        /*TODO 1商品头部样式*/
        .header-wrap {
            width: 100%;
            height: pxToRem(280px);
            position: relative;
            color: #fff;

            .header-background {
                position: relative;
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                background-color: rgb(49, 144, 232);

                nav.header-navbar {
                    @include property-of-rem('padding', 8px, 20px);

                    .return {
                        display: inline-block;
                        width: pxToRem(50px);
                        height: pxToRem(55px);

                        i {
                            display: inline-block;
                            width: pxToRem(50px);
                            height: pxToRem(50px);
                            font-size: pxToRem(48px);
                            color: #fff;
                        }
                    }
                }

                .header-main {
                    width: 100%;
                    @include property-of-rem('padding', 20px, 30px, 0px, 30px);
                    @include flex-content(flex-start);

                    img {
                        width: pxToRem(130px);
                        height: pxToRem(130px);
                        margin-right: pxToRem(20px);

                    }

                    .content {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;

                        p {
                            height: pxToRem(50px);
                            line-height: pxToRem(50px);
                        }

                        .notice {
                            height: pxToRem(40px);
                        }

                    }
                }

                .activities {
                    @include flex-content();
                    position: absolute;
                    left: pxToRem(30px);
                    top: pxToRem(237px);
                    bottom: pxToRem(10px);
                    right: pxToRem(30px);

                }

            }

            .activities-content {
                display: block;
                position: absolute;
                width: 100%;
                height: pxToRem(1334px);
                left: 0;
                top: 0;
                z-index: 1100;
                background-color: #000;

                .wrap {
                    height: pxToRem(1074px);
                    @include property-of-rem('padding', 80px, 60px, 180px, 60px);

                    h2 {
                        width: 100%;
                        text-align: center;
                    }

                    .star {
                        text-align: center;
                        margin-left: pxToRem(260px);
                    }

                    h3 {
                        width: 100%;
                        text-align: center;
                        @include property-of-rem('margin', 60px, 0px, 40px, 0px);

                        span {
                            font-size: pxToRem(24px);
                            display: inline-block;
                            width: pxToRem(180px);
                            line-height: pxToRem(40px);
                            @include property-of-rem('padding', 10px, 20px);
                            border: 1px solid rgb(85, 85, 85);
                            border-radius: pxToRem(30px);
                        }

                    }

                }

                .close {
                    width: pxToRem(90px);
                    line-height: pxToRem(90px);
                    text-align: center;
                    border-radius: pxToRem(45px);
                    border: 1px solid rgb(136, 136, 136);
                    @include property-of-rem('margin', 0px, 330px);

                    i {
                        font-size: pxToRem(40px);
                    }
                }

            }

        }

        /*TODO 2选项样式*/
        .shop-tab {
            @include flex-content();
            font-size: pxToRem(28px);
            background-color: #fff;
            position: sticky;
            top: 0;
            left: 0;
            z-index: 999;

            .good {
                width: 33.3%;
                line-height: pxToRem(80px);
                text-align: center;
                position: relative;

                span {
                    display: inline-block;
                    line-height: pxToRem(74px);
                    font-weight: bold;
                    color: rgb(102, 102, 102);

                    &.active {
                        color: rgb(49, 144, 232);
                        border-bottom: 6px solid #2395ff;

                    }

                }

            }

            .evaluate {
                width: 33.3%;
                line-height: pxToRem(80px);
                text-align: center;

                span {
                    display: inline-block;
                    position: relative;
                    line-height: pxToRem(74px);
                    font-weight: bold;
                    color: rgb(102, 102, 102);

                    &.active {
                        color: rgb(49, 144, 232);
                        border-bottom: 6px solid #2395ff;

                    }
                }

            }

            .store {
                width: 33.4%;
                line-height: pxToRem(80px);
                text-align: center;

                span {
                    display: inline-block;
                    position: relative;
                    line-height: pxToRem(74px);
                    font-weight: bold;
                    color: rgb(102, 102, 102);

                    &.active {
                        color: rgb(49, 144, 232);
                        border-bottom: 6px solid #2395ff;

                    }

                }

            }

        }

        /*TODO 3商品详情样式*/
        .shop-detail {
            width: 100%;

            /*商品页面样式*/
            .good-content {
                width: 100%;
                height: pxToRem(1254px);
                @include flex-content(space-between, flex-start);
                margin-bottom: pxToRem(96px);
                position: relative;

                /*左边商品导航样式*/
                ul {
                    width: pxToRem(170px);
                    height: 100vh;
                    overflow-y: scroll;

                    li {
                        @include property-of-rem('padding', 35px, 15px);
                        position: relative;

                        span {
                            color: rgb(102, 102, 102);
                            line-height: pxToRem(31.2px);
                            font-size: pxToRem(26px);
                        }

                        .itemCount {
                            position: absolute;
                            line-height: pxToRem(28px);
                            right: pxToRem(6px);
                            font-size: pxToRem(20px);
                            font-weight: bold;
                            min-width: pxToRem(28px);
                            color: #fff;
                            background-color: #ff461d;
                            border-bottom-left-radius: 15px;
                            border-bottom-right-radius: 15px;
                            border-top-left-radius: 15px;
                            border-top-right-radius: 15px;
                            top: pxToRem(6px);
                            text-align: center;
                            @include property-of-rem('padding', 0px, 8px);
                        }

                        &.active {
                            font-weight: bold;
                            background-color: #fff;
                            border-left: 6px solid #2395ff;
                        }

                    }

                }

                /*商品列表样式*/
                .good-list {
                    width: pxToRem(580px);
                    overflow-y: scroll;
                    position: relative;
                    height: 100vh;

                    dl {

                        dt {
                            @include property-of-rem('padding', 15px, 60px, 15px, 20px);

                            .catgory-title {

                                strong {
                                    margin-right: pxToRem(10px);
                                    font-size: pxToRem(28px);
                                    font-weight: bold;
                                    line-height: pxToRem(33.6px);
                                }

                                span {
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    line-height: pxToRem(24px);
                                    font-size: pxToRem(20px);

                                }
                            }
                        }

                        dd {

                            div {

                                .food-pannel {
                                    background-color: #fff;
                                    margin-bottom: pxToRem(1px);
                                    @include property-of-rem('padding', 15px, 10px);
                                    @include flex-content(space-between, flex-start);

                                    .food-img {
                                        width: 30%;

                                    }

                                    .food-info {
                                        width: 70%;
                                        @include property-of-rem('padding', 0px, 0px, 25px, 15px);

                                        p {
                                            @include property-of-rem('margin', 13px, 0px);
                                        }

                                        .price-cart {
                                            @include flex-content();

                                            strong {
                                                line-height: pxToRem(32px);
                                                font-size: pxToRem(30px);

                                                span {
                                                    color: rgb(255, 102, 0);
                                                }

                                            }

                                            .cart-button {
                                                font-size: pxToRem(26px);
                                                @include flex-content();

                                                .sub {
                                                    @include flex-content();

                                                    i {
                                                        background-color: rgb(49, 144, 232);
                                                        color: #fff;
                                                        padding: pxToRem(2px);
                                                        line-height: pxToRem(40px);
                                                        border-radius: pxToRem(20px);
                                                        font-size: pxToRem(40px);
                                                    }

                                                    span {
                                                        display: inline-block;
                                                        line-height: pxToRem(33.6px);
                                                        font-size: pxToRem(28px);
                                                        vertical-align: middle;
                                                        text-align: center;
                                                        max-width: pxToRem(56px);
                                                        min-width: pxToRem(30px);
                                                        overflow: hidden;
                                                        white-space: nowrap;
                                                        color: rgb(102, 102, 102);
                                                    }
                                                }

                                                .plus {
                                                    color: rgb(49, 144, 232);
                                                    padding: pxToRem(7px);
                                                    line-height: pxToRem(50px);
                                                    font-size: pxToRem(50px);

                                                }

                                                .select {
                                                    color: #fff;
                                                    padding: pxToRem(7px);
                                                    background-color: rgb(49, 144, 232);
                                                    border-radius: pxToRem(20px);

                                                }

                                            }
                                        }
                                    }

                                }
                            }

                        }
                    }

                    .select-model {
                        position: relative;

                        .model-wrap {
                            position: fixed;
                            width: pxToRem(600px);
                            background-color: #fff;
                            z-index: 999;
                            left: 50%;
                            top: 50%;
                            -webkit-transform: translate(-50%, -50%) scale(1);
                            -moz-transform: translate(-50%, -50%) scale(1);
                            -ms-transform: translate(-50%, -50%) scale(1);
                            -o-transform: translate(-50%, -50%) scale(1);
                            transform: translate(-50%, -50%) scale(1);

                            h1 {
                                text-align: center;
                                @include property-of-rem('padding', 25px, 60px);
                                line-height: pxToRem(22.5px);
                                font-size: pxToRem(30px);
                                color: rgb(51, 51, 51);
                            }

                            .conditionGroup {
                                @include property-of-rem('padding', 0px, 0px, 30px, 40px);

                                div {
                                    margin-bottom: pxToRem(20px);

                                    h2 {
                                        line-height: pxToRem(60px);
                                        font-size: pxToRem(26px);

                                    }

                                    span {
                                        display: inline-block;
                                        line-height: pxToRem(48px);
                                        @include property-of-rem('padding', 0px, 18px);
                                        @include property-of-rem('margin', 13px, 20px, 0px, 0px);
                                        white-space: nowrap;
                                        font-weight: bold;
                                        border: 1px solid #999;
                                        border-radius: pxToRem(24px);
                                        color: #666;

                                    }
                                }

                                .speci {
                                    span {

                                        &.speciActive {
                                            color: #3199e8;
                                            border-color: #3199e8;
                                        }
                                    }
                                }

                            }

                            .selectedresult {
                                font-size: pxToRem(42px);
                                font-weight: bold;
                                border: 1px solid rgb(238, 238, 238);
                                background-color: rgb(249, 249, 249);
                                @include property-of-rem('padding', 25px, 30px);
                                @include flex-content();

                                p {

                                    span {
                                        color: #ff6000;
                                    }
                                }

                                .selectedbtn {

                                    .cartadd {
                                        display: inline-block;
                                        line-height: pxToRem(65);
                                        font-size: pxToRem(28px);
                                        color: #fff;
                                        background-color: #3199e8;
                                        @include property-of-rem('padding', 20px, 25px);
                                        border-radius: pxToRem(5px);

                                    }
                                }

                            }

                            .closebtn {
                                position: absolute;
                                right: pxToRem(30px);
                                top: pxToRem(10px);
                                width: pxToRem(35px);
                                height: pxToRem(35px);

                                i {
                                    font-size: pxToRem(50px);
                                }
                            }

                        }

                        /*zoom过度效果*/
                        .zoom-enter-active, .zoom-leave-active {
                            transition: all .3s ease-in-out;
                        }

                        .zoom-enter, .zoom-leave-to {
                            transform: translate(-50%, -50%) scale(0);
                            transform-origin: 50%;
                        }

                        .zoom-leave, .zoom-enter-to {
                            transform: translate(-50%, -50%) scale(1);
                            transform-origin: 50%;

                        }

                        .model-bg-layer {
                            position: fixed;
                            width: pxToRem(750px);
                            height: pxToRem(1334px);
                            left: 0;
                            top: 0;
                            background-color: rgba(0, 0, 0, 0.5);
                        }
                    }

                }

            }

        }

        /*TODO 4底部购物车样式*/
        .cart-footer {
            width: 100%;
            position: relative;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1500;

            .cartmask {
                width: 100%;
                height: 100%;
                position: fixed;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background-color: rgba(0, 0, 0, 0.4);
                z-index: 10;
            }

            .cartbody {
                width: 100%;
                position: fixed;
                left: 0;
                z-index: 100;
                bottom: pxToRem(100px);

                .cart-header {
                    @include flex-content();
                    color: rgb(102, 102, 102);
                    background-color: rgb(236, 239, 241);
                    border: pxToRem(1px) solid rgb(221, 221, 221);
                    @include property-of-rem('padding', 0px, 25px);

                    .cart-header-text {
                        padding-left: pxToRem(10px);
                        border-left: pxToRem(7px) solid rgb(49, 144, 232);
                        font-size: pxToRem(32px);
                    }

                    .header-remove {
                        line-height: pxToRem(80px);
                        color: rgb(102, 102, 102);
                        text-decoration: none;
                        padding-left: pxToRem(30px);
                        font-size: pxToRem(26px);

                    }

                }

                .cart-body-scroll {
                    max-height: pxToRem(600px);
                    overflow-y: scroll;
                    background-color: #fff;

                    ul {
                        width: 100%;
                        list-style: none;

                        .entityList {
                            width: 100%;
                            @include flex-content();
                            border-bottom: pxToRem(1px) solid rgb(238, 238, 238);
                            margin-left: pxToRem(25px);
                            min-height: pxToRem(110px);
                            @include property-of-rem('padding', 15px, 25px, 15px, 0px);

                            .entityname {
                                font-size: pxToRem(32px);
                                color: rgb(51, 51, 51);
                                flex-basis: 0%;
                                flex-grow: 5.5;
                                flex-shrink: 1;
                                line-height: normal;
                                text-align: left;

                            }

                            .entitytotal {
                                color: rgb(255, 102, 0);
                                flex-basis: 0%;
                                flex-grow: 2;
                                flex-shrink: 1;
                                font-weight: bold;
                                text-align: right;
                                font-size: pxToRem(32px);

                            }

                            .entitybtn {
                                font-size: pxToRem(28px);
                                text-align: right;
                                flex-basis: 0%;
                                flex-grow: 2.5;
                                flex-shrink: 1;

                                .sub {
                                    display: inline-block;
                                    width: pxToRem(50px);
                                    height: pxToRem(50px);

                                    i {
                                        border-radius: pxToRem(23px);
                                        font-size: pxToRem(50px);
                                        color: #fff;
                                        background-color: #3190e8;
                                    }
                                }

                                .plus {
                                    display: inline-block;
                                    width: pxToRem(50px);
                                    height: pxToRem(50px);

                                    i {
                                        border-radius: pxToRem(25px);
                                        font-size: pxToRem(50px);
                                        background-color: #fff;
                                        color: #3190e8;
                                    }
                                }

                            }

                        }

                    }
                }

            }

            .cartnav {
                position: fixed;
                width: 100%;
                height: pxToRem(96px);
                left: 0;
                bottom: 0;
                right: 0;
                z-index: 160;
                line-height: pxToRem(38.4px);
                background-color: rgba(61, 61, 63, .9);
                @include flex-content();
                color: #fff;

                .cart-icon {
                    width: pxToRem(100px);
                    height: pxToRem(100px);
                    border-radius: pxToRem(50px);
                    background-color: rgb(49, 144, 232);
                    border: pxToRem(10px) solid rgb(68, 68, 68);
                    @include property-of-rem('margin', 0px, 20px, 30px, 30px);
                    position: relative;

                    .foodNum {
                        height: pxToRem(28px);
                        display: inline-block;
                        border-radius: pxToRem(10px);
                        padding: pxToRem(4px);
                        font-size: pxToRem(20px);
                        position: absolute;
                        right: 0;
                        top:pxToRem(-30px);
                        color: #fff;
                        background-color: #ff461d;

                    }

                }

                .cart-info {
                    text-align: left;

                    .cartdelivery {
                        font-size: pxToRem(20px);
                        color: #f5f5f5;
                        text-align: left;
                    }
                }

                .submitbtn {

                    span {
                        line-height: pxToRem(96px);
                        height: pxToRem(96px);
                        text-align: center;
                        font-size: pxToRem(30px);
                        background-color: #4cd964;
                        @include property-of-rem('padding', 30.5px, 60px);
                    }

                }

            }

            /*底部小球 动画*/
            .ball-container {

                .ball {
                    /*固定定位*/
                    position: fixed;
                    left: pxToRem(65px);
                    bottom: pxToRem(113px);
                    z-index: 1300;

                    &.drop-enter-active {
                        transition: all .5s cubic-bezier(.62, -0.5, .94, .76);

                        .inner {
                            width: pxToRem(40px);
                            height: pxToRem(40px);
                            background-color: #3190e8;
                            border-radius: 50%;
                            transition: all .5s linear;

                        }
                    }
                }
            }

            .cart-icon-animation {
                animation: drop-car 0.5s;
            }

            @keyframes drop-car {
                0% {
                    transform: scale(1)
                }
                25% {
                    transform: scale(.8)
                }
                50% {
                    transform: scale(1.1)
                }
                75% {
                    transform: scale(.9)
                }
                100% {
                    transform: scale(1)
                }
            }

            /* 购物车列表 过渡 */
            .push-enter-active, .push-leave-active {
                transition: all .3s ease;
            }
            .push-enter, .push-leave-to {
                transform: translateY(100%);
            }

            .push-enter-to, .push-leave {
                transform: translateY(0);
            }

        }

    }

</style>


<!--TODO css
********************************************************************************-->
