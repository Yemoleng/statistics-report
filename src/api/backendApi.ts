import axios from 'axios'
import { setCookies, getCookies } from '../utils/cache.js'

const service = axios.create({
  // baseURL: 'http://epc.ep365.com', // 从环境变量读取基础地址
  baseURL: '/api', // 从环境变量读取基础地址
  timeout: 15000, // 请求超时时间
  // withCredentials: true,
  // headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  // }
})

// 后台登录接口
const fromData = {
  UserName_Nvarchar: 'wureport',
  UserPwd_Nvarchar: '123456',
}

export async function backendLogin(data = fromData) {
  return service.post('user/login', data, { withCredentials: true })
}

// 获取报价单列表接口
import qs from 'qs'
export async function getQuoteList(
  OrderTimeBegin: string = '',
  OrderTimeEnd: string = '',
  take: number = 20,
  pageSize: number = 20,
  options: any = {},
) {
  let data = {}
  if (Object.keys(options).length === 0) {
    data = qs.stringify({
      take,
      skip: 0,
      page: 1,
      pageSize,
      sort: 'CreateTime_datetime-DESC',
      OrderMoney: 1,
      Status: 0,
      SourceType: '',
      OrderNo: '',
      UserName: '',
      OrderTimeBegin,
      OrderTimeEnd,
      IsAllWebSite: '',
      NoFactoryId: '',
      noPower: 1,
      shipArea: '00000000-0000-0000-0000-000000000000',
      shipAreaName: '所有区域',
      ServiceId: '',
      ExclusiveServiceId: '',
    })
  } else {
    data = options
  }
  const res = await service.post('/WebUser/UserQuoteList', data, { withCredentials: true })

  return res.data
}

// 获取销售订单列表接口
export async function getSaleOrderList(data: any = {}) {
  return await service.post('/Order/SaleOrderListExt', data, { withCredentials: true })
}

// 获取组织架构初始化数据接口
export function getOrganizationInitData() {
  return service.get('api/v1/org_structure/get_organization_init_data')
}

// 获取用户信息
export function getUserInfo(
  creatTimeBegin: string = '',
  creatTimeEnd: string = '',
  options: any = {},
) {
  let data = {}
  if (Object.keys(options).length === 0) {
    data = qs.stringify({
      take: '20',
      skip: '0',
      page: '1',
      pageSize: '20',
      creatTimeBegin,
      creatTimeEnd,
      sort: 'Created_Datetime-desc',
      username: '',
      userOnly: '',
      userLevel: '',
      group: '',
      saleMan: '',
      exclusiveCustomers: '',
      userSaleType: '',
      shipArea: '00000000-0000-0000-0000-000000000000',
      shipMan: 'System.Collections.Generic.List%601%5BSystem.Web.Mvc.SelectListItem%5D',
      IsAllSite: 'False',
      area: '',
      city: '',
      district: '',
      userType: '',
      saleProGroup: '',
      shipAreaName: '%E6%89%80%E6%9C%89%E8%B7%AF%E7%BA%BF',
      field: 'CompanyName_Nvarchar',
      customerGroupId: '00000000-0000-0000-0000-000000000000',
      quotaStatus: '',
    })
  } else {
    data = options
  }
  return service.post('WebUser/AuditedUserListNews', data, { withCredentials: true })
}

// 获取客户回款列表接口
export function getCustomerPay(beginTime = '', endTime = '', options: any = {}) {
  let data = {
    take: 20,
    skip: 0,
    page: 1,
    pageSize: 20,
    sort: 'O.UserID_Guid-DESC',
    NameOrCode: '',
    beginTime,
    endTime,
    OrderStatus: 1,
    SiteType: 1,
    bChange: true,
    AreaCode: '',
    websiteid: '',
  }
  return service.post('/Customer/CustomerReceiptHappening', data, { withCredentials: true })
}

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送之前，可以在这里添加一些公共的请求头或参数
    return config
  },
  (error) => {
    return Promise.reject(error.response || error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error.response || error)
  },
)
