import { useState } from 'react';
import { User, Screen } from '../App';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft,
  Bell,
  AlertCircle,
  CheckCircle,
  Info,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare
} from 'lucide-react';

interface AlertasScreenProps {
  user: User;
  onNavigate: (screen: Screen) => void;
}

interface Alerta {
  id: string;
  tipo: 'urgente' | 'importante' | 'info';
  categoria: 'academico' | 'administrativo' | 'evento' | 'mensaje';
  titulo: string;
  descripcion: string;
  fecha: string;
  leido: boolean;
}

const alertasMock: Alerta[] = [
  {
    id: '1',
    tipo: 'urgente',
    categoria: 'academico',
    titulo: 'Bajo rendimiento en Matemáticas',
    descripcion: 'Se ha detectado una disminución en el promedio de la materia. Es importante revisar los temas con el estudiante.',
    fecha: 'Hoy, 10:30 AM',
    leido: false,
  },
  {
    id: '2',
    tipo: 'importante',
    categoria: 'evento',
    titulo: 'Reunión de padres - 20 de Noviembre',
    descripcion: 'Se convoca a reunión general de padres de familia para discutir el cierre del período académico. Asistencia obligatoria.',
    fecha: 'Hoy, 8:00 AM',
    leido: false,
  },
  {
    id: '3',
    tipo: 'importante',
    categoria: 'academico',
    titulo: 'Tarea pendiente: Ciencias Naturales',
    descripcion: 'Recordatorio: La tarea sobre el sistema solar debe ser entregada el 18 de noviembre.',
    fecha: 'Ayer, 3:45 PM',
    leido: false,
  },
  {
    id: '4',
    tipo: 'info',
    categoria: 'administrativo',
    titulo: 'Pago de pensión procesado',
    descripcion: 'Su pago correspondiente al mes de noviembre ha sido registrado exitosamente. Recibo disponible en el portal.',
    fecha: 'Ayer, 2:15 PM',
    leido: true,
  },
  {
    id: '5',
    tipo: 'info',
    categoria: 'mensaje',
    titulo: 'Mensaje de la profesora de Español',
    descripcion: 'Felicitaciones por el excelente desempeño en la presentación oral. Sigan así!',
    fecha: '13 Nov, 11:20 AM',
    leido: true,
  },
  {
    id: '6',
    tipo: 'urgente',
    categoria: 'academico',
    titulo: 'Ausencia no justificada',
    descripcion: 'Se registró una ausencia el día 12 de noviembre. Por favor, enviar justificación médica o familiar.',
    fecha: '13 Nov, 9:00 AM',
    leido: false,
  },
  {
    id: '7',
    tipo: 'info',
    categoria: 'evento',
    titulo: 'Día del deporte - 25 de Noviembre',
    descripcion: 'Se realizará la jornada deportiva anual. Los estudiantes deben asistir con ropa deportiva.',
    fecha: '12 Nov, 4:00 PM',
    leido: true,
  },
  {
    id: '8',
    tipo: 'importante',
    categoria: 'administrativo',
    titulo: 'Actualización de datos requerida',
    descripcion: 'Es necesario actualizar los datos de contacto de emergencia antes del 30 de noviembre.',
    fecha: '11 Nov, 10:00 AM',
    leido: false,
  },
];

export function AlertasScreen({ user, onNavigate }: AlertasScreenProps) {
  const [alertas, setAlertas] = useState(alertasMock);
  const [filtro, setFiltro] = useState<'todas' | 'noLeidas'>('todas');

  const alertasFiltradas = filtro === 'noLeidas' 
    ? alertas.filter(a => !a.leido)
    : alertas;

  const alertasNoLeidas = alertas.filter(a => !a.leido).length;

  const marcarComoLeida = (id: string) => {
    setAlertas(alertas.map(a => 
      a.id === id ? { ...a, leido: true } : a
    ));
  };

  const marcarTodasLeidas = () => {
    setAlertas(alertas.map(a => ({ ...a, leido: true })));
  };

  const getIconoCategoria = (categoria: Alerta['categoria']) => {
    switch (categoria) {
      case 'academico': return FileText;
      case 'administrativo': return DollarSign;
      case 'evento': return Calendar;
      case 'mensaje': return MessageSquare;
    }
  };

  const getColorTipo = (tipo: Alerta['tipo']) => {
    switch (tipo) {
      case 'urgente': return { bg: 'bg-red-100', border: 'border-red-300', icon: 'text-red-600' };
      case 'importante': return { bg: 'bg-orange-100', border: 'border-orange-300', icon: 'text-orange-600' };
      case 'info': return { bg: 'bg-blue-100', border: 'border-blue-300', icon: 'text-blue-600' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 pt-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-white mb-1">Alertas y Notificaciones</h1>
            <p className="text-blue-100">
              {alertasNoLeidas} sin leer de {alertas.length} total
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2">
          <button
            onClick={() => setFiltro('todas')}
            className={`flex-1 py-2 px-4 rounded-xl transition-all ${
              filtro === 'todas'
                ? 'bg-white text-blue-600'
                : 'bg-white/20 text-white backdrop-blur-sm'
            }`}
          >
            Todas ({alertas.length})
          </button>
          <button
            onClick={() => setFiltro('noLeidas')}
            className={`flex-1 py-2 px-4 rounded-xl transition-all ${
              filtro === 'noLeidas'
                ? 'bg-white text-blue-600'
                : 'bg-white/20 text-white backdrop-blur-sm'
            }`}
          >
            No leídas ({alertasNoLeidas})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {alertasNoLeidas > 0 && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={marcarTodasLeidas}
              className="text-blue-600"
            >
              Marcar todas como leídas
            </button>
          </div>
        )}

        <Tabs defaultValue="todas" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="academico">Académico</TabsTrigger>
            <TabsTrigger value="evento">Eventos</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="todas" className="space-y-3 mt-0">
            {alertasFiltradas.length === 0 ? (
              <Card className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-900 mb-1">¡Todo al día!</p>
                <p className="text-gray-500">No tienes notificaciones pendientes</p>
              </Card>
            ) : (
              alertasFiltradas.map((alerta) => {
                const colores = getColorTipo(alerta.tipo);
                const IconoCategoria = getIconoCategoria(alerta.categoria);
                
                return (
                  <Card 
                    key={alerta.id}
                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                      !alerta.leido ? `${colores.bg} ${colores.border}` : ''
                    }`}
                    onClick={() => marcarComoLeida(alerta.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 ${colores.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <IconoCategoria className={`w-6 h-6 ${colores.icon}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-gray-900">{alerta.titulo}</p>
                          {!alerta.leido && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-gray-600 mb-2 line-clamp-2">{alerta.descripcion}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge 
                            variant={alerta.tipo === 'urgente' ? 'destructive' : 'outline'}
                            className="text-xs"
                          >
                            {alerta.tipo === 'urgente' ? 'Urgente' : 
                             alerta.tipo === 'importante' ? 'Importante' : 'Info'}
                          </Badge>
                          <p className="text-gray-400">{alerta.fecha}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="academico" className="space-y-3 mt-0">
            {alertasFiltradas.filter(a => a.categoria === 'academico').map((alerta) => {
              const colores = getColorTipo(alerta.tipo);
              const IconoCategoria = getIconoCategoria(alerta.categoria);
              
              return (
                <Card 
                  key={alerta.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    !alerta.leido ? `${colores.bg} ${colores.border}` : ''
                  }`}
                  onClick={() => marcarComoLeida(alerta.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 ${colores.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <IconoCategoria className={`w-6 h-6 ${colores.icon}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-gray-900">{alerta.titulo}</p>
                        {!alerta.leido && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{alerta.descripcion}</p>
                      <p className="text-gray-400">{alerta.fecha}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="evento" className="space-y-3 mt-0">
            {alertasFiltradas.filter(a => a.categoria === 'evento').map((alerta) => {
              const colores = getColorTipo(alerta.tipo);
              const IconoCategoria = getIconoCategoria(alerta.categoria);
              
              return (
                <Card 
                  key={alerta.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    !alerta.leido ? `${colores.bg} ${colores.border}` : ''
                  }`}
                  onClick={() => marcarComoLeida(alerta.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 ${colores.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <IconoCategoria className={`w-6 h-6 ${colores.icon}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-gray-900">{alerta.titulo}</p>
                        {!alerta.leido && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{alerta.descripcion}</p>
                      <p className="text-gray-400">{alerta.fecha}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="admin" className="space-y-3 mt-0">
            {alertasFiltradas.filter(a => a.categoria === 'administrativo').map((alerta) => {
              const colores = getColorTipo(alerta.tipo);
              const IconoCategoria = getIconoCategoria(alerta.categoria);
              
              return (
                <Card 
                  key={alerta.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    !alerta.leido ? `${colores.bg} ${colores.border}` : ''
                  }`}
                  onClick={() => marcarComoLeida(alerta.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 ${colores.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <IconoCategoria className={`w-6 h-6 ${colores.icon}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-gray-900">{alerta.titulo}</p>
                        {!alerta.leido && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{alerta.descripcion}</p>
                      <p className="text-gray-400">{alerta.fecha}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
