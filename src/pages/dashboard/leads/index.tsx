import React from 'react'

const Leads = () => {
  return (
    <div className='pt-8 pr-4'>
      <header className='flex items-center justify-between border-b-[1px] border-b-gray-300'>
        <h1 className='text-4xl font-bold'>Leads</h1>

        <div className='flex items-center gap-10'>
          <span className='flex flex-col items-center'>
            <span className='text-2xl font-bold text-blue-500'>10,232</span>
            <span>Total leads</span>
          </span>
          <span className='flex flex-col items-center '>
            <span className='text-2xl font-bold text-green-600'>4,135</span>
            <span>Successful leads</span>
          </span>
          <span className='flex flex-col items-center '>
            <span className='text-2xl font-bold text-red-600'>6,097</span>
            <span>Unsuccessful leads</span>
          </span>
        </div>
        <div>
          <span>Sam's Leads</span>
        </div>
      </header>
    </div>
  )
}

export default Leads