<template>

    <div id="login">
        <form >
            <label for="">用户名:</label>
            <input type="text" name="username" v-model="username" placeholder="请输入用户名"/> <br>
            <button type="button" @click="toStorage">登录</button>
        </form>
    </div>
 
</template>

<script type="text/ecmascript-6">


      import{
          setStoge
      }from '@/config/localStorage';

      export default{
          name:'login',

          data(){
              return{
                  username:''
              }
          },

          methods:{

            toStorage(){
                 let username = {
                     username:this.username
                 };
                 setStoge('username',username);
                 this.$router.push({path:'/settlement'});
            }

          },


      }

</script>

<style>

</style>