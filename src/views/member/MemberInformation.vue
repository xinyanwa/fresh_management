<template>
  <div>
    <h2>会员信息设置</h2>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="form.gender" placeholder="请选择">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="form.age"></el-input-number>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-cascader
            v-model="form.address"
            :options="options"
            :props="props"
            placeholder="请选择"
            @change="handleAddressChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="职业" prop="occupation">
        <el-select v-model="form.occupation" placeholder="请选择">
          <el-option label="学生" value="student"></el-option>
          <el-option label="教师" value="teacher"></el-option>
          <el-option label="程序员" value="programmer"></el-option>
          <el-option label="其他" value="other"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
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
        gender: '',
        age: '',
        phone: '',
        address: [],
        occupation: '',
      },
      options: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'haidian',
              label: '海淀区',
              children: [
                {
                  value: 'xierqi',
                  label: '西二旗',
                },
                {
                  value: 'zhongguancun',
                  label: '中关村',
                },
              ],
            },
            {
              value: 'chaoyang',
              label: '朝阳区',
              children: [
                {
                  value: 'sanlitun',
                  label: '三里屯',
                },
                {
                  value: 'guomao',
                  label: '国贸',
                },
              ],
            },
          ],
        },
        {
          value: 'shanghai',
          label: '上海',
          children: [
            {
              value: 'pudong',
              label: '浦东新区',
              children: [
                {
                  value: 'lujiazui',
                  label: '陆家嘴',
                },
                {
                  value: 'zhangjiang',
                  label: '张江',
                },
              ],
            },
            {
              value: 'minhang',
              label: '闵行区',
              children: [
                {
                  value: 'xinzhuang',
                  label: '莘庄',
                },
                {
                  value: 'wujing',
                  label: '吴泾',
                },
              ],
            },
          ],
        },
      ],
      props: {
        value: 'value',
        label: 'label',
        children: 'children',
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        address: [{ required: true, message: '请选择地址', trigger: 'change' }],
        occupation: [{ required: true, message: '请选择职业', trigger: 'change' }],
      },
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 提交表单数据到后端进行保存
          console.log(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    handleAddressChange(value) {
      console.log(value)
    },
  },
}
</script>
