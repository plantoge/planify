import React, { useRef } from 'react'
import HeaderForm from '@/Components/HeaderForm'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { Card, CardContent } from '@/Components/ui/card'
import AppLayout from '@/Layouts/AppLayout'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { useForm } from '@inertiajs/react'
import { Button } from '@/Components/ui/button'
import { flashMessage } from '@/lib/utils'
import { toast } from 'sonner'
import InputError from '@/Components/InputError'


export default function Create({ page_settings, Statuses, Priorities, workspace }) {
    const { data, setData, processing, reset, post, errors } = useForm({
        title: '',
        description: '',
        deadline: '',
        priority: '',
        status: '',
        _method: page_settings.method,
    })

    const onHandleReset = () => {
        reset();
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                onHandleReset()
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message)
            }

        });
    }

    return (
        <div className='space-y-10 divide-y divide-dashed divide-gray-900/10'>
            <div className='grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3'>
                <HeaderForm title={page_settings.title} subtitle={page_settings.subtitle} />
                <Card className='md:col-span-2' >
                    <CardContent>
                        <form onSubmit={onHandleSubmit}>
                            <div className="py-6">
                                <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                    <div className='col-span-full'>
                                        <InputLabel htmlFor='title' value='Title' />
                                        <TextInput
                                            type='text'
                                            id='title'
                                            name='title'
                                            value={data.title}
                                            className='mt-1 block w-full'
                                            onChange={(e) => setData(e.target.name, e.target.value)}
                                            onErrors={errors.title && <InputError message={errors.title} />}
                                        />
                                    </div>
                                    <div className='col-span-full'>
                                        <InputLabel htmlFor='description' value='description' />
                                        <TextInput
                                            type='text'
                                            id='description'
                                            name='description'
                                            value={data.description}
                                            className='mt-1 block w-full'
                                            onChange={(e) => setData(e.target.name, e.target.value)}
                                            onErrors={errors.description && <InputError message={errors.description} />}
                                        />
                                    </div>
                                    
                                    <div className='col-span-full'>
                                        <InputLabel htmlFor='deadline' value={'Deadline'} />
                                        <TextInput
                                            type="date"
                                            id='deadline'
                                            name='deadline'
                                            value={data.deadline}
                                            className='mt-1 block w-full'
                                            onChange={(e) => setData(e.target.name, e.target.value)}
                                            onErrors={errors.deadline && <InputError message={errors.deadline} />}
                                        />
                                    </div>
                                    <div className='col-span-full'>
                                        <InputLabel htmlFor='priority' value={'priority'} />
                                        <Select
                                            value={data.priority}
                                            onValueChange={(value) => setData('priority', value)} >
                                            <SelectTrigger>
                                                <SelectValue></SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Priorities.map((priority, index) => (
                                                    <SelectItem key={index} value={priority.value}>
                                                        {priority.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.priority && <InputError message={errors.priority} />}

                                    </div>
                                    <div className='col-span-full'>
                                        <InputLabel htmlFor='status' value={'Status'} />
                                        <Select
                                            value={data.status}
                                            onValueChange={(value) => setData('status', value)} >
                                            <SelectTrigger>
                                                <SelectValue></SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Statuses.map((status, index) => (
                                                    <SelectItem key={index} value={status.value}>
                                                        {status.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.status && <InputError message={errors.status} />}

                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-end py-6 gap-x-2 col-span-full'>
                                <Button type='button' variant='ghost' onClick={onHandleReset}>
                                    Reset
                                </Button>
                                <Button type='submit' variant='red' disabled={processing}>
                                    Save
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


Create.layout = (page) => <AppLayout children={page} title={'Create Card'} />