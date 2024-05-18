
import './App.css';
import AppRouter from './router/AppRouter';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <div className="dark:bg-gray-dark-main min-h-screen">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
