import AnalyticsFilter from './_ui/filters';

export default function AnalyticsLayout({
  topSection,
  midSection,
  bottomSection,
}: Readonly<{
  topSection: React.ReactNode;
  midSection: React.ReactNode;
  bottomSection: React.ReactNode;
}>) {
  return (
    <main className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 md:mb-0">
          Analytics
        </h1>
        <AnalyticsFilter />
      </div>
      {topSection}
      {midSection}
      {bottomSection}
    </main>
  );
}
