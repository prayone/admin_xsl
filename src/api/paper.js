import request from '@/utils/request'
export function get_paper_list(data) {
  return request({
    url: '/api/list_paper',
    method: 'post',
    data
  })
}

