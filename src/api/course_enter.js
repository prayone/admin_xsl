import request from '@/utils/request'
export function get_question_list(data) {
  return request({
    url: '/api/list_item',
    method: 'post',
    data: {
        "page_index":1,
        "page_size":10
    }
  })
}
