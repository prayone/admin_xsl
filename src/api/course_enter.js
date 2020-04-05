import request from '@/utils/request'
export function get_question_list(data) {
  return request({
    url: '/api/list_item',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/api/add_item',
    method: 'post',
    data
  })
}

export function get_item(params) {
  return request({
    url: '/api/item/'+params,
    method: 'get',
  })
}

export function update_item(data) {
  return request({
    url: '/api/update_item',
    method: 'post',
    data
  })
}