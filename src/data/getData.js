/**
 * Created by liuxi on 2017/9/13.
 */

import fetch from '@/config/fetch';

export const getPosition = function(){

    return navigator.geolocation ? new Promise(function(resolve,reject){

        navigator.geolocation.getCurrentPosition(resolve,reject,{timeout:10000,maximumAge:1e4});

    }) : Promise.reject('您的浏览器不支持地理定位');

};



export const  getAddress = (latitude,longitude) => fetch('/bgs/poi/reverse_geo_coding',{latitude,longitude});



export const  getWeather = (latitude,longitude) => fetch('/bgs/weather/current',{latitude,longitude});



export const  getEntries = (latitude,longitude) => fetch('/shopping/v2/entries',{latitude,longitude,'templates[]':'main_template'});



export const  getRestaurants = (latitude,longitude,offset) => fetch('/shopping/restaurants',{latitude,longitude,'offeset':offset,'limit':20,'extras[]':'activities','terminal':'h5'});



export const  getHotSearchWords = (latitude,longitude) => fetch('/shopping/v3/hot_search_words',{latitude,longitude});


export const  getRestaurantHeader = (latitude,longitude,rest_id) => fetch('shopping/restaurant/'+rest_id,{'extras[]':'activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification',latitude,longitude});


export const getRestaurant = (latitude,longitude,rest_id) => fetch('shopping/v2/menu',{'restaurant_id':rest_id,latitude,longitude});




