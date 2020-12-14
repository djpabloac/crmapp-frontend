import React from 'react';
import Head from 'next/head';
import { useObtenerUsuario } from '../pages/usuarios/hook';
import Navbar from '../components/Navbar';

export default function Layout({ children, menu }) {

    const { user, loading } = useObtenerUsuario();

    if (loading)
        return "Cargando...";

    return (
        <>
            <Head>
                <title>CrmApp</title>
            </Head>
            <div>
                <Navbar user={user} menu={menu} />
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 sm:px-0">
                            <div>
                                {children}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}