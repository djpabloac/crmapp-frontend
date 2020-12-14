import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react';

export default function Navbar({ user, menu }) {

    if (!user) {
        user = {
            nombre: "Sin",
            apellido: "Acceso"
        }
    }

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { nombre, apellido } = user;

    const urlsLink = [
        { title: "Home", url: "/", isFocus: false },
        { title: "Clientes", url: "/clientes", isFocus: false },
        { title: "Pedidos", url: "/pedidos", isFocus: false },
        { title: "Productos", url: "/productos", isFocus: false }
    ]

    let pageCurrent = urlsLink.find(url => url.url === router.pathname);

    if (!pageCurrent) {
        let title = router.pathname;

        const IsNew = router.pathname.includes("new");
        if (IsNew) {
            const pathName = router.pathname.split('/')[1];
            if (pathName)
                title = "Nuevo " + pathName.substr(0, pathName.length - 1);
        }

        const IsEdit = router.pathname.includes("[pid]");
        if (IsEdit) {
            const pathName = router.pathname.split('/')[1];
            if (pathName)
                title = "Editar " + pathName.substr(0, pathName.length - 1);
        }

        pageCurrent = {
            title,
            url: router.pathname,
            isFocus: true
        }
    }

    if (pageCurrent) {
        pageCurrent.isFocus = true;
    }

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <div>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {urlsLink.map(urls => (
                                        <Link key={urls.title} href={urls.url}>
                                            <a className={`${urls.isFocus ? 'bg-gray-900' : ''} text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>{urls.title}</a>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">Ver notificaciones</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </button>
                                <div className="ml-3 relative">
                                    <div>
                                        <button title={`Hola ${nombre} ${apellido}`}
                                            className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true"
                                            onClick={() => setIsOpen(!isOpen)}>
                                            <span className="sr-only">Abrir menu de usuario</span>
                                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" ></img>
                                        </button>
                                    </div>
                                    <Transition
                                        show={isOpen}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                            <Link href="/">
                                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Perfil</a>
                                            </Link>
                                            <Link href="/">
                                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Configuraciones</a>
                                            </Link>

                                            <a
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem"
                                                onClick={() => cerrarSesion()}
                                            >
                                                Cerrar sesión
                                            </a>
                                        </div>
                                    </Transition>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {
                router.pathname == pageCurrent.title ? null : (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                            <div className="lg:flex lg:items-center lg:justify-between">
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                        {pageCurrent.title}
                                    </h2>
                                </div>
                                <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                    {menu}
                                </div>
                            </div>
                        </div>
                    </header>
                )
            }
        </div >
    );
}

{/* <span className="hidden sm:block">
<button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    Edit
</button>
</span>
<span className="hidden sm:block ml-3">
<button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    Test
</button>
</span> */}