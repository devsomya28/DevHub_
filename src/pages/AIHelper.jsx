import { useState } from 'react';
import { Send, Bot, Copy, Sparkles, Loader2, Check, Key, AlertCircle } from 'lucide-react';

const ENV_API_KEY = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY || '';

export default function AIHelper() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_api_key') || ENV_API_KEY);
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);

  const saveApiKey = () => {
    localStorage.setItem('groq_api_key', apiKey);
    if (apiKey.trim()) {
      setShowKeyInput(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    
    if (!apiKey.trim()) {
      setShowKeyInput(true);
      return;
    }
    
    setIsLoading(true);
    setResponse(null);
    setError(null);
    setIsCopied(false);

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error?.message || 'Failed to fetch response from Groq');
      }

      setResponse(data.choices[0].message.content);
      setPrompt('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopyCode = (code, e) => {
    navigator.clipboard.writeText(code);
    const btn = e.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied`;
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 2000);
  };

  const renderResponse = (text) => {
    if (!text) return null;
    // Split by markdown code blocks
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        const language = match?.[1] || 'Code';
        const code = match?.[2] || part.replace(/```/g, '');
        
        return (
          <div key={index} className="group relative rounded-xl border border-slate-800 bg-slate-950 shadow-inner my-6 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 bg-slate-900/50">
              <span className="text-xs font-medium text-slate-500 capitalize">{language}</span>
              <button 
                onClick={(e) => handleCopyCode(code, e)}
                className="flex items-center gap-1.5 rounded text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy
              </button>
            </div>
            <pre className="overflow-x-auto p-4 text-sm font-mono text-slate-300">
              <code>{code}</code>
            </pre>
          </div>
        );
      }
      return (
        <p key={index} className="text-slate-300 leading-relaxed whitespace-pre-wrap">
          {part}
        </p>
      );
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-3 md:px-6 py-4">
      <div className="w-full max-w-3xl space-y-6 md:space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-inner">
            <Sparkles className="h-8 w-8 text-indigo-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">AI Assistant</h1>
          <p className="mt-2 text-slate-400">Describe what you want to build or ask a coding question.</p>
        </div>
        
        {showKeyInput && (
          <div className="overflow-hidden rounded-2xl border border-amber-500/20 bg-amber-500/5 shadow-lg animate-[fadeIn_0.3s_ease-out_forwards]">
            <div className="bg-amber-500/10 px-6 py-4 flex items-center gap-3 border-b border-amber-500/10">
              <Key className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium text-amber-500">Groq API Key Required</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-400 mb-4">Your API key is stored locally in your browser and never sent anywhere else.</p>
              <div className="flex gap-3">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="gsk_..."
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-inner"
                />
                <button
                  onClick={saveApiKey}
                  className="rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-medium text-amber-950 transition-colors hover:bg-amber-400 shadow-lg shadow-amber-500/20"
                >
                  Save Key
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-sm transition-all focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., Write a custom React hook for debouncing search inputs..."
            className="h-28 md:h-32 w-full resize-none ... bg-transparent p-6 text-slate-200 placeholder:text-slate-500 focus:outline-none"
            disabled={isLoading || showKeyInput}
          />
          <div className="flex items-center justify-between border-t border-slate-800/50 bg-slate-900/80 px-4 py-3">
            <span className="text-xs text-slate-500">
              {prompt.length} characters
            </span>
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading || showKeyInput}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 shadow-lg shadow-indigo-600/20 active:scale-95 disabled:scale-100 disabled:shadow-none"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {isLoading ? 'Thinking...' : 'Ask AI'}
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
              <Bot className="h-8 w-8 text-indigo-400 animate-pulse" />
            </div>
            <p className="text-sm font-medium text-slate-400 animate-pulse">Generating response...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/5 p-6 shadow-lg animate-[fadeIn_0.5s_ease-out_forwards] flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-400 mb-1">Error</h3>
              <p className="text-sm text-red-300/80 leading-relaxed">{error}</p>
              <button 
                onClick={() => setShowKeyInput(true)}
                className="mt-3 text-sm font-medium text-red-400 hover:text-red-300 underline underline-offset-4"
              >
                Check API Key
              </button>
            </div>
          </div>
        )}

        {response && !isLoading && !error && (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-sm opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
                  <Bot className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white">Response</h3>
              </div>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
              >
                {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {isCopied ? 'Copied All' : 'Copy Full Response'}
              </button>
            </div>
            
            <div className="p-4 md:p-6">
              <div className="text-slate-300 leading-relaxed space-y-4">
                {renderResponse(response)}
              </div>
            </div>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
