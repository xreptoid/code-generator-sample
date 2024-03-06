'use client';
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import HeaderAuth from './HeaderAuth'
import { Fira_Code } from 'next/font/google';
import './header.css'

const firaCode = Fira_Code({ subsets: ['latin'], weight: '500' })

export default function Header({ username, currentUser, projectName, page }) {

  const renderDashboardNav = () => {
    return <div className="inline-block">
      <div className='inline-block ml-20'>|</div>
      <Link
        href="/dashboard"
        className="ml-10 font-bold"
      >Dashboard</Link>
    </div>
  }

  return <div className="main-header">
    <span>
      <a
        href="/"
        className={cn(firaCode.className, 'underline black')}
        style={{
          fontSize: '15pt',
          fontWeight: '500',
          color: '#000'
        }}
      >
        Sample AI Code Generator
      </a>
    </span>
    {renderDashboardNav()}
    <div className='inline-block align-middle float-right'>
      <div className='inline-block ml-5 align-top'>
          <HeaderAuth {...{username, currentUser, page}}/>
      </div>
    </div>
  </div>
}