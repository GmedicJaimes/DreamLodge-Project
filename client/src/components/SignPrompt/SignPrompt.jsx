import React, { useState } from 'react';

const SignPrompt = ({ onSave, onClose }) => {
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');

  const handleSubmit = () => {
    onConfirm({ country, language: [language] });
    onClose();
  };

  if (!isOpen) return null;


  return (
    <div className="modal">
      <h2>Completa tus datos</h2>
      <div>
        <label>
          País:
          <input value={country} onChange={e => setCountry(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Idioma:
          <input value={language} onChange={e => setLanguage(e.target.value)} />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>Guardar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default SignPrompt;
