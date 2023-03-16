<template>
  <div>
    <el-form :model="form" ref="form" label-width="80px">
      <el-form-item label="会员编号">
        <el-input v-model.number="form.memberId"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model.number="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="form.birthday" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item label="会员级别">
        <el-select v-model="form.level" placeholder="请选择">
          <el-option label="普通会员" value="普通会员"></el-option>
          <el-option label="银卡会员" value="银卡会员"></el-option>
          <el-option label="金卡会员" value="金卡会员"></el-option>
          <el-option label="白金卡会员" value="白金卡会员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会员积分">
        <el-input v-model.number="form.points" suffix="分"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker v-model="form.registerTime" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="上次消费时间">
        <el-date-picker v-model="form.lastOrderTime" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="累计消费金额">
        <el-input v-model.number="form.totalAmount" suffix="元"></el-input>
      </el-form-item>
      <el-form-item label="消费次数">
        <el-input v-model.number="form.totalOrders"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MemberChange',
  data() {
    return {
      form: {
        memberId: '',
        name: '',
        gender: '男',
        phone: '',
        email: '',
        birthday: '',
        level: '',
        points: 0,
        registerTime: '',
        lastOrderTime: '',
        totalAmount: 0,
        totalOrders: 0
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // TODO: 提交表单数据
        } else {
          return false;
        }
      });
    }
  }
}
</script>
