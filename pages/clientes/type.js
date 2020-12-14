import { gql } from "@apollo/client";

export const NUEVO_CLIENTE = gql`
    mutation nuevoCliente($input: ClienteInput) {
        nuevoCliente(input: $input) {
            id
            nombre
            apellido
            empresa
            email
        }
    }
`;

export const ACTUALIZAR_CLIENTE = gql`
mutation actualizarCliente($id: ID!, $input: ClienteInput) {
    actualizarCliente(id: $id, input: $input) {
        id
        nombre
        apellido
        empresa
        email
    }
}
`;

export const OBTENER_CLIENTE = gql`
query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
        id
        nombre
        apellido
        empresa
        email
    }
}
`;

export const OBTENER_CLIENTES_USUARIO = gql`
    query obtenerClientesVendedor {
        obtenerClientesVendedor {
            id
            nombre
            apellido
            empresa
            email
        }
    }
`;

export const ELIMINAR_CLIENTE = gql`
    mutation eliminarCliente($id: ID!) {
        eliminarCliente(id: $id)
    }
`;