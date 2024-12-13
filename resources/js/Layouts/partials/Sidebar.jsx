import React from 'react'
import { PiHouse, PiLockKeyOpen, PiPlus, PiSquaresFour, PiUsers } from 'react-icons/pi';
import { Link } from '@inertiajs/react';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { cn } from '@/lib/utils';

const Sidebar = ({ auth, url }) => {

    const styleDashboard = url.url == '/dashboard' ?
        'text-foreground bg-red-500 group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-realaxed tracking-tighter text-white' :
        'text-foreground hover:bg-gray-100 group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-realaxed tracking-tighter'

    const styleUser = url.url == '/users' ?
        'text-foreground bg-red-500 group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-realaxed tracking-tighter text-white' :
        'text-foreground hover:bg-gray-100 group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-realaxed tracking-tighter'

    const styleTask = url.url == '/task' ?
        'text-foreground bg-red-500 group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-realaxed tracking-tighter text-white' :
        'text-foreground hover:bg-gray-100 group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-realaxed tracking-tighter'

    return (
        <nav className="flex flex-col flex-1">
            <ul role="list" className="flex flex-col flex-1 gap-y-7">
                <li>
                    <ul role="list" className="-mx-2 space-y-2">
                        {/* menu */}
                        <li>
                            <Link
                                href={route('dashboard')}
                                className={cn(styleDashboard)}>
                                <PiHouse className="w-6 h-6 text-foreground shrink-0" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('users')}
                                className={cn(styleUser)}>
                                <PiUsers className="w-6 h-6 text-foreground shrink-0" />
                                People
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('task')}
                                className={cn(styleTask)}>
                                <PiSquaresFour className="w-6 h-6 text-foreground shrink-0" />
                                My Task
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('logout')}
                                method="post"
                                className='flex p-3 text-sm font-semibold leading-realaxed tracking-tighter rounded-md text-foreground hover:bg-gray-100 group gap-x-3'>
                                <PiLockKeyOpen className="w-6 h-6 text-foreground shrink-0" />
                                Logout
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    {/* workspaces */}
                    <div className='flex items-center justify-between'>
                        <div className='text-xs font-semibold leading-relaxed uppercase text-foreground'>
                            Workspaces
                        </div>
                        <Link>
                            <PiPlus className="w-4 h-4 text-foreground hover:text-red-500" />
                        </Link>
                    </div>
                    <ul role='list' className='mt-2 -mx-2 space-y-2'>
                        <li>
                            <Link href='#' className='flex w-full p-3 text-sm font-semibold leading-relaxed rounded-md text-card-foreground hover: bg-gray-100 group gap-x-3'>
                                <span className='border-foreground text-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-lh border bg-white text-[0.65rem] font-medium'>B</span>
                                <span className='truncate'>Backend Developer</span>
                            </Link>
                        </li>
                    </ul>
                    {/* workspaces */}
                </li>
                <li className="mt-auto -mx-6">
                    {/* profile */}
                    <Link
                        href='#'
                        className='flex items-center px-6 py-3 text-sm font-semibold leading-relaxed gap-x-4 text-foreground hover:bg-gray-100'
                    >
                        <Avatar>
                            <AvatarFallback>X</AvatarFallback>
                        </Avatar>
                        <span>{auth.user && auth.user.name}</span>
                    </Link>
                    {/* profile */}
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar