'use client'

import Image from 'next/image';
import home1 from '@/assets/home1.svg'
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Home() {

  const notify = () => {
    toast.success('hello',{duration:5000})
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-24 py-24 bg-white">

      <header className=' absolute top-0 left-0 ring-0 h-20 px-10 w-full flex items-center justify-between bg-rose-2000'>

          <Link href={'/'} onClick={notify} className='px-3 py-2 rounded text-xl font-semibold text-indigo-600 bg-white hover:bg-indigo-700 hover:text-white transition-all duration-300 active:scale-95'>Home</Link>
          <Link href={'/profile'} className='px-3 py-2 rounded text-xl font-semibold text-indigo-600 bg-white hover:bg-indigo-600 hover:text-white transition-colors duration-300'>Profile</Link>

      </header>

      <Image src={home1} alt="home1" priority className=' h-96 w-fit'/>

    </main>
  );
}
