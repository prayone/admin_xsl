import request from '@/utils/request'
export function get_knowledge_list(data) {
  return request({
    url: '/api/list_knowledge',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/api/add_knowledge',
    method: 'post',
    data
  })
}

export function update_knowledge(data) {
    return request({
      url: '/api/update_knowledge',
      method: 'post',
      data
    })
  }