/**
 * 日期工具
 */

/**
 * 补零
 */
export function padZero(num: number): string {
  return String(num).padStart(2, '0')
}

/**
 * 格式化日期
 * @example
 * formatDate(new Date())
 * formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
 * @param date 日期
 * @returns YYYY-MM-DD
 */
export function formatDate(date: Date | string | number, format = 'YYYY-MM-DD'): string {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = padZero(d.getMonth() + 1)
  const day = padZero(d.getDate())

  return format.replace('YYYY', String(year)).replace('MM', month).replace('DD', day)
}

/**
 * 获取今天日期
 */
export function getToday(): string {
  return formatDate(new Date())
}

/**
 * 获取本月第一天
 */
export function getMonthStart(): string {
  const now = new Date()
  return formatDate(new Date(now.getFullYear(), now.getMonth(), 1))
}

/**
 * 获取本月最后一天
 */
export function getMonthEnd(): string {
  const now = new Date()
  return formatDate(new Date(now.getFullYear(), now.getMonth() + 1, 0))
}

/**
 * 时间戳转日期
 */
export function timestampToDate(timestamp: number): string {
  return formatDate(timestamp)
}

/**
 * 获取昨天日期
 */
export function getYesterday(format = 'YYYY-MM-DD'): string {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return formatDate(date, format)
}

/**
 * 获取明天日期
 */
export function getTomorrow(format = 'YYYY-MM-DD'): string {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return formatDate(date, format)
}

/**
 * 天数偏移
 * @param days 天数，正数为未来，负数为过去
 * @param fromat
 * @returns
 */
export function dayPeriod(days = 1, fromat = 'YYYY-MM-DD'): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return formatDate(date, fromat)
}

/**
 * 月份偏移
 * @param months 月数，正数为未来，负数为过去
 * @param fromat
 * @returns
 */
export function monthPeriod(months = 1, fromat = 'YYYY-MM-DD'): string {
  const date = new Date()
  date.setMonth(date.getMonth() + months)
  return formatDate(date, fromat)
}

/**
 * 获取当前时间
 * @returns string
 */
export function getNow() {
  const d = new Date()
  const year = d.getFullYear()
  const month = padZero(d.getMonth() + 1)
  const day = padZero(d.getDate())
  const hour = padZero(d.getHours())
  const min = padZero(d.getMinutes())
  const sec = padZero(d.getSeconds())

  return year + '-' + month + '-' + day + ` ` + hour + ':' + min + ':' + sec
}
