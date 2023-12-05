import { Skeleton } from '@nextui-org/react'
import React from 'react'

export default function loading() {
  return (
    <div className="mx-auto max-w-270">
        <div className="grid grid-cols-1 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <Skeleton className="w-full h-115 " />
          </div>          
        </div>
      </div>
  )
}
