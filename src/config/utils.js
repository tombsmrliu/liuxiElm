/**
 * Created by liuxi on 2017/9/14.
 */

var BaseUrl = 'https://fuss10.elemecdn.com';

export const imgPath = {

    methods: {
        imgUrl : (hash, size)=>{

            if (!hash || !size) return;

            var first = hash.substr(0, 1);
            var second = hash.substr(1, 2);
            var subHash = hash.substr(3);
            var imgType = hash.substr(32);
            const url = BaseUrl + '/' + first + '/' + second + '/' +
                subHash + '.' + imgType + '?' + 'imageMogr/thumbnail/!' +
                size + 'r/gravity/Center/crop/' + size + '/';

            return url;

        },
    }

};


export const bgkPath = {

    methods: {

        bgkUrl : (hash)=>{

            if (!hash) return;

            var first = hash.substr(0, 1);
            var second = hash.substr(1, 2);
            var subHash = hash.substr(3);
            var imgType = hash.substr(32);
            const url = BaseUrl + '/' + first + '/' + second + '/' +
                subHash + '.' + imgType + '?' + 'imageMogr/format/webp/thumbnail/!40p/blur/50x54/';


            return url;

        },
    }
}


export const getDistance = {

    methods:{
        getDistance(distance) {
            return distance >= 1000 ? ( distance == 1000 ?
                (distance/1000).toFixed(0)+'km' :
                (distance/1000).toFixed(2)+'km' ):
                distance+'m';
        },
    }
};






