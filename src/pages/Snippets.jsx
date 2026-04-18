import { useState, useEffect } from 'react';
import { Plus, Search, Code2, Copy, Trash2, X } from 'lucide-react';

const DUMMY_SNIPPETS = [
  { id: 1, title: 'useDebounce Hook', language: 'React', code: 'const useDebounce = (value, delay) => {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n  // ... implementation\n  return debouncedValue;\n}' },
  { id: 2, title: 'CSS Grid Centering', language: 'CSS', code: '.center-container {\n  display: grid;\n  place-items: center;\n  height: 100vh;\n}' },
];

export default function Snippets() {
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', code: '', language: 'Text' });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dev-snippets');
    if (saved) {
      setSnippets(JSON.parse(saved));
    } else {
      setSnippets(DUMMY_SNIPPETS);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('dev-snippets', JSON.stringify(snippets));
    }
  }, [snippets, isLoaded]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.code.trim()) return;
    
    const newSnippet = {
      id: Date.now(),
      title: formData.title,
      code: formData.code,
      language: formData.language || 'Text'
    };
    
    setSnippets([newSnippet, ...snippets]);
    setFormData({ title: '', code: '', language: 'Text' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setSnippets(snippets.filter(s => s.id !== id));
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
  };

  const filteredSnippets = snippets.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Snippets</h1>
          <p className="text-slate-400">Save and organize your reusable code.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? 'Cancel' : 'New Snippet'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg backdrop-blur-sm transition-all">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-slate-400">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                  placeholder="e.g., Axios Fetch Interceptor"
                />
              </div>
              <div className="w-48">
                <label className="mb-1 block text-sm font-medium text-slate-400">Language</label>
                <input
                  type="text"
                  value={formData.language}
                  onChange={e => setFormData({...formData, language: e.target.value})}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                  placeholder="e.g., JavaScript"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-400">Code</label>
              <textarea
                required
                value={formData.code}
                onChange={e => setFormData({...formData, code: e.target.value})}
                className="h-40 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 font-mono text-sm text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                placeholder="Paste your code here..."
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                Save Snippet
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search snippets..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900/50 py-3.5 pl-12 pr-4 text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto pb-6">
        {filteredSnippets.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            No snippets found. Click "New Snippet" to add one!
          </div>
        ) : (
          filteredSnippets.map((snippet) => (
            <div key={snippet.id} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all hover:border-indigo-500/50 hover:bg-slate-900/80 hover:shadow-xl hover:-translate-y-1">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-xs font-medium text-indigo-400">
                    {snippet.language}
                  </span>
                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button 
                      onClick={() => handleCopy(snippet.code)}
                      title="Copy to clipboard"
                      className="rounded bg-slate-800 p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(snippet.id)}
                      title="Delete snippet"
                      className="rounded bg-slate-800 p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-indigo-400" />
                  {snippet.title}
                </h3>
              </div>
              <div className="mt-2 rounded-xl bg-slate-950 p-4 font-mono text-sm text-slate-300 border border-slate-800/50 shadow-inner overflow-x-auto whitespace-pre">
                <code>{snippet.code}</code>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
