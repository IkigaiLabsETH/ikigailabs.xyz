import { toast } from 'react-toastify'

export const showToast = () => {
  toast.info('This is a toast', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}
