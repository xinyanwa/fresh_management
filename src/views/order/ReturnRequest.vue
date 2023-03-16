<template>
  <div class="returns-list">
    <el-table :data="returns" style="width: 100%; font-size: 14px;">
      <el-table-column prop="productName" label="商品名称"></el-table-column>
      <el-table-column prop="orderId" label="订单号"></el-table-column>
      <el-table-column prop="quantity" label="数量"></el-table-column>
      <el-table-column prop="orderDate" label="订单日期"></el-table-column>
      <el-table-column prop="returnDate" label="退货日期"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="text" @click="edit(row)">
            <i class="fas fa-edit"></i>
            编辑
          </el-button>
          <el-button type="text" @click="remove(row)">
            <i class="fas fa-trash"></i>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="addReturn" class="add-btn">
      <i class="fas fa-plus"></i>
      添加退货
    </el-button>
    <el-dialog :visible.sync="dialogVisible" title="添加退货" :before-close="handleClose" width="50%;">
      <el-form :model="formData" label-position="left" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="formData.productName"></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="formData.orderId"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model.number="formData.quantity"></el-input>
        </el-form-item>
        <el-form-item label="订单日期">
          <el-date-picker v-model="formData.orderDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="退货日期">
          <el-date-picker v-model="formData.returnDate" type="date"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="add">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'ReturnRequest',
  data() {
    return {
      returns: [
        {
          productName: '红色高跟鞋',
          orderId: '123456',
          quantity: 2,
          orderDate: '2022-01-01',
          returnDate: '2022-01-05'
        },
        {
          productName: '黑色手提包',
          orderId: '234567',
          quantity: 1,
          orderDate: '2022-01-02',
          returnDate: '2022-01-06'
        },
        {
          productName: '灰色连衣裙',
          orderId: '345678',
          quantity: 3,
          orderDate: '2022-01-03',
          returnDate: '2022-01-07'
        }
      ],
      dialogVisible: false,
      formData: {
        productName: '',
        orderId: '',
        quantity: '',
        orderDate: '',
        returnDate: ''
      }
    }
  },
  methods: {
    addReturn() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
    },
    add() {
      this.returns.push(this.formData)
      this.dialogVisible = false
      this.$message({
        message: '退货添加成功',
        type: 'success'
      })
    },
    edit(row) {
      console.log('编辑退货：', row)
    },
    remove(row) {
      this.$confirm('确认删除该退货？')
          .then(_ => {
            const index = this.returns.indexOf(row)
            this.returns.splice(index, 1)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
          .catch(_ => {})
    }
  }
}
</script>

<style>
.returns-list {
  max-width: 1280px;
  margin: 0 auto;
}
.el-table {
  background-color: #fff;
  border: 1px solid #e4e7ed;
}
.el-button.el-button--primary {
  background-color: #31c27c;
  border-color: #31c27c;
}
.el-button.el-button--primary:hover {
  background-color: #1e9d5a;
  border-color: #1e9d5a;
}
.el-button.add-btn {
  margin-top: 20px;
}
.el-dialog__body {
  padding: 20px;
}
.el-dialog__footer {
  text-align: right;
}
.el-dialog__wrapper {
  border-radius: 5px;
}
</style>
