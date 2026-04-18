import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AIHelper from './pages/AIHelper';
import Snippets from './pages/Snippets';
import LearningTracker from './pages/LearningTracker';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/ai-helper" replace />} />
        <Route path="ai-helper" element={<AIHelper />} />
        <Route path="snippets" element={<Snippets />} />
        <Route path="learning-tracker" element={<LearningTracker />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
