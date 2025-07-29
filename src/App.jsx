import Dashboard from './pages/Dashboard';
import { Provider, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function App() {
  const { currentRole } = useSelector(state => state.role);

  useEffect(() => {
    document.body.classList.toggle('dark', localStorage.getItem('theme') === 'dark');
  }, []);

  return (
    
    <div className="">
      <Dashboard />
    </div>
  
  );
}
    