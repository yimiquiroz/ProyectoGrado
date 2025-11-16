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
  BookOpen, 
  ClipboardList,
  Plus,
  Check,
  X,
  Search
} from 'lucide-react';

interface DocenteDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (screen: Screen) => void;
}

// Mock data
const cursosAsignados = [
  { id: '1', nombre: '5° Primaria A', materia: 'Matemáticas', estudiantes: 25 },
  { id: '2', nombre: '5° Primaria B', materia: 'Matemáticas', estudiantes: 23 },
];

const estudiantesCursoActual = [
  { id: '1', nombre: 'Ana González', asistenciaHoy: null, ultimaNota: 4.5 },
  { id: '2', nombre: 'Carlos Pérez', asistenciaHoy: null, ultimaNota: 3.8 },
  { id: '3', nombre: 'María Rodríguez', asistenciaHoy: null, ultimaNota: 4.2 },
  { id: '4', nombre: 'Juan Martínez', asistenciaHoy: null, ultimaNota: 3.5 },
  { id: '5', nombre: 'Laura Sánchez', asistenciaHoy: null, ultimaNota: 4.8 },
];

const actividadesPendientes = [
  { id: '1', tipo: 'examen', titulo: 'Examen Matemáticas - Cap. 5', fecha: '18 Nov', curso: '5° A' },
  { id: '2', tipo: 'tarea', titulo: 'Revisión tareas algebraicas', fecha: '16 Nov', curso: '5° B' },
  { id: '3', tipo: 'nota', titulo: 'Ingresar notas taller grupal', fecha: '15 Nov', curso: '5° A' },
];

export function DocenteDashboard({ user, onLogout, onNavigate }: DocenteDashboardProps) {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(cursosAsignados[0]);
  const [estudiantes, setEstudiantes] = useState(estudiantesCursoActual);
  const [mostrarRegistroNotas, setMostrarRegistroNotas] = useState(false);

  const handleAsistencia = (estudianteId: string, presente: boolean) => {
    setEstudiantes(estudiantes.map(est => 
      est.id === estudianteId ? { ...est, asistenciaHoy: presente } : est
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 pt-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-white">
              <AvatarFallback className="bg-green-500 text-white">
                {user.nombre.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-green-100">Docente</p>
              <h2 className="text-white">{user.nombre}</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onNavigate('alertas')}
              className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={onLogout}
              className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Selector de Curso */}
        <div>
          <p className="text-green-100 mb-2">Curso Actual</p>
          <select 
            value={cursoSeleccionado.id}
            onChange={(e) => setCursoSeleccionado(cursosAsignados.find(c => c.id === e.target.value) || cursosAsignados[0])}
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/20 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
          >
            {cursosAsignados.map(curso => (
              <option key={curso.id} value={curso.id} className="text-gray-900">
                {curso.nombre} - {curso.materia}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-gray-900">{cursoSeleccionado.estudiantes}</p>
            <p className="text-gray-500">Estudiantes</p>
          </Card>
          <Card className="p-4 text-center">
            <ClipboardList className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-gray-900">{actividadesPendientes.length}</p>
            <p className="text-gray-500">Pendientes</p>
          </Card>
          <Card className="p-4 text-center">
            <BookOpen className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-gray-900">85%</p>
            <p className="text-gray-500">Promedio</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="asistencia" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="asistencia">Asistencia</TabsTrigger>
            <TabsTrigger value="notas">Notas</TabsTrigger>
            <TabsTrigger value="actividades">Actividades</TabsTrigger>
          </TabsList>

          {/* Asistencia Tab */}
          <TabsContent value="asistencia" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900">Registro de Asistencia</h3>
              <p className="text-gray-500">Hoy, 15 Nov</p>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar estudiante..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              {estudiantes.map((estudiante) => (
                <Card key={estudiante.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900">{estudiante.nombre}</p>
                      <p className="text-gray-500">Última nota: {estudiante.ultimaNota}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAsistencia(estudiante.id, true)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          estudiante.asistenciaHoy === true 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-100 text-gray-400 hover:bg-green-100'
                        }`}
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAsistencia(estudiante.id, false)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          estudiante.asistenciaHoy === false 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-100 text-gray-400 hover:bg-red-100'
                        }`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button className="w-full py-6">
              Guardar Asistencia
            </Button>
          </TabsContent>

          {/* Notas Tab */}
          <TabsContent value="notas" className="space-y-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Registro de Notas</h3>
              <Button size="sm" onClick={() => setMostrarRegistroNotas(!mostrarRegistroNotas)}>
                <Plus className="w-4 h-4 mr-1" />
                Nueva Evaluación
              </Button>
            </div>

            {mostrarRegistroNotas && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <h4 className="text-gray-900 mb-3">Nueva Evaluación</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nombre de la evaluación"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Tipo: Examen</option>
                    <option>Tipo: Taller</option>
                    <option>Tipo: Tarea</option>
                    <option>Tipo: Proyecto</option>
                  </select>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setMostrarRegistroNotas(false)}>
                      Cancelar
                    </Button>
                    <Button className="flex-1">
                      Continuar
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <div className="space-y-2">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">Examen Capítulo 5</p>
                    <p className="text-gray-500">10 Nov 2024</p>
                  </div>
                  <Badge>25 notas</Badge>
                </div>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">Taller Grupal Álgebra</p>
                    <p className="text-gray-500">05 Nov 2024</p>
                  </div>
                  <Badge variant="outline">Pendiente</Badge>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Actividades Tab */}
          <TabsContent value="actividades" className="space-y-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Actividades Pendientes</h3>
            </div>

            <div className="space-y-3">
              {actividadesPendientes.map((actividad) => (
                <Card key={actividad.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      actividad.tipo === 'examen' ? 'bg-red-100' :
                      actividad.tipo === 'tarea' ? 'bg-blue-100' :
                      'bg-green-100'
                    }`}>
                      {actividad.tipo === 'examen' && <ClipboardList className="w-5 h-5 text-red-600" />}
                      {actividad.tipo === 'tarea' && <BookOpen className="w-5 h-5 text-blue-600" />}
                      {actividad.tipo === 'nota' && <Plus className="w-5 h-5 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{actividad.titulo}</p>
                      <p className="text-gray-500">{actividad.curso} • {actividad.fecha}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
