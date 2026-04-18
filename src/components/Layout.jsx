import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5"></div>
        <div className="h-full w-full max-w-6xl mx-auto p-8 relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
