import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useTaskContext } from '@/contextApis/task';
import { useState } from 'react';

export default function SearchInput() {
  const { setSearchText } = useTaskContext();
  const [queryText, setQueryText] = useState('');
  return (
    <div className="relative w-full sm:w-auto">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
      <Input
        type="search"
        placeholder="Search tasks..."
        value={queryText}
        onChange={(e) => {
          setQueryText(e.target.value);
          if (e.target.value?.length === 0) {
            setSearchText(null);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setSearchText(queryText);
          }
        }}
        className="w-full sm:w-64 pl-8 bg-white/40 border-white/30 text-slate-900 dark:text-white"
      />
    </div>
  );
}
