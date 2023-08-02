// import React from 'react'

const Card: React.FC = () => {
  return (
    <div>
      <h2>name</h2>
      <h2>image</h2>
      <h2>price</h2>
      <h2>stars</h2>
      <h2>type</h2>
    </div>
  );
};

export default Card;

// interface CardProps {
//   name: string;
//   image: string;
//   price: number;
//   stars: number;
//   type: string;
// }

// const Card: React.FC<CardProps> = ({ name, image, price, stars, type }) => {
//   return (
//     <div>
//       <h2>{name}</h2>
//       <img src={image} alt={name} />
//       <h2>{price}</h2>
//       <h2>{stars}</h2>
//       <h2>{type}</h2>
//     </div>
//   );
// };

// export default Card;