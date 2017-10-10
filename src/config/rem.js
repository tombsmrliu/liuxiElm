/**
 * Created by liuxi on 2017/9/13.
 */


;(function (window,document) {

    /**
     *  设置meta viewport
     *  计算1rem的值
     */

    var recaculate = function () {

        /**
         * 1.获取dpr
         * 2.根据dpr计算页面缩放的比例值
         * 3.设置viewport
         * 4.给<html>添加自定义属性，记录当前dpr
         * 5.计算1rem的值
         * 6.设置根元素的字体大小等于1rem
         * 7.设置页面默认的字体大小
         */

        //获取dpr
        var dpr = Math.floor(window.devicePixelRatio) || 1;

        //根据dpr计算页面缩放比值

        var html =document.documentElement;

        var scale = 1 / dpr;

        //创建meta元素
        var metaEl = document.createElement('meta');
        metaEl.setAttribute('name','viewport');
        metaEl.setAttribute('content','width=device-width,initial-scale='
            +scale+',maximum-scale='+scale+',minimum-scale='+scale+
            ',user-scalable=no');

        document.head.appendChild(metaEl);

        //为html添加data-dpr属相，用于以后css hack
        html.setAttribute('data-dpr',dpr);

        //计算1rem值
        var rem = 75 ;

        //分析饿了么官网发现屏幕宽度大于1242时候 rem都等于108

        if (html.clientWidth < 1242){
            rem = html.clientWidth / 10;
        }else {
            rem = 108;
        }

        //这是根元素字体大小
        html.style.fontSize = rem + 'px';

        //设置页面默认字体大小
        document.body.style.fontSize = 12 * dpr +'px';




    };

    //监听当文档加载完成 设备改变方向，重新计算1rem值

    if (document.addEventListener){

        document.addEventListener('DOMContentLoaded',recaculate,false);

        window.addEventListener('orientationchange',recaculate,false);
    }else {
        //适配IE
        window.attachEvent('resize',recaculate);

        document.onreadystatechange = function () {

            if (document.readyState == 'complete'){
                recaculate();
            }
        };
    }




})(window,document);