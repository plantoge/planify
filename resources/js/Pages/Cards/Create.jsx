import HeaderForm from '@/Components/HeaderForm'
import AppLayout from '@/Layouts/AppLayout'
import React from 'react'

export default function Create({page_settings, Statuses, Priorities, workspace}) {
  return (
    <div className='space-y-10 divide-y divide-dashed divide-gray-900/10'>
        <div className='grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3'>
            <HeaderForm title={page_settings.title} subtitle={page_settings.subtitle} />
            {/* <EditCard Statuses={Statuses} Priorities={Priorities} workspace={workspace} /> */}
        </div>
    </div>
  )
}


Create.layout = (page) => <AppLayout children={page} title={'Create Card'} />