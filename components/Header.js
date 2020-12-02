import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from "@apollo/client";

const OBTENER_USUARIO = gql`
    query obtenerUsuario {
        obtenerUsuario {
            nombre
            apellido
        }
    }
`;

export default function Header() {
    
    const router = useRouter();
    
    const { data, loading, error} = useQuery(OBTENER_USUARIO);

    if (loading) {
        return (null);
    }

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }
    
    const { nombre, apellido } = data.obtenerUsuario;
    return (
        <div className="flex justify-between mb-6">
            <p className="mr-2">Hola {nombre} {apellido}</p>
            <button 
                type="button"
                onClick={() => cerrarSesion()}
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md">
                Cerrar Sesión
            </button>
        </div>
    );
}