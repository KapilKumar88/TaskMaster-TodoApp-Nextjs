import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Default() {
  return (
    <div className="grid gap-4 md:gap-6 mt-4 md:mt-6 grid-cols-1 md:grid-cols-2">
      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>{/* <WeeklyProgressChart /> */}</CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Productivity by Day
          </CardTitle>
        </CardHeader>
        <CardContent>{/* <ProductivityChart /> */}</CardContent>
      </Card>
    </div>
  );
}
