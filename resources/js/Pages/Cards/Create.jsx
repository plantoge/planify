import HeaderForm from '@/Components/HeaderForm'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { Card, CardContent } from '@/Components/ui/card'
import AppLayout from '@/Layouts/AppLayout'
import React from 'react'

export default function Create({page_settings, Statuses, Priorities, workspace}) {
  return (
    <div className='space-y-10 divide-y divide-dashed divide-gray-900/10'>
        <div className='grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3'>
            <HeaderForm title={page_settings.title} subtitle={page_settings.subtitle} />
            <Card className='md:col-span-2' >
                <CardContent>
                    <form>
                        <div className="py-6">
                            <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                <div className='col-span-full'>
                                    <InputLabel htmlfor='title' value='Title' />
                                    <TextInput 
                                        type="text"
                                        name='title'
                                        id='title'
                                    />
                                </div>
                                <div className='col-span-full'>
                                    <InputLabel htmlfor='description' value='Description' />
                                    <TextInput 
                                        type="text"
                                        name='description'
                                        id='description'
                                    />
                                </div>
                                <div className='col-span-full'>
                                    <InputLabel htmlfor='deadline' value='Deadline' />
                                    <TextInput 
                                        type="date"
                                        name='deadline'
                                        id='deadline'
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}


Create.layout = (page) => <AppLayout children={page} title={'Create Card'} />