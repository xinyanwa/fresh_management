<template>
  <div class="addbrand">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model.number="form.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <el-input v-model="form.description" type="textarea" ></el-input>
      </el-form-item>
      <el-form-item label="商品颜色" prop="color">
        <el-select v-model="form.color" placeholder="请选择商品颜色">
          <el-option label="红色" value="red"></el-option>
          <el-option label="蓝色" value="blue"></el-option>
          <el-option label="绿色" value="green"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片" prop="image">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
          :on-remove="handleRemove" :before-remove="beforeRemove" multiple :file-list="form.imageList"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :v-bind="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品分类" prop="category">
        <el-select v-model="form.category" placeholder="请选择商品分类">
          <el-option label="水果" value="fruit"></el-option>
          <el-option label="蔬菜" value="vegetable"></el-option>
          <el-option label="肉类" value="meat"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        price: null,
        description: '',
        color: '',
        imageList: [],
        category: '',
      },
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { type: 'number', message: '价格必须为数字值' },
        ],
        description: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
        color: [{ required: true, message: '请选择商品颜色', trigger: 'change' }],
        image: [{ required: true, message: '请上传商品图片', trigger: 'change' }],
        category: [{ required: true, message: '请选择商品分类', trigger: 'change' }],
      },
      dialogImageUrl: '',
      dialogVisible
        : false,
    }
  },
  methods: {
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(确定移除`${file.name}?`);
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
          // 在这里编写提交表单的代码
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.addbrand{
  width: 800px;
}
</style>

<!-- <template>
  <div class="brand-conter">

    <el-form class="brand-form">
        <el-form-item label="商品编号：">
        <el-input  />
      </el-form-item>
      <el-form-item label="商品名称：">
        <el-input  />
      </el-form-item>
      <el-form-item label="商品详情：">
        <el-input />
      </el-form-item>
      <el-form-item label="商品价格：">
        <el-input/>
      </el-form-item>
      <el-form-item label="分类编号：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="商品图片：">
        <el-upload>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品颜色：">
        <el-input  />
      </el-form-item>
      <div class="brand-submit">
        <el-button type="primary" size="large">提交</el-button>
        <el-button type="danger" size="large">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddBrand",
  data(){
    return{
      imageUrl:''
    }
  }
}
</script>

<style lang="less" scoped>
.brand-conter{
  display: flex;
  justify-content: center;
  align-items: center;
  .brand-form{
    width: 750px;
    height: 700px;
    border: 1px solid #ebeef5;
    padding: 80px;
    .avatar-uploader .avatar {
      width: 178px;
      height: 178px;
      display: block;
      avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
      }

      .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
      }

      .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
      }
    }
  }
  .brand-submit{
    display: flex;
    justify-content: center;
    margin-top: 50px;

  }
}
</style> -->
