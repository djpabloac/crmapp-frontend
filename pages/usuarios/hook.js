import { useQuery } from "@apollo/client";
import { OBTENER_USUARIO } from './type';

export const useObtenerUsuario = () => {
    const { data, loading } = useQuery(OBTENER_USUARIO);

    if (loading)
    {
        return {
            loading,
            user: null
        }
    }

    return {
        loading,
        user: data.obtenerUsuario
    }
}