<template>
  <div class="product-category-wrapper">
    <el-input v-model="searchText" placeholder="输入关键字进行搜索" class="search-input"></el-input>

    <el-table :data="categoryList" class="table" border>
      <el-table-column prop="tp_Id" label="分类编号"></el-table-column>
      <el-table-column prop="tp_Desc" label="分类名称"></el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="{ row }">
          <el-button type="primary" size="small" @click="editCategory(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteCategory(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog  title="添加分类">
      <el-form label-position="top" :model="categoryForm">
        <el-form-item label="分类名称">
          <el-input v-model="categoryForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div  class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addCategory">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getGoodsCategory} from '@/api/goods'
export default {
  name: "GoodsCategory",
  data() {
    return {
      categoryList: [
        { tp_Id: 1, tp_Desc: '饮料' },
        { tp_Id: 2, tp_Desc: '零食' },
        { tp_Id: 3, tp_Desc: '生鲜' },
        { tp_Id: 4, tp_Desc: '日用品' },
      ],
      searchText: '',
      dialogVisible: false,
      categoryForm: {
        name: '',
      },
    };
  },
  methods: {
    addCategory() {
      // 向服务器或组件发送添加分类的请求
      // 例如 this.$http.post('/api/categories', this.categoryForm)
      this.categoryList.push({
        id: this.categoryList.length + 1,
        name: this.categoryForm.name,
      });
      this.dialogVisible = false;
    },
    getCategory(){
      getGoodsCategory().then(data=>{
        console.log(data.data.data.data)
        let list = data.data.data.data
        if(list){
          this.categoryList = list
        }
      })
    },
    editCategory(category) {
      // 弹出编辑分类的对话框
      // 例如 this.$http.put(`/api/categories/${category.id}`, category)
      // 将修改后的分类信息更新到 categoryList 中
    },
    deleteCategory(category) {
      // 询问用户是否真的要删除该分类
      // 例如 this.$confirm('确定要删除该分类吗？')
      // 根据用户的确认结果向服务器或组件发送删除分类的请求
      // 例如 this.$http.delete(`/api/categories/${category.id}`)
      // 将删除掉的分类从 categoryList 中移除
      this.categoryList.splice(this.categoryList.indexOf(category), 1);
    },
  },
  mounted(){
    this.getCategory()
  },
  computed: {
    filteredCategoryList() {
      if (this.searchText) {
        return this.categoryList.filter(category => category.name.includes(this.searchText));
      }
      return this.categoryList;
    },
  },
}
</script>

<style scoped>
.search-input {
  margin-bottom: 10px;
  width: 300px;
}

.table {
  width: 100%;
}

.dialog-footer {
  text-align: right;
}

.product-category-wrapper {
  margin: 20px;
}
</style>
