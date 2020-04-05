import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:9528/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://localhost:9528/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://localhost:9528/vue-admin-template/user/logout',
    method: 'post'
  })
}
