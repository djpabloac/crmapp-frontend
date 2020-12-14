import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { NUEVO_PRODUCTO } from './type';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

export default function New() {

    const [mensaje, guardarMensaje] = useState(null);

    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
        update(cache, { data: { nuevoProducto }}) {
            //Obtener el objeto de cache que va actualizar
            const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS});

            //Re-escribir el cache (El cache nunca se debe modificar)
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: [...obtenerProductos, nuevoProducto]
                }
            });
        }
    });

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            nombre: '',
            existencia: '',
            precio: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es requerido'),
            existencia: Yup.number().required('La existencia es requerido').positive('La existencia debe ser mayor 0').integer('El valor es número entero'),
            precio: Yup.number().required('El precio es requerida').positive('El precio debe ser mayor 0')
        }),
        onSubmit: async sendValues => {
            const { nombre, existencia, precio } = sendValues;
            try {
                const { data } = await nuevoProducto({
                    variables: {
                        input: {
                            nombre,
                            existencia,
                            precio
                        }
                    }
                });

                router.push('/productos');
            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error: ',''));
                setTimeout(() => {
                    guardarMensaje(null);
                }, 3000);
            }
        }
    });

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <Layout>
            {mensaje && mostrarMensaje()}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form 
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                        >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                Nombre
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                id="nombre"
                                type="text"
                                placeholder="Nombre"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        { formik.touched.nombre && formik.errors.nombre ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">
                                Existencia
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                id="existencia"
                                type="number"
                                placeholder="0"
                                value={formik.values.existencia}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        { formik.touched.existencia && formik.errors.existencia ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.existencia}</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                Precio
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                id="precio"
                                type="number"
                                placeholder="0.00"
                                value={formik.values.precio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        { formik.touched.precio && formik.errors.precio ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.precio}</p>
                            </div>
                        ) : null }

                        <input 
                            className="btn-confirm"
                            type="submit"
                            value="Registrar Productos"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    )
}