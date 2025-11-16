import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { AcudienteDashboard } from './components/AcudienteDashboard';
import { DocenteDashboard } from './components/DocenteDashboard';
import { AdministradorDashboard } from './components/AdministradorDashboard';
import { AlertasScreen } from './components/AlertasScreen';
import { NotasDetalleScreen } from './components/NotasDetalleScreen';

export type UserRole = 'acudiente' | 'docente' | 'administrador';

export interface User {
  id: string;
  nombre: string;
  rol: UserRole;
  avatar?: string;
}

export type Screen = 'login' | 'dashboard' | 'alertas' | 'notas-detalle';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedEstudianteId, setSelectedEstudianteId] = useState<string | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setSelectedEstudianteId(null);
  };

  const navigateTo = (screen: Screen, estudianteId?: string) => {
    setCurrentScreen(screen);
    if (estudianteId) {
      setSelectedEstudianteId(estudianteId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} />
      )}

      {currentScreen === 'dashboard' && currentUser?.rol === 'acudiente' && (
        <AcudienteDashboard 
          user={currentUser} 
          onLogout={handleLogout}
          onNavigate={navigateTo}
        />
      )}

      {currentScreen === 'dashboard' && currentUser?.rol === 'docente' && (
        <DocenteDashboard 
          user={currentUser} 
          onLogout={handleLogout}
          onNavigate={navigateTo}
        />
      )}

      {currentScreen === 'dashboard' && currentUser?.rol === 'administrador' && (
        <AdministradorDashboard 
          user={currentUser} 
          onLogout={handleLogout}
          onNavigate={navigateTo}
        />
      )}

      {currentScreen === 'alertas' && currentUser && (
        <AlertasScreen 
          user={currentUser}
          onNavigate={navigateTo}
        />
      )}

      {currentScreen === 'notas-detalle' && currentUser && selectedEstudianteId && (
        <NotasDetalleScreen 
          user={currentUser}
          estudianteId={selectedEstudianteId}
          onNavigate={navigateTo}
        />
      )}
    </div>
  );
}