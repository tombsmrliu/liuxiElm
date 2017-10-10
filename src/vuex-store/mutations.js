/**
 * Created by liuxi on 2017/9/27.
 */


//导入突变类型配置
import {
    SAVE_LOCATION,
    ADD_CART,
    REDUCE_CART,
    CLEAR_CART
} from './mutation-type';


//定义变动接口方法
export default {

    [SAVE_LOCATION]:(state, location) => state.location = location,


    //添加到购物车变动方法
    [ADD_CART]:(state,{shopId,foodId,name,
                    original_price,price,spec}) =>{

        //获取state里面的属性
        let cart = state.cartList;

        //定义变量存放商品对象
        let shop = cart[shopId] = ( cart[shopId] || {} );


        //判断该foodid是否存在
        if (shop[foodId]) {
            //商品数量自增1
            shop[foodId].count += 1;
        }else {

            //创建foodid对应的对象
            shop[foodId] = {

                name,
                original_price,
                price,
                spec,
                count:1
            };
        }




        //覆盖状态属性，触发观察者，以便响应变化
        state.cartList = {...cart};



    },



    //移出购物车变动方法
    [REDUCE_CART]:(state,{shopId,foodId}) =>{

        //获取state里面的属性
        let cart = state.cartList;

        //定义变量存放商品对象
        let shop = cart[shopId];

        //减少数量
        shop[foodId].count--;


        if (shop[foodId].count == 0){
            delete shop[foodId];

            if (shop[foodId].length) {
                shop[foodId] = null;
            }

        }

       state.cartList = {...cart};

    },




    //清空购物车
    [CLEAR_CART]:(state)=>{


        state.cartList = {};

    }



}