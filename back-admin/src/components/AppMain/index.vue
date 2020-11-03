<template>
    <div class="main">
        <app-link v-if="$route.path != '/home'"></app-link>
        <router-view></router-view>
    </div>
</template>

<script>
import AppLink from "../AppLink"
export default {
 name : "", 
 data(){
  return {

  }
 },
 components : {
     AppLink
 },
}
</script>


<style scoped>
    .main{
        padding : 10px;
    }
    
</style>