import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type User = { name: string; email: string };

export function UserDashboard({ user, setUser }: { user: User; setUser: (user: null) => void }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // this will try to clear the cookie server-side
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setUser(null);
      router.push('login');

      setIsLoggingOut(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg font-semibold">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-2xl">Hello, {user.name}!</CardTitle>
        <CardDescription>Welcome back to your dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Email</span>
          </div>
          <p className="text-sm font-medium">{user.email}</p>
        </div>

        <div className="pt-4 border-t">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full bg-transparent cursor-pointer"
            disabled={isLoggingOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
