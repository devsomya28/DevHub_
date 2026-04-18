import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Bot, Code2, GraduationCap, Settings, Menu, X } from 'lucide-react';

const navigation = [
  { name: 'AI Helper', to: '/ai-helper', icon: Bot },
  { name: 'Snippets', to: '/snippets', icon: Code2 },
  { name: 'Learning Tracker', to: '/learning-tracker', icon: GraduationCap },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full w-64 flex-col border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl shrink-0">
        <div className="flex h-16 items-center gap-2 px-6 shrink-0">
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

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between h-14 px-4 border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl shrink-0 w-full z-30">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-white font-semibold tracking-tight">DevHub</span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 w-64 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-[slideIn_0.2s_ease-out_forwards]">
            <div className="flex h-14 items-center justify-between px-4 border-b border-slate-800/50 shrink-0">
              <span className="font-semibold text-white">Menu</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 text-slate-400 hover:text-white transition-colors focus:outline-none rounded-lg"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex flex-1 flex-col justify-between overflow-y-auto px-4 py-6">
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium transition-all duration-200 ease-in-out ${
                        isActive
                          ? 'bg-indigo-500/10 text-indigo-400'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-8">
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium transition-all duration-200 ease-in-out ${
                      isActive
                        ? 'bg-indigo-500/10 text-indigo-400'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }`
                  }
                >
                  <Settings className="h-5 w-5 flex-shrink-0" />
                  Settings
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </>
  );
}