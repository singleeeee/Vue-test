<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import SelectChannel from './components/SelectChannel.vue'
import { ref } from 'vue'
import { getArticleListService } from '../../api/article'
import { formatTime } from '@/utils/format.js'
import EditArticle from './components/EditArticle.vue'

// 假数据
const articleList = ref([])
const total = ref(0)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const loading = ref(false)
const EditArticleRef = ref()
const onEditArticle = (row) => {
  EditArticleRef.value.open(row)
}
const onDeleteArticle = (row) => {
  console.log(row)
}

// 添加修改成功
const onSuccess = (type) => {
  console.log(type)
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}

const getArticleList = async () => {
  loading.value = true
  const res = await getArticleListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total

  loading.value = false
}

const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

const onAddArticle = () => {
  EditArticleRef.value.open({})
}
getArticleList()
</script>

<template>
  <pageContainer title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类：">
        <SelectChannel v-model="params.cate_id"></SelectChannel>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"> </el-option>
          <el-option label="草稿" value="草稿"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" v-loading="loading" stripe>
      <el-table-column label="文章标题" prop="title" align="center">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{
            row.title
          }}</el-link></template
        >
      </el-table-column>
      <el-table-column
        label="分类"
        prop="cate_name"
        align="center"
      ></el-table-column>
      <el-table-column label="发表时间" prop="pub_date" align="center">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="state"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" prop="" align="center">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <!-- 抽屉  -->
    <EditArticle ref="EditArticleRef" @click="onSuccess"></EditArticle>
  </pageContainer>
</template>
