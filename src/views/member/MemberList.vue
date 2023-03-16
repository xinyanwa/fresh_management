<template>
  <div class="member-list-wrapper">
    <!-- 搜索栏 -->
    <div class="form">
      <el-form :inline="true" label-position="right" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input size="small" v-model="searchForm.name" />
        </el-form-item>
        <el-form-item label="会员等级">
          <el-select v-model="searchForm.level" placeholder="请选择">
            <el-option label="普通会员" value="normal"></el-option>
            <el-option label="VIP会员" value="vip"></el-option>
            <el-option label="白金会员" value="platinum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleSearch">
            搜索
          </el-button>
          <el-button type="primary" size="small" @click="handleCreate">
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="email" label="邮箱" width="220" />
      <el-table-column prop="level" label="会员等级" width="120" />
      <el-table-column prop="registerDate" label="注册时间" width="220" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import mockjs from 'mockjs';

export default {
  name: 'MemberList',
  setup() {
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const tableData = ref([]);
    const searchForm = ref({
      name: '',
      level: '',
    });

    const getData = () => {
      const res = mockjs.mock({
        'data|100': [
          {
            'id|+1': 1,
            'name|1': '@cname()',
            'phone|1': /^1[3456789]\d{9}$/,
            'email|1': '@Email()',
            'level|1': ['normal', 'vip', 'platinum'],
            'registerDate|1': () => mockjs.Random.date('yyyy-MM-dd'),
          },
        ],
      });
      total.value = res.data.length;
      tableData.value = res.data.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
    };

    const handleSearch = () => {
      currentPage.value = 1;
      getData();
    };

    const handleCreate = () => {
      ElMessage({
        message: '点击了新增按钮',
        type: 'success',
      });
    };

    const handleEdit = (index, row) => {
      ElMessage({
        message: `点击了编辑第${index + 1}行`,
        type: 'success',
      });
    };

    const handleDelete = (index, row) => {
      ElMessage({
        message: `点击了删除第${index + 1}行`,
        type: 'success',
      });
    };

    const handleSizeChange = (val) => {
      pageSize.value = val;
      currentPage.value = 1;
      getData();
    };

    const handleCurrentChange = (val) => {
      currentPage.value = val;
      getData();
    };

    getData();

    return {
      currentPage,
      pageSize,
      total,
      tableData,
      searchForm,
      handleSearch,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

<style scoped>
.member-list-wrapper {
  padding: 20px;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
