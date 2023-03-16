<template>
  <div class="order-list-wrapper">
    <el-row>
      <el-col :span="24">
        <h3 class="page-title">订单列表</h3>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="10" :lg="8">
        <el-input placeholder="搜索订单号或客户姓名" v-model="searchKey" class="search-input"></el-input>
      </el-col>
      <el-col :xs="24" :sm="12" :md="10" :lg="8" class="text-right">
        <el-button type="warning" @click="createOrder()">创建订单</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="orders" border stripe v-loading="loading">
          <el-table-column prop="id" label="订单号" width="200"></el-table-column>
          <el-table-column prop="customerName" label="客户姓名" width="120"></el-table-column>
          <el-table-column prop="createdTime" label="创建时间" width="200"></el-table-column>
          <el-table-column prop="status" label="订单状态" width="120">
            <template slot-scope="scope">
              <el-badge :value="scope.row.status === 1 ? '刚刚创建' : scope.row.status === 2 ? '已付款' : '已取消'"
                        :type="scope.row.status === 1 ? 'warning' : scope.row.status === 2 ? 'success' : 'error'"
                        :size="'small'">
              </el-badge>
            </template>
          </el-table-column>
          <el-table-column prop="totalPrice" label="订单总金额" width="120"></el-table-column>
          <el-table-column label="操作" width="200" class="text-right">
            <template slot-scope="scope">
              <el-button size="small" type="info" @click="viewOrder(scope.row.id)">查看</el-button>
              <el-button size="small" type="success" v-if="scope.row.status === 1" @click="payOrder(scope.row.id)">支付</el-button>
              <el-button size="small" type="danger" v-if="scope.row.status === 1" @click="cancelOrder(scope.row.id)">取消</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-wrapper">
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currentPage" @current-change="handlePageChange"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OrderList',
  data () {
    return {
      orders: [],
      total: 0,
      loading: false,
      pageSize: 10,
      currentPage: 1,
      searchKey: ''
    }
  },
  mounted () {
    // this.fetchOrders()
  },
  methods: {
    async fetchOrders (page = 1, limit = this.pageSize) {
      this.loading = true
      const { data } = await axios.get('/api/orders', {
        params: {
          page,
          limit,
          searchKey: this.searchKey.trim()
        }
      })
      this.orders = data.orders
      this.total = data.total
      this.loading = false
    },
    handlePageChange (page) {
      this.currentPage = page
      this.fetchOrders(page)
    },
    createOrder () {
      this.$router.push('/orders/new')
    },
    viewOrder (orderId) {
      this.$router.push(`/orders/${orderId}`)
    },
    async payOrder (orderId) {
      await axios.put(`/api/orders/${orderId}`, {
        status: 2
      })
      this.$message.success('订单支付成功')
      this.fetchOrders(this.currentPage)
    },
    async cancelOrder (orderId) {
      await axios.put(`/api/orders/${orderId}`, {
        status: 3
      })
      this.$message.success('订单取消成功')
      this.fetchOrders(this.currentPage)
    }
  }
}
</script>

<style scoped>
.order-list-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 24px;
  margin: 0 0 20px;
}

.search-input {
  width: 100%;
}

.el-table {
  margin: 20px 0;
}

.pagination-wrapper {
  margin-top: 20px;
  text-align: right;
}

.text-right {
  text-align: right;
}

.el-button--warning {
  background-color: #f0ad4e;
  color: #fff;
  border: none;
}

.el-button--warning:hover {
  background-color: #ec971f;
  color: #fff;
}

.el-button--warning:active {
  background-color: #ec971f;
  color: #fff;
  box-shadow: none;
}

.el-button--warning:focus {
  box-shadow: none;
}
</style>

