<template>
  <div class="user-setting">
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card>
          <div class="avatar">
            <img :src="avatarUrl" alt="avatar">
          </div>
          <el-upload
              class="upload-avatar"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
            <el-button  size="small" type="primary">
              修改头像
            </el-button>
          </el-upload>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-form :model="form" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="form.us_Name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.us_Phone" placeholder="请输入电话"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件">
              <el-input v-model="form.us_Email" placeholder="请输入电子邮件"></el-input>
            </el-form-item>
            <el-form-item label="角色" >
              <el-select v-model="form.us_State" placeholder="请选择角色" disabled>
                <el-option v-for="role in roles" :key="role.value" :label="role.label" :value="role.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "UserSetting",
  data() {
    return {
      avatarUrl: "https://picsum.photos/id/237/200/200",
      form: reactive({
        us_Name: "",
        us_Pass: "",
        address: "",
        us_Phone: "",
        us_Email: "",
        us_State: "",
      }),
      roles: [
        {
          label: "初级管理员",
          value: "active",
        },
        {
          label: "高级管理员",
          value: "inactive",
        },
        {
          label: "系统管理员",
          value: "admin",
        },
      ],
    };
  },
  mounted(){
    this.getUserInfo()
  },
  methods: {
    handleAvatarSuccess(res) {
      this.avatarUrl = res.url;
    },
    handleSubmit() {
      console.log(this.form);
    },
    getUserInfo(){
      let user = JSON.parse(window.localStorage.getItem('user'))
      this.form = user
      console.log(this.form)
    }
  },
};
</script>

<style scoped>
.user-setting {
  max-width: 1200px;
  margin: 0 auto;
}
.upload-avatar {
  margin-top: 20px;
}
</style>

