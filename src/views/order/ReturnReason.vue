<template>
  <div class="return-request">
    <h2 class="return-request__title">退货申请</h2>
    <el-form ref="returnForm" :model="form" label-width="80px" class="return-request__form">
      <!-- Order Information -->
      <div class="return-request__section">
        <el-divider class="return-request__header">订单信息</el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单号">
              <span>{{ form.orderNumber }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下单日期">
              <span>{{ form.orderDate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额">
              <span>{{ form.orderAmount }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- Return Information -->
      <div class="return-request__section">
        <el-divider class="return-request__header">退货信息</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="退货原因">
              <el-select v-model="form.returnReason" placeholder="请选择" class="return-request__select">
                <el-option :key="reason.value" :label="reason.label" v-for="reason in returnReasons"
                           :value="reason.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退货数量">
              <el-input v-model.number="form.returnQty" type="number" autocomplete="off"
                        class="return-request__input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="退货备注">
              <el-input v-model="form.returnNotes" type="textarea" placeholder="请输入"
                        class="return-request__textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退货地址">
              <el-radio-group v-model="form.returnAddressType" class="return-request__radio-group">
                <el-radio :label="1">默认地址</el-radio>
                <el-radio :label="2">其他地址</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-if="form.returnAddressType === 2">
              <el-col :span="12">
                <el-form-item label="收件人">
                  <el-input v-model="form.returnRecipient" placeholder="请输入"
                            class="return-request__input"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系方式">
                  <el-input v-model="form.returnContact" placeholder="请输入" class="return-request__input"></el-input>
                </el-form-item>
              </el-col>
              <el-form-item label="详细地址">
                <el-input v-model="form.returnAddress" type="textarea" placeholder="请输入"
                          class="return-request__textarea"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- Upload Photo -->
      <div class="return-request__section">
        <el-divider class="return-request__header">上传照片</el-divider>
        <el-form-item label="请上传退货照片" class="return-request__upload">
          <el-upload
              ref="upload"
              :action="uploadUrl"
              :headers="headers"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :data="{ orderId: form.orderNumber }"
              :before-upload="beforeUpload"
              :on-exceed="handleExceed"
              :limit="2"
              :file-list="fileList"
              list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
            <div class="el-upload__text">上传照片</div>
          </el-upload>
        </el-form-item>
      </div>

      <!-- Submit Button -->
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" class="return-request__submit">提交申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ReturnRequest",
  data() {
    return {
      form: {
        orderNumber: "1234567890",
        orderDate: "2022/05/30",
        orderAmount: "¥ 2,399.00",
        returnReason: "",
        returnNotes: "",
        returnQty: 1,
        returnAddressType: 1,
        returnRecipient: "",
        returnContact: "",
        returnAddress: "",
      },
      returnReasons: [
        {value: "quality", label: "质量问题"},
        {value: "wrong-item", label: "错发"},
        {value: "not-satisfied", label: "不满意"},
        {value: "other", label: "其他"},
      ],
      uploadUrl: "https://jsonplaceholder.typicode.com/posts/",
      headers: {},
      fileList: [],
    };
  },
  methods: {
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("只能上传jpg/png格式的图片！");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传照片大小不能超过2MB！");
        return false;
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.fileList.length} 张照片`);
    },
    handleSuccess(response, file, fileList) {
      this.$message.success(`${file.name} 上传成功`);
      this.fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
    },
    handleRemove(file, fileList) {
      this.$message.warning(`${file.name} 已经被移除`);
    },
    handleSubmit() {
      this.$refs.returnForm.validate((valid) => {
        if (valid) {
          this.$message.success("提交退货申请成功！");
        } else {
          this.$message.warning("请完善退货信息！");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.return-request {
  padding: 20px;
  background-color: #f0f2f5;
}

.el-upload__list {
  display: none;
}

.el-upload__text {
  color: #666;
  font-size: 14px;
  margin-top: 5px;
}

.el-upload__icon {
  font-size: 28px;
  color: #ccc;
}

.el-upload__tip {
  margin-top: 5px;
  font-size: 12px;
  color: #999;
}

.el-upload--picture-card:hover {
  border-color: #409eff;
}

.el-upload__picture-card > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-icon-close {
  font-size: 16px;
}
</style>
