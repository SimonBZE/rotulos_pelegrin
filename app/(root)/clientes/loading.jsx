import { Spinner } from '@nextui-org/react'
import React from 'react'

export default function Loading() {
  return (
    <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center"><Spinner size='lg'/></div>
  )
}
