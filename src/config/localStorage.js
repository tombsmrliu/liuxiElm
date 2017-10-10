/**
 * Created by liuxi on 2017/9/13.
 */



export const setStoge = (key,value) =>{

     if (!key) return;

     if (typeof value !== 'string'){
         value = JSON.stringify(value);
     }
     window.localStorage.setItem(key,value);
};


export const getStoge = key => {

    if (!key) return;

    const value = window.localStorage.getItem(key);

    return JSON.parse(value);
};