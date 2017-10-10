/**
 * Created by liuxi on 2017/9/22.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';


Vue.use(Vuex);

const state = {
    location:null,
    cartList:{},
};



export default new Vuex.Store({
    state,
    mutations
});