'use client';
import Link from "next/link";
import './header.css'
import Image from "next/image";

export default function HeaderAuth(props) {
  const { page, currentUser } = props
  if (page === 'auth') {
    return <></>
  }

  if (currentUser) {
    return <div>
      <b className="align-middle">{currentUser.username}</b>
      <div style={{ display: 'inline-block', marginLeft: '4px', verticalAlign: 'middle' }}>
        <a href="/auth/logout" className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg>
        </a>
      </div>
    </div>
  }

  return <div>
    <a
        className="border border-black hover:border-slate-500 px-4 py-3"
        href={`https://github.com/login/oauth/authorize?client_id=Iv1.a2c320658203d1e8`}
    >
        <Image className="inline-block" src="/github-mark.svg" width={24} height={24} alt=""/>
        <div className="inline-block align-middle ml-2 font-bold">
            Sign In
        </div>
    </a>
  </div>
}
