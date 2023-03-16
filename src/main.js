import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//导入自己样式库
import '@/assets/styles/common.less'

// 导入elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)


app.use(router)
.use(ElementPlus)

app.mount('#app')
