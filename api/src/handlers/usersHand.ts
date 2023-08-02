// Importamos el array 'users' desde el módulo correspondiente
import { users } from "../../info/usuarios/users";

/* En resumen, la interfaz User asegura que el objeto de usuario devuelto por la función gettingUsers tenga
todos los campos esperados y sus tipos de datos correspondientes. Esto ayuda a mantener el código organizado, 
legible y con menos posibilidades de errores relacionados con los tipos de datos. */


// Definimos la interfaz 'User' para describir la estructura de un objeto de usuario
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: string; // Puedes cambiar este tipo a Date si prefieres trabajar con objetos de fecha Date
}

// Definimos la función 'getAllUsers' para obtener todos los usuarios
export const getAllUsers = (): User[] => {
  // Devolvemos el array completo de usuarios
  return users;
};

// Definimos una función asincrónica 'gettingUsers' que recibe un 'id' de tipo number y devuelve una promesa que resuelve con un objeto 'User'
export const gettingUsers = async (id: number): Promise<User> => {
  // Si el 'id' no está definido (es falsy, como null o undefined), lanzamos un error
  if (!id) throw new Error(`ingresa id`);
  else {
    // Usamos el método 'find()' en el array 'users' para buscar un usuario cuyo 'id' coincida con el que recibimos
    // El método 'find()' devuelve el primer elemento del array que cumple la condición o undefined si no se encuentra ninguno
    const usario: User | undefined = users.find((user) => user.id === id);

    // Si se encontró un usuario (es decir, 'usario' no es undefined), lo devolvemos
    if (usario) return usario;
    // Si no se encontró un usuario, lanzamos un error
    else throw new Error(`usuario no encontrado`);
  }
};

