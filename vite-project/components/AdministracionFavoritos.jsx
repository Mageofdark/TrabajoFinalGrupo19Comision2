import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { useProductos } from "./ProductosContext";

/**
 * Marca como favoritos los productos que están en la lista personal del usuario.
 */
function AdministracionFavoritos(){
    const { isAuthenticated,user } = useAuth();
    const { selecionFavorito} = useProductos();

    if(!user?.listafavoritos) return;

    console.log("hola");
    // Este efecto se ejecuta al cargar el componente
    // Marca como favoritos los productos que están en la lista personal del usuario
    useEffect(() =>{
    user.listafavoritos.forEach((id)=> {
    selecionFavorito(id);
    })
    },[]);

    // Este efecto se ejecuta cuando el usuario se autentica
    useEffect(() => {
        user.listafavoritos.forEach((id) => {
            selecionFavorito(id);
        })
    },[isAuthenticated])
 }

 export default AdministracionFavoritos