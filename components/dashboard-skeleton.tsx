import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function DashboardSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto bg-muted/50 animate-pulse">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-muted" />
        </div>
        <div className="h-8 bg-muted rounded-md mb-2" />
        <div className="h-4 bg-muted rounded-md w-3/4 mx-auto" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-muted rounded" />
            <div className="h-4 w-12 bg-muted rounded" />
          </div>
          <div className="h-4 bg-muted rounded w-full" />
        </div>

        <div className="pt-4 border-t">
          <div className="h-10 bg-muted rounded-md w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
