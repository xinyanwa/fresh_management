<template>
  <el-table :data="tableData" style="width: 100%" border lazy>
    <el-table-column prop="gd_Name" label="商品名称"/>
    <el-table-column prop="gd_Price" label="商品价格"/>
    <el-table-column prop="gd_Desc" label="商品详情"/>
    <el-table-column prop="gd_Img" label="商品图片">
      <el-image style="width: 100px;height: 100px;" fit="contain"
                :src="tableData[1].gd_Img"/>
    </el-table-column>
    <el-table-column prop="gd_Color" label="商品颜色">
      <el-color-picker v-model="tableData[1].color"/>
    </el-table-column>
  </el-table>
</template>

<script>
import {getGoodsData} from '@/api/goods'

export default {
  name: "GoodsList",
  data() {
    return {
      tableData: [
        {
          gd_Name: '蔬菜',
          gd_Price: 36,
          gd_Desc: '这是',
          gd_Img: 'https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg',
          gd_Color: ''
        }
      ],
      index: 0
    }
  },
  methods: {
    getGoodList() {
      getGoodsData().then(data=>{
        console.log(data.data.data.data)
        if(data.data.data.data){
          this.tableData = data.data.data.data

          console.log(this.tableData[0].gd_Img)
        }
      })
    }
  },
  mounted() {
    this.getGoodList()
  }
}
</script>

<style scoped>

</style>
