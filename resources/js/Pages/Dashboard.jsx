import AppLayout from '@/Layouts/AppLayout'
import React from 'react'

export default function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}


Dashboard.layout = (page) => <AppLayout children={page} title={'Dashboard'} />