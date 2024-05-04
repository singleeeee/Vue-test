<script setup>
import pageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'
const uploadRef = ref()
const userStore = useUserStore()
const imageUrl = ref(userStore.user.user_pic)
const onSelectFile = (uploadFile) => {
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}
const onUpdateAvatar = async () => {
  // 发送请求更新头像
  await userUpdateInfoService(imageUrl.value)

  // userStore重新渲染
  await userStore.getUser()

  // 提示用户
  ElMessage.success('更新头像成功')
}
</script>

<template>
  <pageContainer title="更新头像">
    <el-upload
      ref="uploadRef"
      :auto-upload="false"
      :show-file-list="false"
      class="avatar-uploader"
      :on-change="onSelectFile"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"
        ><Plus
      /></el-icon> </el-upload
    ><br />
    <el-button
      @click="uploadRef.$el.querySelector('input').click()"
      type="primary"
      :icon="Plus"
      size="large"
      >选择图片</el-button
    >
    <el-button
      @click="onUpdateAvatar"
      type="success"
      :icon="Upload"
      size="large"
      >上传头像</el-button
    >
  </pageContainer>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 278px;
  height: 278px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
