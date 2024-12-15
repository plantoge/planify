import HeaderForm from '@/Components/HeaderForm'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { Button } from '@/Components/ui/button'
import { Card, CardContent } from '@/Components/ui/card'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'
import AppLayout from '@/Layouts/AppLayout'
import { router } from '@inertiajs/react'
import React, { useState } from 'react'

export default function Create({page_settings, visibilites}) {
    const [data, setData] = useState({
        name: '',
        cover: '',
        logo: '',
        visibility: 'Private',
    })  

    const onHandleSubmit = (e) => {
        e.preventDefault()
        router.post(page_settings.action, data);
    }
  return (
    <div className='space-y-10 divide-y divide-dashed divide-gray-900/10'>
        <div className='grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-1'>
            <HeaderForm className='mb-0' title={page_settings.title} subtitle={page_settings.subtitle} />
            <Card className='md:col-span-2'>
                <CardContent>
                    <form>
                        <div className='py-6'>
                            <div className='grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6'>
                                <div className='col-span-full'>
                                    <InputLabel htmlFor='name' value={'Name'} />
                                    <TextInput
                                        type='text'
                                        name='name'
                                        id='name'
                                        className='mt-1 block w-full'
                                        onChange={(e) => setData(data => ({
                                            ...data,
                                            [e.target.name]: e.target.value
                                        }))} />
                                </div>
                                <div className='col-span-full'>
                                    <InputLabel htmlFor='cover' value={'cover'} />
                                    <TextInput
                                        type='file'
                                        name='cover'
                                        id='cover'
                                        className='mt-1 block w-full'
                                        onChange={(e) => setData(data => ({
                                            ...data,
                                            [e.target.name]: e.target.files[0]
                                        }))} />
                                </div>
                                <div className='col-span-full'>
                                    <InputLabel htmlFor='logo' value={'logo'} />
                                    <TextInput
                                        type='file'
                                        name='logo'
                                        id='logo'
                                        className='mt-1 block w-full' 
                                        onChange={(e) => setData(data => ({
                                            ...data,
                                            [e.target.name]: e.target.files[0]
                                        }))} />
                                </div>
                                <div className='col-span-full'>
                                    <InputLabel htmlFor='visibility' value={'visibility'} />
                                    <Select
                                        defaultValue='Select a visibility'
                                        onValueChange={(value) => setData(data => ({
                                            ...data,
                                            ['visibilities']: value
                                        }))} >
                                        <SelectTrigger>
                                            <SelectValue>Select a Visibility</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {visibilites.map((visibility, index) => (
                                                <SelectItem key={index} value={visibility.value}>
                                                    {visibility.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex items-center justify-end py-6 gap-x-2'>
                                    <Button type='button' variant='ghost'>
                                        Reset
                                    </Button>
                                    <Button type='submit' variant='red'>
                                        Save
                                    </Button>
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

Create.layout = (page) => <AppLayout children={page} title={'Create Workspace'} />