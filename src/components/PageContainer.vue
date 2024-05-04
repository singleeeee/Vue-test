<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>
<template>
  <el-card class="card-container">
    <!-- 标题头部 -->
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <div class="extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>
<style scoped lang="scss">
.card-container {
  min-height: 100%;
  box-sizing: border-box;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
