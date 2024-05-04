import request from '@/utils/request'

// 获取文章分类
export const getArticleChannelService = () => request.get('my/cate/list')
// 编辑文章分类
export const editArticleChannelService = (data) =>
  request.put('/my/cate/info', data)
// 添加文章分类
export const addArticleChannelService = (data) =>
  request.post('/my/cate/add', data)
// 删除文章分类
export const delArticleChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: {
      id
    }
  })

// 获取文章列表
export const getArticleListService = (params) =>
  request.get('/my/article/list', {
    params
  })

// 添加文章接口
export const artPublishService = (data) => request.post('/my/article/add', data)

// 编辑文章详情接口
export const artGetDetailService = (id) =>
  request.get('my/article/info', { params: { id } })

// 编辑文章
export const artEditService = (data) => request.put('my/article/info', data)
