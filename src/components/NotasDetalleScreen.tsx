import { useState } from 'react';
import { User, Screen } from '../App';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  FileText,
  Award,
  AlertTriangle
} from 'lucide-react';

interface NotasDetalleScreenProps {
  user: User;
  estudianteId: string;
  onNavigate: (screen: Screen) => void;
}

interface Nota {
  id: string;
  materia: string;
  tipo: 'examen' | 'taller' | 'tarea' | 'proyecto';
  titulo: string;
  nota: number;
  fecha: string;
  periodo: number;
  peso: number;
}

const notasMock: Nota[] = [
  // Matemáticas
  { id: '1', materia: 'Matemáticas', tipo: 'examen', titulo: 'Examen Capítulo 5', nota: 4.5, fecha: '10 Nov 2024', periodo: 4, peso: 30 },
  { id: '2', materia: 'Matemáticas', tipo: 'taller', titulo: 'Taller Álgebra', nota: 4.2, fecha: '05 Nov 2024', periodo: 4, peso: 20 },
  { id: '3', materia: 'Matemáticas', tipo: 'tarea', titulo: 'Ejercicios Cap. 4', nota: 4.8, fecha: '01 Nov 2024', periodo: 4, peso: 10 },
  { id: '4', materia: 'Matemáticas', tipo: 'examen', titulo: 'Examen Trimestral', nota: 3.9, fecha: '15 Oct 2024', periodo: 3, peso: 40 },
  
  // Español
  { id: '5', materia: 'Español', tipo: 'proyecto', titulo: 'Ensayo Literario', nota: 4.0, fecha: '08 Nov 2024', periodo: 4, peso: 35 },
  { id: '6', materia: 'Español', tipo: 'examen', titulo: 'Examen Gramática', nota: 3.7, fecha: '02 Nov 2024', periodo: 4, peso: 30 },
  { id: '7', materia: 'Español', tipo: 'tarea', titulo: 'Análisis de texto', nota: 4.3, fecha: '28 Oct 2024', periodo: 4, peso: 15 },
  
  // Ciencias
  { id: '8', materia: 'Ciencias', tipo: 'examen', titulo: 'Examen Sistema Solar', nota: 3.8, fecha: '05 Nov 2024', periodo: 4, peso: 30 },
  { id: '9', materia: 'Ciencias', tipo: 'proyecto', titulo: 'Maqueta Sistema Solar', nota: 4.6, fecha: '30 Oct 2024', periodo: 4, peso: 25 },
  { id: '10', materia: 'Ciencias', tipo: 'taller', titulo: 'Laboratorio Física', nota: 4.1, fecha: '25 Oct 2024', periodo: 4, peso: 20 },
  
  // Sociales
  { id: '11', materia: 'Sociales', tipo: 'examen', titulo: 'Examen Geografía', nota: 4.4, fecha: '07 Nov 2024', periodo: 4, peso: 30 },
  { id: '12', materia: 'Sociales', tipo: 'proyecto', titulo: 'Mapa Político', nota: 4.7, fecha: '01 Nov 2024', periodo: 4, peso: 25 },
  
  // Inglés
  { id: '13', materia: 'Inglés', tipo: 'examen', titulo: 'Unit 5 Test', nota: 4.3, fecha: '09 Nov 2024', periodo: 4, peso: 30 },
  { id: '14', materia: 'Inglés', tipo: 'taller', titulo: 'Speaking Practice', nota: 4.5, fecha: '03 Nov 2024', periodo: 4, peso: 20 },
];

export function NotasDetalleScreen({ user, estudianteId, onNavigate }: NotasDetalleScreenProps) {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState(4);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState<string | null>(null);

  // Obtener materias únicas
  const materias = Array.from(new Set(notasMock.map(n => n.materia)));

  // Calcular promedio por materia
  const calcularPromedioMateria = (materia: string, periodo: number) => {
    const notasMateria = notasMock.filter(n => n.materia === materia && n.periodo === periodo);
    if (notasMateria.length === 0) return 0;
    
    const totalPeso = notasMateria.reduce((sum, n) => sum + n.peso, 0);
    const notaPonderada = notasMateria.reduce((sum, n) => sum + (n.nota * n.peso), 0);
    
    return notaPonderada / totalPeso;
  };

  // Calcular promedio general
  const calcularPromedioGeneral = (periodo: number) => {
    const promedios = materias.map(m => calcularPromedioMateria(m, periodo));
    return promedios.reduce((sum, p) => sum + p, 0) / materias.length;
  };

  const promedioGeneral = calcularPromedioGeneral(periodoSeleccionado);

  const getTendencia = (promedio: number) => {
    if (promedio >= 4.0) return { icon: TrendingUp, color: 'text-green-600', texto: 'Excelente' };
    if (promedio >= 3.5) return { icon: Minus, color: 'text-orange-600', texto: 'Aceptable' };
    return { icon: TrendingDown, color: 'text-red-600', texto: 'Necesita mejorar' };
  };

  const getColorNota = (nota: number) => {
    if (nota >= 4.0) return 'text-green-600';
    if (nota >= 3.5) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTipoColor = (tipo: Nota['tipo']) => {
    switch (tipo) {
      case 'examen': return 'bg-purple-100 text-purple-700';
      case 'taller': return 'bg-blue-100 text-blue-700';
      case 'tarea': return 'bg-green-100 text-green-700';
      case 'proyecto': return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 pt-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-white mb-1">Detalle de Notas</h1>
            <p className="text-purple-100">Ana González - 5° Primaria A</p>
          </div>
        </div>

        {/* Selector de Período */}
        <select 
          value={periodoSeleccionado}
          onChange={(e) => setPeriodoSeleccionado(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/20 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white mb-4"
        >
          <option value={1} className="text-gray-900">Período 1</option>
          <option value={2} className="text-gray-900">Período 2</option>
          <option value={3} className="text-gray-900">Período 3</option>
          <option value={4} className="text-gray-900">Período 4 (Actual)</option>
        </select>

        {/* Promedio General */}
        <Card className="bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-600">Promedio General</p>
                <div className="flex items-center gap-2">
                  <p className={`${getColorNota(promedioGeneral)}`}>
                    {promedioGeneral.toFixed(2)}
                  </p>
                  <span className="text-gray-400">/ 5.0</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              {(() => {
                const { icon: Icon, color, texto } = getTendencia(promedioGeneral);
                return (
                  <div className="flex items-center gap-1">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <span className={color}>{texto}</span>
                  </div>
                );
              })()}
            </div>
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <Tabs defaultValue="materias" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="materias">Por Materia</TabsTrigger>
            <TabsTrigger value="cronologico">Cronológico</TabsTrigger>
          </TabsList>

          {/* Por Materia */}
          <TabsContent value="materias" className="space-y-4 mt-0">
            {materiaSeleccionada ? (
              <div>
                <button
                  onClick={() => setMateriaSeleccionada(null)}
                  className="text-purple-600 mb-4 flex items-center gap-2"
                >
                  ← Volver a materias
                </button>
                
                <h3 className="text-gray-900 mb-4">{materiaSeleccionada}</h3>
                
                <div className="space-y-3">
                  {notasMock
                    .filter(n => n.materia === materiaSeleccionada && n.periodo === periodoSeleccionado)
                    .map((nota) => (
                      <Card key={nota.id} className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-gray-900">{nota.titulo}</p>
                              <Badge className={getTipoColor(nota.tipo)}>
                                {nota.tipo}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {nota.fecha}
                              </div>
                              <div>Peso: {nota.peso}%</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`${getColorNota(nota.nota)}`}>{nota.nota.toFixed(1)}</p>
                            <p className="text-gray-400">/ 5.0</p>
                          </div>
                        </div>
                        
                        {/* Barra de progreso */}
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              nota.nota >= 4.0 ? 'bg-green-500' :
                              nota.nota >= 3.5 ? 'bg-orange-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${(nota.nota / 5.0) * 100}%` }}
                          />
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {materias.map((materia) => {
                  const promedio = calcularPromedioMateria(materia, periodoSeleccionado);
                  const notasMateria = notasMock.filter(n => n.materia === materia && n.periodo === periodoSeleccionado);
                  
                  return (
                    <Card 
                      key={materia}
                      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setMateriaSeleccionada(materia)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-gray-900">{materia}</p>
                            <p className="text-gray-500">{notasMateria.length} evaluaciones</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`${getColorNota(promedio)}`}>
                            {promedio.toFixed(2)}
                          </p>
                          <p className="text-gray-400">/ 5.0</p>
                        </div>
                      </div>
                      
                      {/* Barra de progreso */}
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            promedio >= 4.0 ? 'bg-green-500' :
                            promedio >= 3.5 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${(promedio / 5.0) * 100}%` }}
                        />
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Cronológico */}
          <TabsContent value="cronologico" className="space-y-4 mt-0">
            <div className="space-y-3">
              {notasMock
                .filter(n => n.periodo === periodoSeleccionado)
                .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                .map((nota) => (
                  <Card key={nota.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-gray-900">{nota.materia}</p>
                          <Badge className={getTipoColor(nota.tipo)}>
                            {nota.tipo}
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-2">{nota.titulo}</p>
                        <div className="flex items-center gap-3 text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {nota.fecha}
                          </div>
                          <div>Peso: {nota.peso}%</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`${getColorNota(nota.nota)}`}>{nota.nota.toFixed(1)}</p>
                        <p className="text-gray-400">/ 5.0</p>
                      </div>
                    </div>
                    
                    {/* Barra de progreso */}
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          nota.nota >= 4.0 ? 'bg-green-500' :
                          nota.nota >= 3.5 ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${(nota.nota / 5.0) * 100}%` }}
                      />
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Recomendaciones */}
        {promedioGeneral < 4.0 && (
          <Card className="mt-6 p-4 bg-orange-50 border-orange-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-900 mb-1">Recomendaciones</p>
                <p className="text-gray-600">
                  Es importante reforzar el estudio en las materias con menor rendimiento. 
                  Se sugiere dedicar más tiempo a la práctica y consultar dudas con los docentes.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
