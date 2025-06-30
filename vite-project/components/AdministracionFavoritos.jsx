import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { useProductos } from "./ProductosContext";

function AdministracionFavoritos(){
    const { isAuthenticated,user } = useAuth();
    const { selecionFavorito} = useProductos();

    if(!user?.listafavoritos) return;

    console.log("hola");
    useEffect(() =>{
    user.listafavoritos.forEach((id)=> {
    selecionFavorito(id);
    })
    },[]);

    useEffect(() => {
        user.listafavoritos.forEach((id) => {
            selecionFavorito(id);
        })
    },[isAuthenticated])
 }

 export default AdministracionFavoritos