import { gql } from "@apollo/client";

export const NUEVO_PRODUCTO = gql`
    mutation nuevoProducto($input: ProductoInput) {
        nuevoProducto(input: $input) {
            nombre
            existencia
            precio
        }
    }
`;

export const ACTUALIZAR_PRODUCTO = gql`
    mutation actualizarProducto($id: ID!, $input: ProductoInput){
        actualizarProducto(id: $id, input: $input){
            nombre
            existencia
            precio
        }
    }
`;

export const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            existencia
            precio
            creado
        }
    }
`;

export const OBTENER_PRODUCTO = gql`
    query obtenerProducto($id: ID!) {
        obtenerProducto(id: $id) {
            id
            nombre
            existencia
            precio
            creado
        }
    }
`;

export const ELIMINAR_PRODUCTO = gql`
    mutation eliminarProducto($id: ID!) {
        eliminarProducto(id: $id)
    }
`;