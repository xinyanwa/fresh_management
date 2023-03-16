<template>
  <div class="user-list">
    <el-table :data="users" :height="400">
      <el-table-column label="头像">
        <template #default="{row}">
          <img :src="row.avatar" alt="头像" style="width: 32px; height: 32px; border-radius: 50%;">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="status" label="状态" width="90">
        <template #default="{row}">
          <el-tag :type="row.status === '启用' ? 'success' : 'danger'">{{row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{row}">
          <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      users: [
        { avatar: "https://i.pravatar.cc/?u=1", name: "小明", age: "18", gender: "男", email: "xiaoming@qq.com", phone: "13312345678", address: "北京市海淀区", status: "启用" },
        { avatar: "https://i.pravatar.cc/?u=2", name: "小红", age: "21", gender: "女", email: "xiaohong@qq.com", phone: "13312345679", address: "上海市闵行区", status: "禁用" },
        { avatar: "https://i.pravatar.cc/?u=3", name: "小刚", age: "23", gender: "男", email: "xiaogang@qq.com", phone: "13312345680", address: "深圳市南山区", status: "启用" },
      ],
    };
  },
  methods: {
    handleEdit(row) {
      // 编辑用户信息
      console.log(`编辑用户：${row.name}`);
    },
    handleDelete(row) {
      // 删除用户
      console.log(`删除用户：${row.name}`);
    },
  },
};
</script>

<style>
.user-list {
  margin: 20px;
}
</style>
