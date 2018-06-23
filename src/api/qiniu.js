import request from '@/utils/newRequest'

// export function getToken() {
//   return request({
//     url: 'newapi/graph/loops_stats_dau/recent_dau?zone=sa', // 假地址 自行替换
//     method: 'get'
//   })
// }

export function getToken(){
  return request('/v1/newapi/graph/loops_stats_dau/recent_dau','get');
}