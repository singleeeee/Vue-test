<script setup>
import { ref } from 'vue'
import {
  getArticleChannelService,
  delArticleChannelService
} from '../../api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
const channelList = ref([])
const loading = ref(false)
const dialog = ref()
const getArticleList = async () => {
  loading.value = true
  const res = await getArticleChannelService()
  channelList.value = res.data?.data
  loading.value = false
}
getArticleList()

const onEditChannel = async (row, $index) => {
  dialog.value.open(row, $index)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确定要删除分类吗？', '温馨提醒', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await delArticleChannelService(row.id)
  ElMessage.success('删除成功！')
  getArticleList()
}
const onAddChannel = (row) => {
  console.dir(dialog)
  // dialog.value.open({ row })
}
const onSuccess = () => {
  getArticleList()
}
</script>

<template>
  <pageContainer title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table :data="channelList" v-loading="loading" stripe>
      <el-table-column
        type="index"
        label="序号"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="cate_name"
        label="分类名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="cate_alias"
        label="分类别名"
        align="center"
      ></el-table-column>
      <el-table-column prop="" label="操作" width="100" align="center">
        <!-- row item index 下标 -->
        <template #default="{ row, $index }">
          <el-button
            @click="onEditChannel(row, $index)"
            :icon="Edit"
            type="primary"
            circle
            plain
          ></el-button>
          <el-button
            @click="onDelChannel(row, $index)"
            circle
            type="danger"
            plain
            :icon="Delete"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有内容"></el-empty>
      </template>
    </el-table>
    <EditChannel ref="dialog" @success="onSuccess"></EditChannel>
  </pageContainer>
</template>
