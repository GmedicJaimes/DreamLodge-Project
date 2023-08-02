import { Request, Response } from 'express';
import { getReviews, reviewsID } from '../handlers/reviewsHand';


  export const getReviewsFilt  = (req: Request, res: Response) => {
    try {
      const ratingFilter = req.query.rating ? parseRatingFilter(req.query.rating as string) : undefined;
      const reviews = getReviews(ratingFilter);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las reseñas.' });
    }
  };

  // Función para convertir el query parameter 'rating' en un número o un array de números
  const parseRatingFilter = (ratingQuery: string): number | number[] => {
    const ratings: string[] = ratingQuery.split(',');
    const parsedRatings: number[] = ratings.map((rating) => parseInt(rating, 10));
    return parsedRatings.length === 1 ? parsedRatings[0] : parsedRatings;
  };

export const reviewByID = (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Obtenemos el 'id' de los parámetros de la URL y lo convertimos a número
    reviewsID(id) // Llamamos a la función 'reviewsID' para buscar reviews por el 'id'
      .then((review) => res.json(review)) // Si se encuentra el usuario, lo devolvemos como respuesta en formato JSON
      .catch((error) => res.status(404).json({ message: error.message })); // Si no se encuentra el usuario, devolvemos un error 404
};

