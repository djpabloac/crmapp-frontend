import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NUEVA_CUENTA } from './type';
import { useFormik } from 'formik'; //Dependencia para estructura formulario 
import * as Yup from 'yup'; //Dependencia para validaciones
import { useMutation } from '@apollo/client';

export default function New() {

    // State para el mensaje
    const [mensaje, guardarMensaje] = useState(null);

    //Mutation para crear nuevos usuarios
    const [nuevoUsuario] = useMutation(NUEVA_CUENTA);

    //Routing
    const router = useRouter();

    //Estructura
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es requerido'),
            apellido: Yup.string().required('El apellido es requerido'),
            email: Yup.string().email('El email no es valido').required('El email es requerido'),
            password: Yup.string().required('El password es requerido').min(6, 'El password debe ser de al menos 6 caracteres')
        }),
        onSubmit: async sendValues => {
            const { nombre, apellido, email, password } = sendValues;

            try {

                const { data } = await nuevoUsuario({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            email,
                            password
                        }
                    }
                });

                //Usuario creado correctamente
                guardarMensaje('Usuario creado correctamente');

                setTimeout(() => {
                    guardarMensaje(null);
                    router.push('/login');
                }, 2000);

            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error: ', ''));
                setTimeout(() => {
                    guardarMensaje(null);
                }, 3000);
            }
        }
    })

    //Template show alert
    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <>
            <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                <div>
                    <h1 className="text-2xl text-white font-light text-center">Crear nueva cuenta</h1>
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

                                {formik.touched.nombre && formik.errors.nombre ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.nombre}</p>
                                    </div>
                                ) : null}

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

                                {formik.touched.apellido && formik.errors.apellido ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.apellido}</p>
                                    </div>
                                ) : null}

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

                                {formik.touched.email && formik.errors.email ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.email}</p>
                                    </div>
                                ) : null}

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>

                                {formik.touched.password && formik.errors.password ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.password}</p>
                                    </div>
                                ) : null}

                                <input
                                    className="btn-confirm"
                                    type="submit"
                                    value="Crear cuenta"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}