import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthCallback from './pages/AuthCallback';
import DashboardLayout from './pages/DashboardLayout';
import ResumeBuilder from './pages/dashboard/ResumeBuilder';
import ResumeTemplates from './pages/dashboard/ResumeTemplates';
import TemplateEditor from './pages/dashboard/TemplateEditor';
import Downloads from './pages/dashboard/Downloads';
import Profile from './pages/dashboard/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Email verification callback */}
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Protected dashboard — requires auth */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/app/builder" replace />} />
            <Route path="builder" element={<ResumeBuilder />} />
            <Route path="templates" element={<ResumeTemplates />} />
            <Route path="template-editor/:templateId" element={<TemplateEditor />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
