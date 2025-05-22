import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import CreateRecipe from './CreateRecipe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/create" element={<CreateRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;