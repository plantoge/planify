import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { flashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import React from 'react'
import { toast } from 'sonner';

export default function MemberWorkspace({action, member}) {
    const { data, setData, processing, errors, reset, post, recentlySuccessful } = useForm({
            email: '',
            
        })
        
        const onHandleSubmit = (e) => {
            e.preventDefault();
            post(action, {
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
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        type="text"
                                        name="email"
                                        id="email"
                                        value={data.email}
                                        onChange={onHandleChange}
                                        onErrors={errors.email && <InputError message={errors.email} />}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="flex items-center justify-end py-6 gap-x-2">
                            <Button type="button" variant="ghost" onClick={() => reset()}>
                                Reset
                            </Button>
                            <Button variant="red" type="submit" disabled={processing}>
                                Invite
                            </Button>
                            <Transition 
                                show={recentlySuccessful} 
                                enter='Transaition ease-in-out'
                                enterFrom='opacity-0'
                                leave='Transition ease-in-out'
                                leaveFrom='opacity-0'>
                                <p className='text-sm text-muted-foreground'>Invited</p>
                            </Transition>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
