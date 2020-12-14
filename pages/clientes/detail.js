import React from 'react';
import Swal from 'sweetalert2';
import { ELIMINAR_CLIENTE, OBTENER_CLIENTES_USUARIO } from './type';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

export default function Detail({cliente}) {
    
    const router = useRouter();

    const { nombre, apellido, empresa, email, id } = cliente;

    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
        update(cache) {
            //Obtener una copia del cache
            const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor: obtenerClientesVendedor.filter( clienteActual => clienteActual.id !== id)
                }
            });
        }
    });

    //Eliminar cliente
    const confirmarEliminarCliente = async () => {
        Swal.fire({
            title: '¿Deseas eliminar a este cliente?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //Eliminar por ID
                    const { data } = await eliminarCliente({
                        variables: {
                            id
                        }
                    });

                    //Mostrar alerta
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarCliente,
                        'success'
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    const editarCliente = async () =>{
        router.push({
            pathname: '/clientes/[id]',
            query: {
                id
            }
        });
    }

    return (
        <tr>
            <td className="px-6 py-4 text-sm whitespace-nowrap">{nombre} {apellido}</td>
            <td className="px-6 py-4 text-sm whitespace-nowrap">{empresa}</td>
            <td className="px-6 py-4 text-sm whitespace-nowrap">{email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a className="text-blue-800 hover:text-gray-900 mr-5 cursor-pointer" onClick={() => editarCliente()}>Editar</a>
                <a className="text-red-600 hover:text-red-700 cursor-pointer" onClick={() => confirmarEliminarCliente() }>Eliminar</a>
            </td>
        </tr>
    )
}