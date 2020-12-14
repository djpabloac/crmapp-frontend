import React from 'react';
import { OBTENER_PEDIDOS } from './type';
import Layout from '../../components/Layout';
import { Permission } from '../../components/Global';
import ButtonMenu from '../../components/ButtonMenu';
import { useQuery } from "@apollo/client";
import Detail from './detail';

export default function Index() {

    //Consulta de apollo
    const { data, loading, error } = useQuery(OBTENER_PEDIDOS);

    if (loading)
        return 'Cargando...';

    if (!data.obtenerPedidosVendedor) {
        return <Permission />;
    }

    const { obtenerPedidosVendedor } = data;
    
    return (
        <div>
            <Layout
                children={
                    <div>
                        {obtenerPedidosVendedor.length === 0 ? (
                            <p className="mt-5 text-center text-2xl">No hay pedidos aún</p>
                        ) : (
                                obtenerPedidosVendedor.map(pedido => (
                                    <Detail
                                        key={pedido.id}
                                        pedido={pedido}
                                    />
                                ))
                            )}
                    </div>
                }

                menu={
                    <div>
                        <ButtonMenu
                            caption="Nuevo"
                            url="/pedidos/new"
                        />
                    </div>
                }
            />
        </div >
    )
}