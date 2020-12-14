import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { ACTUALIZAR_PRODUCTO, OBTENER_PRODUCTO } from './type';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

export default function Editar() {

    const router = useRouter();
    const { query: { id } } = router;

    const [mensaje, guardarMensaje] = useState(null);
    const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO);

    const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
        variables: {
            id
        }
    });

    if (loading)
        return 'Cargando...';

    const validationSchema = Yup.object({
        nombre: Yup.string().required('El nombre es requerido'),
        existencia: Yup.number().required('El apellido es requerido').positive('La existencia debe ser mayor 0').integer('El valor es número entero'),
        precio: Yup.number().required('La empresa es requerida').positive('El precio debe ser mayor 0')
    });

    const onSubmit = async (valores) => {
        const { nombre, existencia, precio } = valores;

        try {
            
            const { data } = await actualizarProducto({
                variables: {
                    id,
                    input: {
                        nombre,
                        existencia,
                        precio
                    }
                }
            });

            //Mostrar alerta
            Swal.fire(
                'Actualizado!',
                'El producto se actualizó correctamente',
                'success'
            );

            router.push('/productos');
        } catch (error) {
            guardarMensaje(error.message.replace('GraphQL error: ', ''));
            setTimeout(() => {
                guardarMensaje(null);
            }, 3000);
        }
    }

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    const { obtenerProducto } = data;

    return (
        <Layout>
            {mensaje && mostrarMensaje()}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={obtenerProducto}
                        onSubmit={onSubmit}
                    >
                        {props => {
                            return (
                                <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={props.handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                            Nombre
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                            id="nombre"
                                            type="text"
                                            placeholder="Nombre"
                                            value={props.values.nombre}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    { props.touched.nombre && props.errors.nombre ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.nombre}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">
                                            Existencia
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                            id="existencia"
                                            type="number"
                                            placeholder="0"
                                            value={props.values.existencia}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    { props.touched.existencia && props.errors.existencia ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.existencia}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                            Precio
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                            id="precio"
                                            type="number"
                                            placeholder="0.00"
                                            value={props.values.precio}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    { props.touched.precio && props.errors.precio ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.precio}</p>
                                        </div>
                                    ) : null}

                                    <input
                                        className="btn-confirm"
                                        type="submit"
                                        value="Editar Producto"
                                    />
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    )

}