// pages/LogOut.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/userSlice';
import { showNotification } from '@/store/slices/uiSlice';
import Spinner from '@/components/common/Spinner';

const LogOutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Dispatch logout action
    dispatch(logout());

    // Show success notification
    dispatch(showNotification({
      message: 'You have been logged out successfully.',
      type: 'success',
    }));

    // Redirect to homepage after logout
    router.push('/');
  }, [dispatch, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-700 text-lg">
          Logging you out...
        </p>
      </div>
    </div>
  );
};

export default LogOutPage;
