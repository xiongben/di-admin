import request from '@/utils/newRequest'

//overall users
export function getOverall(params){
  return request('/v1/newapi/data/loops_stats_overall','get',params);
}

export function getOverallPie(params){
  return request('/v1/newapi/graph/loops_stats_overall/user_base_come_from','get',params);
}