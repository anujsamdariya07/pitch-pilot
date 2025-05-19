import { onAuthenticatedUser } from '@/actions/auth';
import Header from '@/components/ReusableComponents/LayoutComponents/Header';
import Sidebar from '@/components/ReusableComponents/LayoutComponents/Sidebar';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  // Auth check
  const userExists = await onAuthenticatedUser();

  if (!userExists.user) {
    redirect('/sign-in');
  }

  // Note: THe layout only renders once, even if the usr signs out
  // SO we have to hold auth checks seperately everywhere to make sure that the session is handled correctly

  return (
    <div className='flex w-full min-h-screen'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}

      <div className='flex flex-col w-full h-screen overflow-auto px-4 scrollbar-hide container mx-auto gap-10'>
        {/* HEADER */}
        <Header user={userExists.user} />

        {children}
      </div>
    </div>
  );
};

export default Layout;
