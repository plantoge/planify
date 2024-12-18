import React, { useRef } from 'react'
import HeaderForm from '@/Components/HeaderForm'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { Button } from '@/Components/ui/button'
import { Card, CardContent } from '@/Components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import AppLayout from '@/Layouts/AppLayout'
import { useForm } from '@inertiajs/react'
import { flashMessage } from '@/lib/utils'
import { toast } from 'sonner'
import InputError from '@/Components/InputError'

export default function Create({ page_settings, visibilities }) {

    const { data, setData, processing, reset, post, errors } = useForm({
        name: '',
        cover: null,
        logo: null,
        visibility: '',
        _method: page_settings.method,
    })
    
    const fileInputLogo = useRef(null);
    const fileInputCover = useRef(null);

    const onHandleReset = () => {
        reset();
        if(fileInputCover.current){
            fileInputCover.current.reset();
        }
        if(fileInputLogo.current){
            fileInputLogo.current.reset();
        }
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
            <div className='grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-1'>
                <HeaderForm className='mb-0' title={page_settings.title} subtitle={page_settings.subtitle} />
                <Card className='md:col-span-2'>
                    <CardContent>
                        <form onSubmit={onHandleSubmit}>
                            <div className='py-6'>
                                <div className='grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6'>
                                    <div className='col-span-full'>
                                        <InputLabel htmlFor='name' value={'Name'} />
                                        <TextInput
                                            type='text'
                                            id='name'
                                            name='name'
                                            value={data.name}
                                            className='mt-1 block w-full'
                                            onChange={(e) => setData(e.target.name, e.target.value)}
                                            onErrors={errors.name && <InputError message={errors.name} />} />
                                    </div>
                                    <div className='col-span-full'>
                                        <InputLabel htmlFor='cover' value={'cover'} />
                                        <TextInput
                                            type='file'
                                            id='cover'
                                            name='cover'
                                            ref={fileInputCover}
                                            className='mt-1 block w-full'
                                            onChange={(e) => setData(e.target.name, e.target.files[0])} />

                                        {errors.cover && <InputError message={errors.cover} />}
                                    </div>
                                    <div className='col-span-full'>
                                        <InputLabel htmlFor='logo' value={'logo'} />
                                        <TextInput
                                            type='file'
                                            id='logo'
                                            name='logo'
                                            ref={fileInputLogo}
                                            className='mt-1 block w-full'
                                            onChange={(e) => setData(e.target.name, e.target.files[0])} />

                                        {errors.logo && <InputError message={errors.logo} />}
                                    </div>
                                    <div className='col-span-full'>
                                        <InputLabel htmlFor='visibility' value={'visibility'} />
                                        <Select
                                            value={data.visibility}
                                            onValueChange={(value) => setData('visibility', value)} >
                                            <SelectTrigger>
                                                <SelectValue></SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {visibilities.map((visibility, index) => (
                                                    <SelectItem key={index} value={visibility.value}>
                                                        {visibility.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.visibility && <InputError message={errors.visibility} />}

                                    </div>
                                    <div className='flex items-center justify-end py-6 gap-x-2 col-span-full'>
                                        <Button type='button' variant='ghost' onClick={onHandleReset}>
                                            Reset
                                        </Button>
                                        <Button type='submit' variant='red' disabled={processing}>
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