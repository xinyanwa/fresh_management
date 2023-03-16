<template>
  <el-container>
      <el-aside class="aside">
        <Aside></Aside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</template>

<script>
import Aside from '@/components/home/aside'
import Main from '@/views/home/index'

export default {
    name: 'Layout',
    components:{
        Aside,
        Main
    }
  
}
</script>

<style>

</style>