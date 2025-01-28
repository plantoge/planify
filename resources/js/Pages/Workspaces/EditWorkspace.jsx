import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { router, useForm } from '@inertiajs/react';
import React from 'react'

export default function EditWorkspace({ workspace, page_settings, visibilities }) {
    const { data, setData, processing, reset, post, errors } = useForm({
        name: workspace.name ?? '',
        cover: null,
        logo: null,
        visibility: workspace.visibility ?? '',
        _method: page_settings.method,
    })

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                // onHandleReset()
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message)
            }


        });
    }

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    return (
        <div className='border'>
            <Card className="md:col-span-2">
                <CardContent>
                    <form onSubmit={onHandleSubmit}>
                        <div className="py-6">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={data.name}
                                        onChange={onHandleChange}
                                        onErrors={errors.name && <InputError message={errors.name} />}
                                    />
                                </div>

                                <div className="col-span-full">
                                    <InputLabel htmlFor="cover" value="Cover" />
                                    <TextInput
                                        type="file"
                                        name="cover"
                                        id="cover"
                                        onChange={(e) => setData(e.target.name, e.target.files[0])}
                                        onErrors={errors.cover && <InputError message={errors.cover} />}
                                    />
                                </div>

                                <div className="col-span-full">
                                    <InputLabel htmlFor="logo" value="Logo" />
                                    <TextInput
                                        type="file"
                                        name="logo"
                                        id="logo"
                                        onChange={(e) => setData(e.target.name, e.target.files[0])}
                                        onErrors={errors.logo && <InputError message={errors.logo} />}
                                    />
                                </div>

                                <div className="col-span-full">
                                    <InputLabel htmlFor="visibility" value="Visibility" />
                                    <Select
                                        defaultValue={data.visibility}
                                        onValueChange={(value) => setData('visibility', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue>
                                                {visibilities.find((visibility) => visibility.value == data.visibility)
                                                    ?.label ?? 'Select a Visibility'}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {visibilities.map((visibility, index) => (
                                                <SelectItem key={index} value={visibility.value}>
                                                    {visibility.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-6 gap-x-2">
                            <Button 
                                type="button" 
                                variant="link" 
                                className="font-medium text-red-500 hover:text-red-600 hover:no-underline" 
                                onClick={() => 
                                    confirm('Are you sure you want to delete this workspace?') && 
                                    router.delete(route('workspaces.destroy', {workspace : workspace}), {
                                        preserveScroll: true,
                                        preserveState: true,
                                        onSuccess: (success) => {
                                            const flash = flashMessage(success);
                                            if (flash) toast[flash.type](flash.message)
                                        }
                                    })
                                }
                            >
                                Delete Workspace
                            </Button>
                            <div className='flex gap-x-2'>
                                <Button type="button" variant="ghost" onClick={() => reset()}>
                                    Reset
                                </Button>
                                <Button variant="red" type="submit" disabled={processing}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
