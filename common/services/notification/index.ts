import { toast, ToastOptions } from 'react-hot-toast'

export class NotificationService {
  private defaultOptions: ToastOptions = {
    duration: 4000,
    position: 'bottom-right',
  }

  success(message: string, options?: ToastOptions) {
    return toast.success(message, { ...this.defaultOptions, ...options })
  }

  error(message: string, options?: ToastOptions) {
    return toast.error(message, { ...this.defaultOptions, ...options })
  }

  info(message: string, options?: ToastOptions) {
    return toast(message, { ...this.defaultOptions, ...options })
  }

  loading(message: string, options?: ToastOptions) {
    return toast.loading(message, { ...this.defaultOptions, ...options })
  }

  dismiss(toastId: string) {
    toast.dismiss(toastId)
  }
}

export const notificationService = new NotificationService() 