 'use client'
import { ProjectProvider } from '@/context/ProjectContext';
import Proyecto from './Proyecto';

// Imaginemos que este es tu componente de página para presupuestos.
const PresupuestosPage = ({ params }) => {
  return (
    <ProjectProvider>
      <Proyecto params={params} />
      {/* <div>Hola</div> */}
    </ProjectProvider>
  );
};

export default PresupuestosPage;
