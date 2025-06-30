import { createContext, useState, useMemo, useEffect, useCallback } from "react";

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
            const usuarioEncontrado = listaUsuarios.find(
                u => u.username === credentials.username && u.password === credentials.password && u.visible == true
            );

            if(usuarioEncontrado) {
                const { password, ...userWithoutPassword } = usuarioEncontrado;
                setUser(userWithoutPassword);
                setIsLoading(false); //Desactivar carga aqui                
                return { success: true }; //Retorna exito
            } else {
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

    const registrarUsuario = (nuevoUsuario) => {
        const nuevo = {
            ...nuevoUsuario,
            id: Date.now(), 
            rol: "USUARIO", // valores ingresados por el usuario + valores por defecto
            imagen: nuevoUsuario.imagen || "https://avatars.githubusercontent.com/u/123456789?v=4",
            visible: true,
            listafavoritos: [],
        };
        
        setUser(nuevo);
        setListaUsuarios(prev => {                              //Añade el usuario a la lista de usuarios y lo guarda en el localstorage
            const actualizada = [...prev, nuevo];
            localStorage.setItem("Usuarios", JSON.stringify(actualizada)); 
            return actualizada;
        });
    }

    const eliminarUsuario = (id) => {
    const confirmation = window.confirm("¿Estás seguro de que deseas eliminar su cuenta? Esta accion es irreversible");
    if(!confirmation) return;
    console.log(listaUsuarios)
    const newListaUsuarios = listaUsuarios.map((e) => 
        e.id === id ? {...e, visible: false} : e
    )
    setListaUsuarios(newListaUsuarios);
    localStorage.setItem("Usuarios", JSON.stringify(newListaUsuarios)); 
    logout();
    }

    const authContextValue = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        isLoading,
        listaUsuarios,
        setUser,
        setListaUsuarios,
        login,
        logout,
        registrarUsuario,
        eliminarUsuario,
    }), [user, isLoading, login, logout]);

    // Proveer el valor del contexto a los hijos
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}