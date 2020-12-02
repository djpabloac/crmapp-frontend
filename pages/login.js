import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { FormikConsumer, useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input) {
            token
        }
    }
`;

export default function Login() {
    
    //Mutation para crear token
    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

    //State
    const [mensaje, guardarMensaje] = useState(null);

    //Router
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('El email no es valido').required('El email es requerido'),
            password: Yup.string().required('El password es requerido')
        }),
        onSubmit: async sendValues => {
            const { email, password } = sendValues;

            try {
                const { data } = await autenticarUsuario({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                });

                guardarMensaje('Autenticando...');

                //Guardar el token en localstorage
                const { token } = data.autenticarUsuario;
                localStorage.setItem('token', token);

                //Redireccionar hacia cliente
                setTimeout(() => {
                    guardarMensaje(null);
                    router.push('/clientes');
                }, 2000);
            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error: ',''));
                setTimeout(() => {
                    guardarMensaje(null);
                }, 3000);
            }
        }
    });

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
            <div>
                <Layout>
                    <h1 className="text-2xl text-white font-light text-center">Login</h1>
                    {mensaje && mostrarMensaje()}
                    <div className="flex justify-center mt-5">
                        <div className="w-full max-w-sm">
                            <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={formik.handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                </div>

                                { formik.touched.email && formik.errors.email ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.email}</p>
                                    </div>
                                ) : null }

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                </div>

                                { formik.touched.password && formik.errors.password ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.password}</p>
                                    </div>
                                ) : null }

                                <input 
                                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                    type="submit"
                                    value="Iniciar Sesión"
                                />
                            </form>
                        </div>
                    </div>
                </Layout>
            </div>
        </>
    )
}