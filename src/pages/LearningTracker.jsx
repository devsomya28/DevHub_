import { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, Circle, TrendingUp, Plus, Trash2, ListTodo } from 'lucide-react';

export default function LearningTracker() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dev-learning-topics');
    if (saved) {
      setTopics(JSON.parse(saved));
    } else {
      setTopics([
        { id: 1, title: 'Advanced React Patterns', completed: false },
        { id: 2, title: 'Rust for Beginners', completed: false },
        { id: 3, title: 'Tailwind Mastery', completed: true },
      ]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('dev-learning-topics', JSON.stringify(topics));
    }
  }, [topics, isLoaded]);

  const handleAddTopic = (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    
    setTopics([{ id: Date.now(), title: newTopic.trim(), completed: false }, ...topics]);
    setNewTopic('');
  };

  const toggleTopic = (id) => {
    setTopics(topics.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };
  
  const deleteTopic = (id) => {
    setTopics(topics.filter(t => t.id !== id));
  };

  const totalTopics = topics.length;
  const completedTopics = topics.filter(t => t.completed).length;
  const pendingTopics = totalTopics - completedTopics;
  const completionPercentage = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

  return (
    <div className="flex h-full flex-col space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Learning Tracker</h1>
        <p className="text-slate-400 mt-1">Keep track of your learning goals and tutorials.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-indigo-500/30 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-indigo-500/5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-400">
              <ListTodo className="h-5 w-5" />
              <h3 className="font-semibold">Total Topics</h3>
            </div>
            <TrendingUp className="h-4 w-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
          </div>
          <p className="text-4xl font-bold text-white">{totalTopics}</p>
        </div>
        
        <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-emerald-500/30 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-emerald-500/5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
              <h3 className="font-semibold">Completed</h3>
            </div>
          </div>
          <p className="text-4xl font-bold text-white">{completedTopics}</p>
        </div>
        
        <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-amber-500/30 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-amber-500/5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400">
              <BookOpen className="h-5 w-5" />
              <h3 className="font-semibold">Pending</h3>
            </div>
          </div>
          <p className="text-4xl font-bold text-white">{pendingTopics}</p>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-inner flex flex-col min-h-[400px]">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-white">Overall Progress</h2>
            <span className="text-sm font-medium text-slate-400">{completionPercentage}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleAddTopic} className="mb-6 flex gap-3">
          <input
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="What do you want to learn next?"
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
          />
          <button
            type="submit"
            disabled={!newTopic.trim()}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 shadow-lg shadow-indigo-600/20 active:scale-95 disabled:scale-100 disabled:shadow-none"
          >
            <Plus className="h-5 w-5" />
            Add Topic
          </button>
        </form>

        <div className="space-y-3 overflow-y-auto flex-1 pr-2">
          {topics.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No topics yet. Start by adding one above!
            </div>
          ) : (
            topics.map((topic) => (
              <div 
                key={topic.id} 
                className={`group flex items-center justify-between rounded-xl border p-4 transition-all ${
                  topic.completed 
                    ? 'border-slate-800/50 bg-slate-900/30 opacity-75' 
                    : 'border-slate-700 bg-slate-900 hover:border-indigo-500/30 hover:shadow-md'
                }`}
              >
                <div 
                  className="flex items-center gap-4 flex-1 cursor-pointer"
                  onClick={() => toggleTopic(topic.id)}
                >
                  <button className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors ${
                    topic.completed 
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' 
                      : 'border-slate-600 bg-slate-800 text-transparent hover:border-indigo-400'
                  }`}>
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                  <h4 className={`font-medium transition-colors ${
                    topic.completed ? 'text-slate-500 line-through' : 'text-slate-200 group-hover:text-indigo-200'
                  }`}>
                    {topic.title}
                  </h4>
                </div>
                <button 
                  onClick={() => deleteTopic(topic.id)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Delete topic"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
