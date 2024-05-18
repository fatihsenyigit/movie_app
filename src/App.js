
import './App.css';
import AppRouter from './router/AppRouter';
import AuthProvider from './context/AuthProvider';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="dark:bg-gray-dark-main min-h-screen">
      <AuthProvider>
        <AppRouter />
        <ToastContainer/>
      </AuthProvider>
    </div>
  );
}

export default App;
