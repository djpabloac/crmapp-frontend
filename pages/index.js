import Layout from '../components/Layout'
import { useObtenerUsuario } from '../pages/usuarios/hook';

export default function Home() {

  const { user, loading } = useObtenerUsuario();

  if (loading)
    return "Cargando...";

  const { nombre, apellido } = user;

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Bienvenido {nombre} {apellido}.</h1>
      </Layout>
    </div>
  )
}
