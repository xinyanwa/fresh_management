<template>
  <el-menu
      @select="handleSelect"
      :default-active="routerPath" 
      class="el-menu-demo"
  >
    <el-menu-item index="0">
      <router-link to="/">
        <span>首页</span>
      </router-link>
    </el-menu-item>

    <el-sub-menu :index="item.id" v-for="item in itemList" :key="item.id">
      <template #title>
        <span>{{ item.title }}</span>
      </template>
      <el-menu-item-group v-for="itemL in item.titleList" :key='itemL.id'>
        <el-menu-item :index='`${item.index}`+ `-` + `${itemL.id}`'>
          <span>{{ itemL.title }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      itemList: [
        {
          id: '1',
          index: 1,
          title: '商品管理',
          titleList: [
            {
              id: '0',
              title: '商品列表'
            },
            {
              id: 1,
              title: '商品分类'
            },
            {
              id: 2,
              title: '编辑商品'
            },
            {
              id: 3,
              title: '添加商品'
            },
          ]
        },
        {
          id: '2',
          index: 2,
          title: '订单管理',
          titleList: [
            {
              id: 0,
              title: '订单列表'
            },
            {
              id: 1,
              title: '订单设置'
            },
            {
              id: 2,
              title: '退货申请处理'
            },
            {
              id: 3,
              title: '退货原因设置'
            },
          ]
        },
        {
          id: '3',
          index: 3,
          title: '会员管理',
          titleList: [
            {
              id: 0,
              title: '会员列表'
            },
            {
              id: 1,
              title: '会员信息设置'
            },
            {
              id: 2,
              title: '会员更改'
            }
          ]
        },
        {
          id: '4',
          index: 4,
          title: '权限设置',
          titleList: [
            {
              id: 0,
              title: '用户列表'
            },
            {
              id: 1,
              title: '角色列表'
            },
            {
              id: 2,
              title: '菜单列表'
            },
            {
              id: 3,
              title: '资源列表'
            },
          ]
        },

      ],
      routerPath: '0'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      window.sessionStorage.setItem('routerPath', key)
      switch (key) {
        case '1-0':
          this.$router.push('/goodslist');
          break;
        case '1-1':
          this.$router.push('/goodscategory');
          break;
        case '1-2':
          this.$router.push('/brandcategory');
          break;
        case '1-3':
          this.$router.push('/addbrand');
          break;
        case '2-0':
          this.$router.push('/orderlist');
          break;
        case '2-1':
          this.$router.push('/orderset');
          break;
        case '2-2':
          this.$router.push('/returnrequest');
          break;
        case '2-3':
          this.$router.push('/returnreason');
          break;
        case '3-0':
          this.$router.push('/memberlist');
          break;
        case '3-1':
          this.$router.push('/memberinformation');
          break;
        case '3-2':
          this.$router.push('/memberchange');
          break;
        case '4-0':
          this.$router.push('/userlist' );
          break;
        case '4-1':
          this.$router.push('/rolelist');
          break;
        case '4-2':
          this.$router.push('/menulist');
          break;
        case '4-3':
          this.$router.push('/resourcelist');
          break;
      }
    },
    getPath(){
      let path = window.sessionStorage.getItem('routerPath')
      if (path) {
        this.routerPath = path
      }
    }
  },
  mounted(){
    this.getPath()
  }
};
</script>

<style lang="less" scoped>
</style>



