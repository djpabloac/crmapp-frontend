import React from 'react';
import Swal from 'sweetalert2';
import { ELIMINAR_PRODUCTO, OBTENER_PRODUCTOS } from './type';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export default function Detail({producto}) {
    
    const router = useRouter();

    const { nombre, existencia, precio, id } = producto;

    const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
        update(cache) {
            //Obtener una copia del cache
            const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS });

            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: obtenerProductos.filter( productoActual => productoActual.id !== id)
                }
            });
        }
    });

    //Eliminar cliente
    const confirmarEliminarProducto = async () => {
        Swal.fire({
            title: '¿Deseas eliminar a este producto?',
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
                    const { data } = await eliminarProducto({
                        variables: {
                            id
                        }
                    });

                    //Mostrar alerta
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarProducto,
                        'success'
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    const editarProducto = async () =>{
        router.push({
            pathname: '/productos/[id]',
            query: {
                id
            }
        });
    }

    return (
        <tr>
            <td className="px-6 py-4 text-sm whitespace-nowrap">{nombre}</td>
            <td className="px-6 py-4 text-sm whitespace-nowrap">{existencia}</td>
            <td className="px-6 py-4 text-sm whitespace-nowrap">{precio}</td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-right font-medium">
                <a className="text-blue-800 hover:text-gray-900 mr-5 cursor-pointer" onClick={() => editarProducto()}>Editar</a>
                <a className="text-red-600 hover:text-red-700 cursor-pointer" onClick={() => confirmarEliminarProducto() }>Eliminar</a>
            </td>
        </tr>
    )
}