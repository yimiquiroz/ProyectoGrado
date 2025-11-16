import { useState } from 'react';
import { User, Screen } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Bell, 
  LogOut, 
  Users, 
  GraduationCap,
  BookOpen,
  BarChart3,
  Settings,
  TrendingUp,
  UserPlus,
  Search,
  Filter,
  Download,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  UserCheck,
  FileText,
  Plus,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';

interface AdministradorDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (screen: Screen) => void;
}

// Mock data
const estadisticasGenerales = {
  totalEstudiantes: 487,
  totalDocentes: 42,
  totalAcudientes: 389,
  cursosActivos: 18,
  promedioGeneral: 4.1,
  asistenciaPromedio: 92,
  pagosAlDia: 85,
  alertasPendientes: 23,
};

const cursosData = [
  { id: '1', nombre: '1° Primaria A', estudiantes: 28, docente: 'Prof. Ana López', promedio: 4.3 },
  { id: '2', nombre: '2° Primaria A', estudiantes: 25, docente: 'Prof. María García', promedio: 4.1 },
  { id: '3', nombre: '3° Primaria A', estudiantes: 27, docente: 'Prof. Juan Pérez', promedio: 3.9 },
  { id: '4', nombre: '4° Primaria A', estudiantes: 26, docente: 'Prof. Laura Martínez', promedio: 4.2 },
  { id: '5', nombre: '5° Primaria A', estudiantes: 25, docente: 'Prof. Carlos Ruiz', promedio: 4.0 },
  { id: '6', nombre: '5° Primaria B', estudiantes: 23, docente: 'Prof. Carlos Ruiz', promedio: 3.8 },
];

const docentesData = [
  { id: '1', nombre: 'Carlos Ruiz', materias: 2, cursos: 2, estudiantes: 48, estado: 'activo' },
  { id: '2', nombre: 'Ana López', materias: 1, cursos: 1, estudiantes: 28, estado: 'activo' },
  { id: '3', nombre: 'María García', materias: 1, cursos: 1, estudiantes: 25, estado: 'activo' },
  { id: '4', nombre: 'Juan Pérez', materias: 1, cursos: 1, estudiantes: 27, estado: 'activo' },
  { id: '5', nombre: 'Laura Martínez', materias: 1, cursos: 1, estudiantes: 26, estado: 'vacaciones' },
];

const estudiantesRecientes = [
  { id: '1', nombre: 'Ana González', grado: '5° A', acudiente: 'María González', estado: 'activo', pagos: 'al día' },
  { id: '2', nombre: 'Carlos Pérez', grado: '4° A', acudiente: 'Pedro Pérez', estado: 'activo', pagos: 'pendiente' },
  { id: '3', nombre: 'María Rodríguez', grado: '5° B', acudiente: 'Carmen Rodríguez', estado: 'activo', pagos: 'al día' },
  { id: '4', nombre: 'Juan Martínez', grado: '3° A', acudiente: 'Luis Martínez', estado: 'activo', pagos: 'al día' },
  { id: '5', nombre: 'Laura Sánchez', grado: '5° A', acudiente: 'Rosa Sánchez', estado: 'activo', pagos: 'pendiente' },
];

const reportesPendientes = [
  { id: '1', tipo: 'Académico', titulo: 'Reporte trimestral - Período 4', fecha: '20 Nov 2024' },
  { id: '2', tipo: 'Financiero', titulo: 'Informe de pagos - Noviembre', fecha: '30 Nov 2024' },
  { id: '3', tipo: 'Asistencia', titulo: 'Consolidado de asistencia', fecha: '25 Nov 2024' },
];

export function AdministradorDashboard({ user, onLogout, onNavigate }: AdministradorDashboardProps) {
  const [mostrarNuevoUsuario, setMostrarNuevoUsuario] = useState(false);
  const [tipoUsuarioNuevo, setTipoUsuarioNuevo] = useState<'estudiante' | 'docente' | 'acudiente'>('estudiante');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 pt-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-white">
              <AvatarFallback className="bg-purple-500 text-white">
                {user.nombre.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-purple-100">Administrador</p>
              <h2 className="text-white">{user.nombre}</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onNavigate('alertas')}
              className="relative w-11 h-11 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Bell className="w-5 h-5 text-white" />
              {estadisticasGenerales.alertasPendientes > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  {estadisticasGenerales.alertasPendientes}
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

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2">
          <Card className="p-3 text-center bg-white/95">
            <Users className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <p className="text-purple-900">{estadisticasGenerales.totalEstudiantes}</p>
            <p className="text-purple-600 text-xs">Estudiantes</p>
          </Card>
          <Card className="p-3 text-center bg-white/95">
            <GraduationCap className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-blue-900">{estadisticasGenerales.totalDocentes}</p>
            <p className="text-blue-600 text-xs">Docentes</p>
          </Card>
          <Card className="p-3 text-center bg-white/95">
            <BookOpen className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-green-900">{estadisticasGenerales.cursosActivos}</p>
            <p className="text-green-600 text-xs">Cursos</p>
          </Card>
          <Card className="p-3 text-center bg-white/95">
            <TrendingUp className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <p className="text-orange-900">{estadisticasGenerales.promedioGeneral}</p>
            <p className="text-orange-600 text-xs">Promedio</p>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
            <TabsTrigger value="cursos">Cursos</TabsTrigger>
            <TabsTrigger value="reportes">Reportes</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6 mt-0">
            {/* Indicadores Clave */}
            <div>
              <h3 className="text-gray-900 mb-4">Indicadores Clave</h3>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="w-5 h-5 text-green-600" />
                    <p className="text-green-700">Asistencia</p>
                  </div>
                  <p className="text-green-900">{estadisticasGenerales.asistenciaPromedio}%</p>
                  <p className="text-green-600">Promedio general</p>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <p className="text-blue-700">Pagos</p>
                  </div>
                  <p className="text-blue-900">{estadisticasGenerales.pagosAlDia}%</p>
                  <p className="text-blue-600">Al día</p>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <p className="text-orange-700">Alertas</p>
                  </div>
                  <p className="text-orange-900">{estadisticasGenerales.alertasPendientes}</p>
                  <p className="text-orange-600">Pendientes</p>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <p className="text-purple-700">Acudientes</p>
                  </div>
                  <p className="text-purple-900">{estadisticasGenerales.totalAcudientes}</p>
                  <p className="text-purple-600">Registrados</p>
                </Card>
              </div>
            </div>

            {/* Actividad Reciente */}
            <div>
              <h3 className="text-gray-900 mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">Nuevo estudiante registrado</p>
                      <p className="text-gray-500">Pedro Gómez - 3° B • Hace 1 hora</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">Reporte académico generado</p>
                      <p className="text-gray-500">Período 4 - 5° Primaria • Hace 3 horas</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">Pago registrado</p>
                      <p className="text-gray-500">12 pagos procesados • Hoy</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Reportes Pendientes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Reportes Pendientes</h3>
                <Button variant="outline" size="sm">
                  Ver todos
                </Button>
              </div>
              <div className="space-y-3">
                {reportesPendientes.map((reporte) => (
                  <Card key={reporte.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-gray-900">{reporte.titulo}</p>
                          <p className="text-gray-500">Vence: {reporte.fecha}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{reporte.tipo}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Usuarios Tab */}
          <TabsContent value="usuarios" className="space-y-4 mt-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Gestión de Usuarios</h3>
              <Button size="sm" onClick={() => setMostrarNuevoUsuario(!mostrarNuevoUsuario)}>
                <UserPlus className="w-4 h-4 mr-1" />
                Nuevo
              </Button>
            </div>

            {mostrarNuevoUsuario && (
              <Card className="p-4 bg-purple-50 border-purple-200">
                <h4 className="text-gray-900 mb-3">Registrar Nuevo Usuario</h4>
                <div className="space-y-3">
                  <select 
                    value={tipoUsuarioNuevo}
                    onChange={(e) => setTipoUsuarioNuevo(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="estudiante">Estudiante</option>
                    <option value="docente">Docente</option>
                    <option value="acudiente">Acudiente</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {tipoUsuarioNuevo === 'estudiante' && (
                    <>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>Seleccionar curso</option>
                        {cursosData.map(c => <option key={c.id}>{c.nombre}</option>)}
                      </select>
                      <input
                        type="text"
                        placeholder="Nombre del acudiente"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setMostrarNuevoUsuario(false)}>
                      Cancelar
                    </Button>
                    <Button className="flex-1">
                      Registrar
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Lista de Estudiantes Recientes */}
            <div>
              <h4 className="text-gray-700 mb-3">Estudiantes Recientes</h4>
              <div className="space-y-2">
                {estudiantesRecientes.map((estudiante) => (
                  <Card key={estudiante.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                            {estudiante.nombre.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-gray-900">{estudiante.nombre}</p>
                          <p className="text-gray-500">{estudiante.grado} • {estudiante.acudiente}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={estudiante.pagos === 'al día' ? 'default' : 'destructive'}>
                          {estudiante.pagos}
                        </Badge>
                        <button className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Lista de Docentes */}
            <div>
              <h4 className="text-gray-700 mb-3">Docentes</h4>
              <div className="space-y-2">
                {docentesData.map((docente) => (
                  <Card key={docente.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-xs">
                            {docente.nombre.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-gray-900">{docente.nombre}</p>
                          <p className="text-gray-500">{docente.cursos} cursos • {docente.estudiantes} estudiantes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={docente.estado === 'activo' ? 'default' : 'outline'}>
                          {docente.estado}
                        </Badge>
                        <button className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Cursos Tab */}
          <TabsContent value="cursos" className="space-y-4 mt-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Gestión de Cursos</h3>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Nuevo Curso
              </Button>
            </div>

            <div className="space-y-3">
              {cursosData.map((curso) => (
                <Card key={curso.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-gray-900">{curso.nombre}</p>
                      <p className="text-gray-500">{curso.docente}</p>
                    </div>
                    <button className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <p className="text-gray-500">Estudiantes</p>
                      <p className="text-gray-900">{curso.estudiantes}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Promedio</p>
                      <p className={`${
                        curso.promedio >= 4.0 ? 'text-green-600' :
                        curso.promedio >= 3.5 ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {curso.promedio.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Estado</p>
                      <Badge variant="default" className="text-xs">Activo</Badge>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        curso.promedio >= 4.0 ? 'bg-green-500' :
                        curso.promedio >= 3.5 ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${(curso.promedio / 5.0) * 100}%` }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reportes Tab */}
          <TabsContent value="reportes" className="space-y-4 mt-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Reportes y Estadísticas</h3>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-1" />
                Exportar
              </Button>
            </div>

            {/* Tipos de Reportes */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-gray-900 mb-1">Reporte Académico</p>
                <p className="text-gray-500">Notas y promedios</p>
              </Card>

              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-gray-900 mb-1">Asistencia</p>
                <p className="text-gray-500">Consolidado general</p>
              </Card>

              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-gray-900 mb-1">Financiero</p>
                <p className="text-gray-500">Pagos y cartera</p>
              </Card>

              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-gray-900 mb-1">Usuarios</p>
                <p className="text-gray-500">Listado completo</p>
              </Card>
            </div>

            {/* Filtros de Reportes */}
            <Card className="p-4">
              <h4 className="text-gray-900 mb-4">Generar Reporte Personalizado</h4>
              <div className="space-y-3">
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Tipo de reporte</option>
                  <option>Académico</option>
                  <option>Asistencia</option>
                  <option>Financiero</option>
                  <option>Usuarios</option>
                </select>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Todos los cursos</option>
                  {cursosData.map(c => <option key={c.id}>{c.nombre}</option>)}
                </select>

                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Generar Reporte
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
