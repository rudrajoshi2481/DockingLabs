import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[200px]" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-[150px]" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-[100px] mb-2" />
                <Skeleton className="h-6 w-[200px]" />
              </div>
              <div>
                <Skeleton className="h-4 w-[100px] mb-2" />
                <Skeleton className="h-6 w-[200px]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
