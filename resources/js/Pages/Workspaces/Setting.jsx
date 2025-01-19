import HeaderForm from "@/Components/HeaderForm"
import AppLayout from "@/Layouts/AppLayout"
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { flashMessage } from '@/lib/utils';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import EditWorkspace from "./EditWorkspace";
import MemberWorkspace from "./MemberWorkspace";

export default function Setting({...props}){
    const page_settings = props.page_settings
    const workspace = props.editWorkspace.data
    const visibilities = props.visibilities

    console.log(props);
    
    return (
        <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-2">
                <HeaderForm title={page_settings.title} subtitle={page_settings.subtitle} />
                <EditWorkspace page_settings={page_settings} workspace={workspace} visibilities={visibilities} />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-2">
                <HeaderForm title='Members Invite' subtitle='Please add members to the card' />
                <MemberWorkspace action={route('workspaces.members.store', workspace)} member={workspace.members} />
            </div>
        </div>
    )
}

Setting.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title}/>


// import AppLayout from '@/Layouts/AppLayout'
// import React from 'react'

// export default function Setting({...props}) {
//   const editWorkspace = props.editWorkspace.data
//   const page_settings = props.page_settings
//     console.log(editWorkspace);
    
//     return (
//     <div>Setting {editWorkspace.name}</div>
//   )
// }

// Setting.layout = (page) => <AppLayout children={page} title={'Setting'} />
