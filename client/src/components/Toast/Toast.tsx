import React, { FC, useState, useRef } from 'react'
import { OpenToastOptionProps } from './index'
//import { XIcon } from '@heroicons/react/outline'
import { Button } from '../Button/Button'

interface ToastProps {
  message: string
  options?: OpenToastOptionProps
}
export const Toast: FC<ToastProps> = ({ message }: ToastProps) => {
  const [isOpen, setIsOpen] = useState(true)

  const toastRef = useRef(null)
  const handleClose = () => setIsOpen(false)

  if (isOpen)
    return (
      <div
        className="fixed inset-0 z-30 overflow-y-auto"
        id="toast"
        onClick={handleClose}
      >
        <div className="min-h-screen px-4 text-center">
          <div className="my-8 inline-block w-3/4 max-w-sm translate-y-0 transform overflow-hidden rounded bg-gray-900 py-2  px-4 text-left text-white opacity-80 shadow-xl transition-all">
            <p className="inline" ref={toastRef}>
              {message}
            </p>
            <Button onClick={handleClose}>
              icon
            </Button>
          </div>
        </div>
      </div>
    )
  return <></>
}