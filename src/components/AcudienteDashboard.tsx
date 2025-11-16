import { User, Screen } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Bell, 
  LogOut, 
  User as UserIcon, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight
} from 'lucide-react';

interface AcudienteDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (screen: Screen, estudianteId?: string) => void;
}

// Mock data
const estudiantes = [
  {
    id: 'est1',
    nombre: 'Ana González',
    grado: '5° Primaria',
    seccion: 'A',
    foto: 'AG',
  },
];

const resumenAcademico = {
  promedio: 4.2,
  asistencia: 95,
  materiasPendientes: 1,
  proximoExamen: 'Matemáticas - 18 Nov',
};

const notasRecientes = [
  { materia: 'Matemáticas', nota: 4.5, fecha: '10 Nov', color: 'text-green-600' },
  { materia: 'Español', nota: 4.0, fecha: '08 Nov', color: 'text-blue-600' },
  { materia: 'Ciencias', nota: 3.8, fecha: '05 Nov', color: 'text-orange-600' },
];

const alertasRecientes = [
  { id: '1', tipo: 'info', titulo: 'Reunión de padres', fecha: '2 horas', leido: false },
  { id: '2', tipo: 'warning', titulo: 'Tarea pendiente: Matemáticas', fecha: '1 día', leido: false },
  { id: '3', tipo: 'success', titulo: 'Pago procesado correctamente', fecha: '2 días', leido: true },
];

export function AcudienteDashboard({ user, onLogout, onNavigate }: AcudienteDashboardProps) {
  const alertasNoLeidas = alertasRecientes.filter(a => !a.leido).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 pt-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-white">
              <AvatarFallback className="bg-blue-500 text-white">
                {user.nombre.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-blue-100">Bienvenido/a</p>
              <h2 className="text-white">{user.nombre}</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onNavigate('alertas')}
              className="relative w-11 h-11 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Bell className="w-5 h-5 text-white" />
              {alertasNoLeidas > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  {alertasNoLeidas}
                </span>
              )}
            </button>
            <button 
              onClick={onLogout}
              className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Estudiante Card */}
        <Card className="bg-white p-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-blue-100">
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                {estudiantes[0].foto}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-gray-900">{estudiantes[0].nombre}</h3>
              <p className="text-gray-600">{estudiantes[0].grado} - Sección {estudiantes[0].seccion}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Resumen Académico */}
        <div>
          <h3 className="text-gray-900 mb-4">Resumen Académico</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <p className="text-green-700">Promedio</p>
              </div>
              <p className="text-green-900">{resumenAcademico.promedio}</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <p className="text-blue-700">Asistencia</p>
              </div>
              <p className="text-blue-900">{resumenAcademico.asistencia}%</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <p className="text-orange-700">Pendientes</p>
              </div>
              <p className="text-orange-900">{resumenAcademico.materiasPendientes}</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <p className="text-purple-700">Próximo</p>
              </div>
              <p className="text-purple-900">18 Nov</p>
            </Card>
          </div>
        </div>

        {/* Notas Recientes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Notas Recientes</h3>
            <button 
              onClick={() => onNavigate('notas-detalle', estudiantes[0].id)}
              className="text-blue-600 flex items-center gap-1"
            >
              Ver todo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {notasRecientes.map((nota, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">{nota.materia}</p>
                      <p className="text-gray-500">{nota.fecha}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={nota.color}>{nota.nota.toFixed(1)}</p>
                    <p className="text-gray-400">/ 5.0</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Alertas y Notificaciones */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Notificaciones</h3>
            <button 
              onClick={() => onNavigate('alertas')}
              className="text-blue-600 flex items-center gap-1"
            >
              Ver todas
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {alertasRecientes.slice(0, 3).map((alerta) => (
              <Card key={alerta.id} className={`p-4 ${!alerta.leido ? 'bg-blue-50 border-blue-200' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    alerta.tipo === 'info' ? 'bg-blue-100' :
                    alerta.tipo === 'warning' ? 'bg-orange-100' :
                    'bg-green-100'
                  }`}>
                    {alerta.tipo === 'info' && <Bell className="w-5 h-5 text-blue-600" />}
                    {alerta.tipo === 'warning' && <AlertCircle className="w-5 h-5 text-orange-600" />}
                    {alerta.tipo === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{alerta.titulo}</p>
                    <p className="text-gray-500">Hace {alerta.fecha}</p>
                  </div>
                  {!alerta.leido && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
