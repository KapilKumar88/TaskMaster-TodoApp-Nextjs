import { auth } from '@/auth';
import { Input } from '@/components/ui/input';

export default async function EmailAddress() {
  const userSession = await auth();
  return (
    <div>
      <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
        Email Address
      </h3>
      <div className="flex gap-2 flex-col sm:flex-row">
        <Input
          value={userSession?.user?.email ?? ''}
          className="bg-white/40 border-white/30 text-slate-900 dark:text-white flex-1"
          disabled
        />
      </div>
    </div>
  );
}
