<template>
  <div>
    <el-table :data="roles">
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="description" label="角色描述"></el-table-column>
      <el-table-column label="操作">
        <template #default="{row}">
          <el-button type="primary" size="small" @click="onEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="onDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      roles: [
        { id: 1, name: '管理员', description: '拥有所有权限' },
        { id: 2, name: '普通用户', description: '只能查看和编辑自己的信息' },
        { id: 3, name: '超级管理员', description: '拥有所有权限，可配置系统参数' },
      ],
    };
  },
  methods: {
    onEdit(row) {
      console.log(`编辑角色：${JSON.stringify(row)}`);
      // 弹出编辑对话框
    },
    onDelete(row) {
      console.log(`删除角色：${JSON.stringify(row)}`);
      // 确认删除后删除角色
      this.roles = this.roles.filter((item) => item.id !== row.id);
    },
  },
};
</script>
