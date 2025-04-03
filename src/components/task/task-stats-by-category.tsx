import { API_ENDPOINTS } from '@/lib/constants';
import { capitalizeFirstLetters } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function TaskStatsByCategory() {
  const [categoriesTaskCount, setCategoriesTaskCount] = useState<
    Array<{
      name: string;
      count: number;
      color: string;
    }>
  >([]);
  useEffect(() => {
    const fetchTaskStatsByCategory = async () => {
      const apiResponse = await fetch(API_ENDPOINTS.TASK.STATS_BY_CATEGORY);
      const apiResponseJson = await apiResponse.json();
      setCategoriesTaskCount(
        apiResponseJson?.data?.map(
          (x: { name: string; color: string; _count: { tasks: number } }) => ({
            name: x.name,
            count: x._count.tasks,
            color: x.color,
          }),
        ),
      );
    };

    fetchTaskStatsByCategory();
    console.log('TaskStatsByCategory');
  }, []);

  return (
    <div className="grid gap-2">
      {categoriesTaskCount.map((category) => (
        <div
          key={`${category.name}-${category.count}`}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              {capitalizeFirstLetters(category.name)}
            </span>
          </div>
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {category.count}
          </span>
        </div>
      ))}
    </div>
  );
}
