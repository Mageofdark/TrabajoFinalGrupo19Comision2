import { createContext, useState, useMemo, useEffect, useCallback, act } from "react";

import usersData from "../data/Usuarios.json";

// Crea el contexto
export const AuthContext = createContext(null); 

// Componente proveedor del Contexto de Autorizacion
export function AuthProvider({ children }){
    const [ user, setUser ] = useState(null);

     // Carga la lista de usuarios guardada en el LocalStorage : Si no hay ninguno carga la lista por defecto
    const [listaUsuarios, setListaUsuarios] = useState( () =>{
        const listaGuardada = localStorage.getItem("Usuarios");
        return listaGuardada ? JSON.parse(listaGuardada) : usersData;      
    })

    //solo con la intencion de pensar en cargas asincronas de datos o validaciones
    const [ isLoading, setIsLoading ] = useState(false);

    const isAuthenticated =!!user;          //verificador de si inicio sesion o no

    //Carga el usuario a pesar de recargar la pagina
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    //Actualiza el usuario cargado si se cambia
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    //login
    const login = useCallback(async (credentials) => {
        setIsLoading(true);
        try{
            const usuariosGuardados = JSON.parse(localStorage.getItem("Usuarios")) || listaUsuarios;
            const usuarioEncontrado = usuariosGuardados.find(
                u => u.username === credentials.username && u.password === credentials.password && u.visible == true
            );

            if(usuarioEncontrado) {
                const { password, ...userWithoutPassword } = usuarioEncontrado;
                setUser(userWithoutPassword);
                console.log(userWithoutPassword)
                setIsLoading(false); //Desactivar carga aqui                
                return { success: true }; //Retorna exito
            } else {
                console.log(listaUsuarios)
                //si no encuentra el usuario o los datos no coinciden
                setUser(null);
                setIsLoading(false); //Desactivar carga aqui
                //retorna un objeto de error
                return { success: false, message: 'Datos Incorrectos. El nombre y/o la contraseña no coinciden'}
            }

            } catch (error) {
            //errores inesperados en el find
            console.error("Login failed due to unexpected error:", error.message);
            setUser(null);
            setIsLoading(false);
            return { success: false, message: 'Error inesperado, vuelva a intentarlo mas tarde'}
    }
    }, []);

    const logout = useCallback(() => {        
        setUser(null);
    }, []);

    const registrarUsuario = useCallback((nuevoUsuario) => {
        const nuevo = {
            ...nuevoUsuario,
            id: Date.now(), 
            rol: "USUARIO", // valores ingresados por el usuario + valores por defecto
            imagen: nuevoUsuario.imagen || "https://avatars.githubusercontent.com/u/123456789?v=4",
            visible: true,
            listafavoritos: [],
        };
        
        const actualizada = [...listaUsuarios, nuevo]           //Añade el usuario a la lista de usuarios y lo guarda en el localstorage
        localStorage.setItem("Usuarios", JSON.stringify(actualizada));
        setListaUsuarios(actualizada);
    },[]);

    const eliminarUsuario = (id) => {
        const confirmation = window.confirm("¿Estás seguro de que deseas eliminar su cuenta? Esta accion es irreversible");
        if(!confirmation) return;

        if(id <=5){
            alert("No puedes eliminar esta cuenta. Es una cuenta protegida");
            return;
        }

        console.log(listaUsuarios)
        const newListaUsuarios = listaUsuarios.map((e) => 
            e.id === id ? {...e, visible: false} : e
        )
        setListaUsuarios(newListaUsuarios);
        localStorage.setItem("Usuarios", JSON.stringify(newListaUsuarios)); 
        logout();
    }

    const agregarfavorito = (id) => {
        if(!isAuthenticated){
        alert("necesita cuenta de usuario para marcar favoritos");
        return;
        }

        const ActUser = {
            ...user,
            listafavoritos: user.listafavoritos.includes(id)            //verifica si el producto favorito ya esta en la lista personal del usuario
            ? user.listafavoritos.filter((FavId) => FavId !== id)       //si esta lo saca de la lista (marcar denuevo = deja de ser favorito)
            : [...user.listafavoritos, id]                              //si no esta lo mete a la lista
        }
        setUser(ActUser);

        const newListaUsuarios = listaUsuarios.map((e) => 
            e.id === user.id ? {...e, ...ActUser} : e              //se intercambian solo los datos que tienen en comun (porque user no maneja la contraseña)
        )

        localStorage.setItem("Usuarios", JSON.stringify(newListaUsuarios)); 
        setListaUsuarios(newListaUsuarios);
        console.log(ActUser);
  }

    const authContextValue = useMemo(() => ({
        user,
        isAuthenticated,
        isLoading,
        listaUsuarios,
        setUser,
        setListaUsuarios,
        login,
        logout,
        registrarUsuario,
        eliminarUsuario,
        agregarfavorito,
    }), [user, isLoading, login, logout]);

    // Proveer el valor del contexto a los hijos
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}