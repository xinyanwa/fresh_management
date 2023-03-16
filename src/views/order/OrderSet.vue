<template>
  <div class="order-settings">
    <h2 class="page-title">订单设置</h2>

    <el-tabs v-model="activeTab" @tab-click="validateTab" type="border-card" class="tab-container">
      <el-tab-pane label="一般设置" name="general-tab">
        <el-form :model="form" ref="generalForm" :rules="generalFormRules"
                 :label-position="labelPosition" label-width="150px" class="form-container">
          <el-form-item label="订单自动确认时间" prop="autoConfirmTime">
            <el-input v-model.number="form.autoConfirmTime" type="number" min="1" max="30" suffix="天"></el-input>
            <el-form-item label=" " class="input-description">
              订单在未取消的情况下，将自动确认并发货。
            </el-form-item>
          </el-form-item>

          <el-form-item label="订单自动取消时间" prop="autoCancelTime">
            <el-input v-model.number="form.autoCancelTime" type="number" min="1" max="30" suffix="天"></el-input>
            <el-form-item label=" " class="input-description">
              未付款的订单将在该时间后自动取消，腾出该商品库存。
            </el-form-item>
          </el-form-item>

          <el-form-item label="订单过期时间" prop="expireTime">
            <el-input v-model.number="form.expireTime" type="number" min="1" max="30" suffix="分钟"></el-input>
            <el-form-item label=" " class="input-description">
              订单将在该时间内未支付，自动过期并取消。该商品重新上架。
            </el-form-item>
          </el-form-item>

          <el-form-item label="订单支付有效时间" prop="payValidTime">
            <el-input v-model.number="form.payValidTime" type="number" min="1" max="30" suffix="分钟"></el-input>
            <el-form-item label=" " class="input-description">
              该时间为订单支付的有效时间，超出该时间，订单将被取消。
            </el-form-item>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('generalForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="物流设置" name="logistics-tab">
        <el-form :model="form" ref="logisticsForm" :rules="logisticsFormRules"
                 :label-position="labelPosition" label-width="150px" class="form-container">
          <el-form-item label="发货时间" prop="deliveryTime">
            <el-input v-model.number="form.deliveryTime" type="number" min="1" max="30" suffix="天"></el-input>
            <el-form-item label=" " class="input-description">
              该时间为订单确认后，出售的商品准备发货的时间。
            </el-form-item>
          </el-form-item>
          <el-form-item label="订单配送时效" prop="deliveryDuration">
            <el-input v-model.number="form.deliveryDuration" type="number" min="1" max="30" suffix="天"></el-input>
            <el-form-item label=" " class="input-description">
              该时间为发货后，到顾客确认收货前的期限，此期限内顾客需要确认收货。
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('logisticsForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="退货设置" name="refund-tab">
        <el-form :model="form" ref="refundForm" :rules="refundFormRules"
                 :label-position="labelPosition" label-width="150px" class="form-container">
          <el-form-item label="退货申请时效" prop="refundApplyDuration">
            <el-input v-model.number="form.refundApplyDuration" type="number" min="1" max="30" suffix="天"></el-input>
            <el-form-item label=" " class="input-description">
              该时间为订单确认的时间限制之内，申请退货请求的时效。
            </el-form-item>
          </el-form-item>

          <el-form-item label="退货处理时效" prop="refundProcessDuration">
            <el-input v-model.number="form.refundProcessDuration" type="number" min="1" max="30" suffix="天"></el-input>
            <el-form-item label=" " class="input-description">
              该时间为商家收到退货商品的时间限制之内，处理退货请求的时效。
            </el-form-item>
          </el-form-item>

          <el-form-item label="退货退款时效" prop="refundCompleteDuration">
            <el-input v-model.number="form.refundCompleteDuration" type="number" min="1" max="30" suffix="天"></el-input>
            <el-form-item label=" " class="input-description">
              该时间为退货审核通过后，商家完成退款的时间时效。
            </el-form-item>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('refundForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'OrderSet',
  data() {
    return {
      form: {
        autoConfirmTime: 2,
        autoCancelTime: 5,
        expireTime: 15,
        payValidTime: 10,

        deliveryTime: 2,
        deliveryDuration: 15,

        refundApplyDuration: 7,
        refundProcessDuration: 5,
        refundCompleteDuration: 3,
      },
      activeTab: 'general-tab',
      labelPosition: 'right',
      generalFormRules: {
        autoConfirmTime: [
          { required: true, message: '请输入订单自动确认时间' }
        ],
        autoCancelTime: [
          { required: true, message: '请输入订单自动取消时间' }
        ],
        expireTime: [
          { required: true, message: '请输入订单过期时间' }
        ],
        payValidTime: [
          { required: true, message: '请输入订单支付有效时间' }
        ],
      },
      logisticsFormRules: {
        deliveryTime: [
          { required: true, message: '请输入发货时间' }
        ],
        deliveryDuration: [
          { required: true, message: '请输入订单配送时效' }
        ],
      },
      refundFormRules: {
        refundApplyDuration: [
          { required: true, message: '请输入退货申请时效' }
        ],
        refundProcessDuration: [
          { required: true, message: '请输入退货处理时效' }
        ],
        refundCompleteDuration: [
          { required: true, message: '请输入退货退款时效' }
        ],
      },
    };
  },
  methods: {
    submitForm(ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          // 此处提交表单数据到后端保存
          this.$message.success('保存成功');
        } else {
          return false;
        }
      })
    },
    validateTab(tab) {
      if (tab.name === 'general-tab') {
        this.$refs.generalForm.validate();
      } else if (tab.name === 'logistics-tab') {
        this.$refs.logisticsForm.validate();
      } else if (tab.name === 'refund-tab') {
        this.$refs.refundForm.validate();
      }
    },
  },
};
</script>

<style scoped>
.page-title {
  margin-bottom: 20px;
}

.tab-container {
  margin-top: 20px;
}

.form-container {
  margin: 40px;
}

.input-description {
  margin-top: 10px;
}
</style>
