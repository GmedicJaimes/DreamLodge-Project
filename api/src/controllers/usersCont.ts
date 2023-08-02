import { Request, Response } from 'express';
<<<<<<< HEAD
import { gettingUsers,getAllUsers } from '../handlers/usersHand'; // Importamos la función 'gettingUsers'


export const getUsers = (req: Request, res: Response) => {
  try {
    const users = getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
=======
// import {users} from "../../info/usuarios/users"


export const getUsers = (req: Request, res: Response) => {

>>>>>>> b22260502a3e993e78baa5612e553b7545ad7699
};


export const getUsersByID = (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Obtenemos el 'id' de los parámetros de la URL y lo convertimos a número
    gettingUsers(id) // Llamamos a la función 'gettingUsers' para buscar al usuario por el 'id'
      .then((user) => res.json(user)) // Si se encuentra el usuario, lo devolvemos como respuesta en formato JSON
      .catch((error) => res.status(404).json({ message: error.message })); // Si no se encuentra el usuario, devolvemos un error 404
};
