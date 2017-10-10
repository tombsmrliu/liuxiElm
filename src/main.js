/**
 * Created by liuxi on 2017/9/11.
 */


import Vue from 'vue';
import router from './router';
import '@/config/rem'; //引入rem布局
import './scss/index.scss';
import store from './vuex-store';

Vue.config.productionTip = false;

new Vue({
    el:'#elm',
    router,
    store,
});