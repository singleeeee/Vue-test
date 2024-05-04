<script setup>
import { getArticleChannelService } from '../../../api/article'
import { ref } from 'vue'
defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const channelList = ref([])
const getArticleList = async () => {
  const res = await getArticleChannelService()
  channelList.value = res.data.data
  console.log(channelList.value)
}
getArticleList()
</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    >
    </el-option>
  </el-select>
</template>

