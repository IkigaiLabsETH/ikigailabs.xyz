import * as React from 'react'
import { toast, ToastOptions } from 'react-hot-toast'

interface NotificationOptions extends Omit<ToastOptions, 'duration' | 'position'> {
  title?: string
  description?: string
  duration?: number
  position?: ToastOptions['position']
}

interface ToastContent {
  title: string
  description: string
}

export class NotificationService {
  private defaultOptions: NotificationOptions = {
    duration: 4000,
    position: 'bottom-right',
  }

  private renderToast({ title, description }: ToastContent): React.ReactNode {
    return (
      <div className="flex flex-col gap-1">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    )
  }

  success(message: string, options?: NotificationOptions) {
    const title = options?.title || 'Success'
    const description = options?.description || message
    return toast.success(
      this.renderToast({ title, description }),
      { ...this.defaultOptions, ...options }
    )
  }

  error(message: string, options?: NotificationOptions) {
    const title = options?.title || 'Error'
    const description = options?.description || message
    return toast.error(
      this.renderToast({ title, description }),
      { ...this.defaultOptions, ...options }
    )
  }

  info(message: string, options?: NotificationOptions) {
    const title = options?.title || 'Info'
    const description = options?.description || message
    return toast(
      this.renderToast({ title, description }),
      { ...this.defaultOptions, ...options }
    )
  }

  loading(message: string, options?: NotificationOptions) {
    const title = options?.title || 'Loading'
    const description = options?.description || message
    return toast.loading(
      this.renderToast({ title, description }),
      { ...this.defaultOptions, ...options }
    )
  }

  promise<T>(
    promise: Promise<T>,
    {
      loading = 'Loading...',
      success = 'Success!',
      error = 'Something went wrong',
      options,
    }: {
      loading?: string
      success?: string
      error?: string
      options?: NotificationOptions
    } = {}
  ) {
    return toast.promise(
      promise,
      {
        loading: this.renderToast({
          title: options?.title || 'Loading',
          description: loading,
        }),
        success: this.renderToast({
          title: options?.title || 'Success',
          description: success,
        }),
        error: this.renderToast({
          title: options?.title || 'Error',
          description: error,
        }),
      },
      { ...this.defaultOptions, ...options }
    )
  }

  dismiss(toastId: string) {
    toast.dismiss(toastId)
  }
}

export const notificationService = new NotificationService() 