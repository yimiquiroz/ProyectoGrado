import { useState } from 'react';
import { User, UserRole } from '../App';
import { Button } from './ui/button';
import { GraduationCap, Users, Shield, ChevronRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles = [
    {
      id: 'acudiente' as UserRole,
      nombre: 'Acudiente',
      descripcion: 'Padres y representantes',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      id: 'docente' as UserRole,
      nombre: 'Docente',
      descripcion: 'Profesores y educadores',
      icon: GraduationCap,
      color: 'bg-green-500',
    },
    {
      id: 'administrador' as UserRole,
      nombre: 'Administrador',
      descripcion: 'Gestión del sistema',
      icon: Shield,
      color: 'bg-purple-500',
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleLogin = () => {
    if (!selectedRole) return;

    // Mock login - En producción esto se conectaría con un backend
    const mockUsers = {
      acudiente: { id: '1', nombre: 'María González', rol: 'acudiente' as UserRole },
      docente: { id: '2', nombre: 'Prof. Carlos Ruiz', rol: 'docente' as UserRole },
      administrador: { id: '3', nombre: 'Admin Sistema', rol: 'administrador' as UserRole },
    };

    onLogin(mockUsers[selectedRole]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-8 px-6 text-center">
        <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
          <GraduationCap className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-white mb-2">SIGE-Móvil</h1>
        <p className="text-blue-100">Sistema de Información para Gestión Educativa</p>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white rounded-t-3xl px-6 py-8">
        {!selectedRole ? (
          <div>
            <h2 className="mb-2">Selecciona tu perfil</h2>
            <p className="text-gray-600 mb-6">Elige el tipo de usuario para acceder al sistema</p>

            <div className="space-y-4">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className="w-full flex items-center gap-4 p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    <div className={`w-14 h-14 ${role.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-gray-900">{role.nombre}</h3>
                      <p className="text-gray-500">{role.descripcion}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedRole(null)}
              className="text-blue-600 mb-6 flex items-center gap-2"
            >
              ← Volver
            </button>

            <div className="mb-8">
              <h2 className="mb-2">Iniciar Sesión</h2>
              <p className="text-gray-600">
                {roles.find(r => r.id === selectedRole)?.nombre}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Usuario o Correo</label>
                <input
                  type="text"
                  placeholder="Ingresa tu usuario"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={selectedRole === 'acudiente' ? 'mgonzalez' : selectedRole === 'docente' ? 'cruiz' : 'admin'}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue="demo123"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">Recordarme</span>
                </label>
                <button className="text-blue-600">¿Olvidaste tu contraseña?</button>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full py-6 rounded-xl"
            >
              Ingresar
            </Button>

            <p className="text-center text-gray-500 mt-6">
              Al ingresar aceptas los términos y condiciones
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
