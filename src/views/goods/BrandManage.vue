<template>
  <div class="container">
    <el-steps :active="activeStep" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="详情信息"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品分类"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>

    <div class="content">
      <div v-show="activeStep === 0">
        <el-form>
          <el-form-item label="商品名称">
            <el-input v-model="form.gd_Name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="activeStep === 1">
        <el-form>
          <el-form-item label="商品名称">
            <el-input v-model="form.gd_Name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input-number v-model="form.gd_Price"></el-input-number>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="form.gd_Desc"></el-input>
          </el-form-item>
          <el-form-item label="商品颜色">
            <el-input type="textarea" v-model="form.gd_Color"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="activeStep === 2">
        <el-upload
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError">
          <el-button type="primary">上传商品图片</el-button>
        </el-upload>

        <div class="image-preview" v-show="form.gd_Img">
          <img :src="form.image" alt="商品图片">
          <button @click="clearImage">删除图片</button>
        </div>
      </div>
      <div v-show="activeStep === 3">
        <el-cascader
          :options="categories"
          :props="{
            value: 'id',
            label: 'name',
            children: 'children',
          }"
          v-model="form.gd_Type"
          change-on-select
          placeholder="请选择商品分类">
        </el-cascader>
      </div>
      <div v-show="activeStep === 4">
        <p>商品名称：{{ form.gd_Name }}</p>
        <p>商品价格：{{ form.gd_Price }}</p>
        <p>商品描述：{{ form.gd_Desc }}</p>
        <p>商品颜色：{{ form.gd_Color }}</p>
        <p>商品图片：<a :href="form.image" target="_blank">{{ form.gd_Img }}</a></p>
        <p>商品分类：{{ form.gd_Type }}</p>
      </div>
    </div>

    <div class="buttons">
      <el-button v-if="activeStep > 0" @click="prevStep">上一步</el-button>
      <el-button type="primary" @click="nextStep">{{activeStep === 0 ? '查询商品' : activeStep === 4 ? '完成' : '下一步' }}</el-button>
    </div>
  </div>
</template>

<script>
import {getGoodsInfo} from '@/api/goods'
import {ElMessage} from 'element-plus'
export default {
  name: 'App',

  data() {
    return {
      form: {
        gd_Name: '',
        gd_Price: 0,
        gd_Desc: '',
        gd_Color: '',
        gd_Img: '',
        gd_Type: '',
      },
      categories: [
        {
          id: 1,
          name: '电子产品',
          children: [
            {
              id: 101,
              name: '手机',
              children: [
                {
                  id: 10101,
                  name: '苹果',
                },
                {
                  id: 10102,
                  name: '华为',
                },
                {
                  id: 10103,
                  name: '小米',
                },
              ],
            },
            {
          id: 102,
          name: '电脑',
              children: [
                {
                  id: 10201,
                  name: '笔记本电脑',
                },
                {
                  id: 10202,
                  name: '台式电脑',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: '服装鞋帽',
          children: [
            {
              id: 201,
              name: '男装',
              children: [
                {
                  id: 20101,
                  name: 'T恤',
                },
                {
                  id: 20102,
                  name: '衬衫',
                },
              ],
            },
            {
              id: 202,
              name: '女装',
              children: [
                {
                  id: 20201,
                  name: '连衣裙',
                },
                {
                  id: 20202,
                  name: '半身裙',
                },
              ],
            },
          ],
        },
      ],
      activeStep: 0,
    }
  },

  computed: {
    uploadUrl() {
      // 替换成你的上传图片接口
      return 'https://example.com/upload'
    },
  },

  methods: {
    nextStep() {
      if (this.activeStep < 4) {
        this.activeStep++
        if (this.activeStep === 1) {
          let name = this.form.gd_Name
          getGoodsInfo(name).then(data => {
            console.log(data.data.data.data[0])
            if(data.data.code === -1){
              ElMessage.error('输入的商品不存在，请重新输入')
              this.form.gd_Name = ''
              this.activeStep--
            } else {
               // = data.data.data
               this.form = JSON.parse(JSON.stringify(data.data.data.data[0]))
               // this.form = {...data.data.data[0]}
            }
          })
        }
      } else {
        this.submitForm()
      }
    },

    prevStep() {
      if (this.activeStep > 0) {
        this.activeStep--
      }
    },

    handleUploadSuccess(response) {
      this.form.image = response.url
    },

    handleUploadError() {
      alert('上传失败！')
    },

    clearImage() {
      this.form.image = ''
    },

    submitForm() {
      // 替换成你的保存商品接口
      alert(JSON.stringify(this.form))
    },
  },
}
</script>


<style lang="less">
@primary-color: #409EFF;
@danger-color: #f56c6c;

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.el-steps__item.is-finish > .el-steps__item-title {
  color: @primary-color !important;
}

.el-steps__item.is-error > .el-steps__item-title {
  color: @danger-color !important;
}

.content {
  margin-top: 30px;
}

.el-form-item__label {
  font-weight: bold;
  margin-bottom: 10px;
}

.el-input,
.el-input-number,
.el-cascader .el-input__inner {
  width: 100%;
}

.image-preview {
  margin-top: 20px;
  img {
    max-width: 100%;
  }
  button {
    margin-left: 20px;
  }
}

.buttons {
  margin-top: 30px;
  text-align: center;
  el-button {
    margin-left: 10px;
  }
}
</style>

