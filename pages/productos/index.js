import React from 'react';
import Layout from '../../components/Layout';
import { OBTENER_PRODUCTOS } from './type';
import Detail from './detail';
import { Permission } from '../../components/Global';
import ButtonMenu from '../../components/ButtonMenu';
import { useQuery } from "@apollo/client";

export default function Index() {

    //Consulta de apollo
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

    if (loading)
        return 'Cargando...';

    if (!data.obtenerProductos) {
        return <Permission />;
    }

    return (
        <div>
            <Layout
                children={
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 mt-2">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Existencia</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {data.obtenerProductos.map(producto => (
                                                <Detail
                                                    key={producto.id}
                                                    producto={producto}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                menu={
                    <div>
                        <ButtonMenu 
                            caption="Nuevo"
                            url="/productos/new"
                        />
                    </div>
                }
            />
        </div >
    )
}