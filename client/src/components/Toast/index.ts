import _ from 'lodash'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Portal, createRootContainer, toastRootId } from '../Modal/portal'
import { Toast } from './Toast'


export interface OpenToastOptionProps {}

export const openToast = (
  message: string,
  disappearTime: number = 2000,
  options?: OpenToastOptionProps,
) => {
    
  const RANDOM_STR = _.random(1, true).toString(36).substring(2, 11)
  const TOAST_RANDOM_ROOT_ID = `${toastRootId}_${RANDOM_STR}`
  let mount = document.getElementById(TOAST_RANDOM_ROOT_ID)
  if (!mount) {
    mount = createRootContainer(TOAST_RANDOM_ROOT_ID)
  }

  if (mount) {
    const root = createRoot(mount)

    const ToastEl = React.createElement(Toast, { message, options })
    const PortalEl = React.createElement(
      Portal,
      { rootId: TOAST_RANDOM_ROOT_ID },
      ToastEl,
    )
    root.render(PortalEl)

    setTimeout(() => {
      mount?.parentNode?.removeChild(mount)
      root.unmount()
    }, disappearTime)
  }
}