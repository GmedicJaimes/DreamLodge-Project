import React from "react";

const ImagePreview = ({ image, thumbnailSize }) => {
    const style = {
      width: `${thumbnailSize}px`,
      height: `${thumbnailSize}px`,
      overflow: 'hidden' // Esto asegura que nada sobresalga del contenedor
    };
  
    return (
      <div className="imagePreview" style={style}>
        <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  };
  

export default ImagePreview;
