import React from 'react';
import Link from 'next/link';

export const Permission = () => {
    return (
        <>
            <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Lo sentimos!</span>
                        <span className="block text-blue-300">No tiene acceso a la página.</span>
                    </h2>
                    <div className="mt-8 lex lg:mt-0 lg:flex-shrink-0 px-3">
                        <div className="inline-flex rounded-md shadow">
                            <Link href="/login">
                                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900">
                                    Iniciar sesión
                                </a>
                            </Link>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <Link href="/usuarios/new">
                                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-white hover:bg-indigo-50">
                                    Crear usuario
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

}
