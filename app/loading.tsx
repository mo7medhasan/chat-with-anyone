import LoadingSpinner from '@/components/LoadingSpinner'
import React from 'react'

function Loading() {
  return (
    <div className='flex items-center justify-center p-10'>
        <LoadingSpinner/>
    </div>
  )
}

export default Loading