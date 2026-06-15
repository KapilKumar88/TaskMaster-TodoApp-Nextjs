'use client';

export default function DashboardError({ error }: Readonly<{ error: Error }>) {
  return <h1>{error?.message ?? 'Error page'}</h1>;
}
