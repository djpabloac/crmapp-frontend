import React, { useState } from 'react';
import { NUEVO_CLIENTE, OBTENER_CLIENTES_USUARIO } from './type';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { FormikConsumer, useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

export default function New() {

    const [mensaje, guardarMensaje] = useState(null);

    const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
        update(cache, { data: { nuevoCliente }}) {
            //Obtener el objeto de cache que va actualizar
            const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO});
            //Re-escribir el cache (El cache nunca se debe modificar)
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente]
                }
            });
        }
    });

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            empresa: '',
            email: '',
            telefono: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es requerido'),
            apellido: Yup.string().required('El apellido es requerido'),
            empresa: Yup.string().required('La empresa es requerida'),
            email: Yup.string().email('El email no es válido').required('El email es requerido'),
            telefono: Yup.string().optional()
        }),
        onSubmit: async sendValues => {
            const { nombre, apellido, empresa, email, telefono } = sendValues;

            try {
                const { data } = await nuevoCliente({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            empresa,
                            email,
                            telefono
                        }
                    }
                });
                
                router.push('/clientes');
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                Apellido
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                id="apellido"
                                type="text"
                                placeholder="Apellido"
                                value={formik.values.apellido}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        { formik.touched.apellido && formik.errors.apellido ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.apellido}</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                Empresa
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                id="empresa"
                                type="text"
                                placeholder="Empresa"
                                value={formik.values.empresa}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        { formik.touched.empresa && formik.errors.empresa ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.empresa}</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        { formik.touched.email && formik.errors.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                Telefono
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                id="telefono"
                                type="text"
                                placeholder="Telefono"
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        { formik.touched.telefono && formik.errors.telefono ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.telefono}</p>
                            </div>
                        ) : null }

                        <input 
                            className="btn-confirm"
                            type="submit"
                            value="Registrar Cliente"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    )
}