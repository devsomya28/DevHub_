import { Bell, Shield, Palette, Github, Webhook, Zap } from 'lucide-react';

export default function Settings() {
  return (
    <div className="flex h-full flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your preferences and integrations.</p>
      </div>

      <div className="mx-auto w-full max-w-4xl space-y-8 pb-8 mt-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Palette className="h-5 w-5 text-indigo-400" />
            Appearance
          </h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-200">Theme Preference</h3>
                <p className="text-sm text-slate-500 mt-1">Select your preferred interface theme for the application.</p>
              </div>
              <select className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm cursor-pointer hover:bg-slate-700 transition-colors">
                <option>Dark Mode</option>
                <option>Light Mode</option>
                <option>System Default</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Webhook className="h-5 w-5 text-indigo-400" />
            Integrations
          </h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-1 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors rounded-xl m-1">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#24292e] text-white shadow-inner">
                  <Github className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-200">GitHub</h3>
                  <p className="text-sm text-slate-500 mt-0.5">Connect to sync your repositories and snippets.</p>
                </div>
              </div>
              <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-500 shadow-md shadow-indigo-600/20 hover:scale-105 active:scale-95">
                Connect
              </button>
            </div>
            
            <div className="h-px w-full bg-slate-800/50"></div>
            
            <div className="flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors rounded-xl m-1">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-amber-400 shadow-inner">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-200">AI Provider</h3>
                  <p className="text-sm text-slate-500 mt-0.5">Configure your preferred AI model API keys.</p>
                </div>
              </div>
              <button className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 transition-all hover:bg-slate-700 hover:text-white">
                Configure
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
