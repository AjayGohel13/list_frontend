import './App.css'
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/Home';
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path='/'
            element={<HomePage />} />
        </Routes>

      </QueryClientProvider>
    </>
  )
}

export default App
