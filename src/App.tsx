import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from "./pages/Home";
import SignUpForm from './pages/SignUp';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute, { PublicOnlyRoute } from './components/protected';

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route
          path='/sign-in'
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>

          }

        />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>

          } />
        <Route
          path='/sign-up'
          element={
            <PublicOnlyRoute>
              <SignUpForm />
            </PublicOnlyRoute>
          } />
      </Routes>
    </>
  )
}

export default App
