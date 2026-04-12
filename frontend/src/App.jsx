import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import PropertiesDashboard from './pages/PropertiesDashboard';
import AddPropertyPage from './pages/AddPropertyPage';
import { useUser } from './contexts/auth-context';

export default function App() {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/properties/:id" element={<PropertyDetailsPage />} />
      
      {/* Protected Routes for Owners */}
      <Route 
        path="/manage/properties" 
        element={user ? <PropertiesDashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/manage/properties/new" 
        element={user ? <AddPropertyPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/manage/properties/edit/:id" 
        element={user ? <AddPropertyPage /> : <Navigate to="/login" />} 
      />

      {/* Fallback */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

