import { NavLink } from 'react-router-dom';
import { Bot, Code2, GraduationCap, Settings } from 'lucide-react';

const navigation = [
  { name: 'AI Helper', to: '/ai-helper', icon: Bot },
  { name: 'Snippets', to: '/snippets', icon: Code2 },
  { name: 'Learning Tracker', to: '/learning-tracker', icon: GraduationCap },
];

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full w-64 flex-col border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-2 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            DevHub
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-4 py-4">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out ${
                  isActive
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`
              }
            >
              <Settings className="h-5 w-5 flex-shrink-0 transition-transform group-hover:rotate-45 group-hover:scale-110" />
              Settings
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar (simple fallback so sidebar is not “invisible”) */}
      <div className="md:hidden flex items-center gap-2 h-14 px-4 border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
          <Code2 className="h-5 w-5 text-white" />
        </div>
        <span className="text-white font-semibold">DevHub</span>
      </div>
    </>
  );
}