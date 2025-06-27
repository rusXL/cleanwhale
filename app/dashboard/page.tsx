'use client';

import { User, UserDashboard } from '@/components/user-dashboard';
import { DashboardSkeleton } from '@/components/dashboard-skeleton';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include', // include cookies
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // redirect to login
          setUser(null);
          router.push('/login');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setUser(null);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return null; // will redirect to login
  }

  return <UserDashboard user={user} setUser={setUser} />;
}
