import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskList } from "./task-list";

export default function TaskListCard({
    cardTitle,
    filter
}: Readonly<{
    cardTitle: string
    filter?: "all" | "today" | "upcoming" | "completed"
}>) {
    return (
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
            <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">
                    {cardTitle}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <TaskList filter={filter} />
            </CardContent>
        </Card>
    );
}