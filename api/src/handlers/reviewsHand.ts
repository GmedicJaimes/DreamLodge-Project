import { Request, Response } from 'express';
import { reviewsData } from "../../info/resenas/reviews";

// Definimos la interfaz 'Review' para describir la estructura de un objeto de reseña
interface Review {
  id: number;
  rating: number;
  comment: string;
  author: string;
  createdAt: Date;
}

// Función para obtener una reseña por su ID
export const reviewsID = async (id: number): Promise<Review> => {
  // Si el 'id' no está definido (es falsy, como null o undefined), lanzamos un error
  if (!id) throw new Error(`ingresa id`);
  else {
    // Usamos el método 'find()' en el array 'reviewsData' para buscar una reseña cuyo 'id' coincida con el que recibimos
    // El método 'find()' devuelve el primer elemento del array que cumple la condición o undefined si no se encuentra ninguno
    const review: Review | undefined = reviewsData.find((review) => review.id === id);

    // Si se encontró una reseña (es decir, 'review' no es undefined), la devolvemos
    if (review) return review;
    // Si no se encontró una reseña, lanzamos un error
    else throw new Error(`reseña no encontrada`);
  }
};


// Controlador para obtener las reseñas con o sin filtrado por rating
export const getReviews = (ratingFilter?: number | number[]): Review[] => {
    if (ratingFilter) {
      // Si se proporcionó el ratingFilter, convertimos los valores a un array de números
      const ratings: number[] = Array.isArray(ratingFilter) ? ratingFilter : [ratingFilter];
  
      // Filtramos las reseñas por los valores de rating proporcionados
      const filteredReviews = reviewsData.filter((review) => {
        return ratings.includes(review.rating);
      });
  
      return filteredReviews;
    } else {
      // Si no se proporcionó el ratingFilter, devolvemos todas las reseñas
      return reviewsData;
    }
  };