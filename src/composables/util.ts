import { ElNotification, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'

//消息提示
export function toast(message: string, type: 'success' | 'warning' | 'info' | 'error' = 'success', dangerouslyUseHTMLString = true): void {
  ElNotification({
    message,
    type,
    duration: 2000,
  })
}

//确认弹窗
export function showModal(content = '消息内容', type: 'success' | 'warning' | 'info' | 'error' = 'warning', title = '') {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type,
    }
  )
}

//显示全屏loading
export function showFullLoading(): void {
  nprogress.start()
}
//隐藏全屏loading
export function hideFullLoading(): void {
  nprogress.done()
}

//弹出输入框
export function showPrompt(tip = '', value = '') {
  return ElMessageBox.prompt(tip, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: value,
  })
}