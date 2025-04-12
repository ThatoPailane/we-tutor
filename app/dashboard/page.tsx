'use client'

import React from 'react'
import Dashboard from '@/components/students/dashboard'

const DashboardPage = () => {
  return (
    <div className="dashboard-page-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-body">
          <Dashboard />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
