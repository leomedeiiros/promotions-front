// frontend/src/components/LinkForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LinkForm = ({ onProductDataReceived, setLoading, setError }) => {
  const [url, setUrl] = useState('');

  // Pega a URL da API via variável de ambiente ou usa localhost como fallback
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  const handleExtract = async () => {
    if (!url) {
      setError('Por favor, insira um link de afiliado.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await axios.post(`${API_URL}/api/scrape`, { url });
      onProductDataReceived(response.data);
    } catch (error) {
      console.error('Erro ao obter dados do produto:', error);
      setError(
        error.response?.data?.error || 
        'Falha ao obter dados do produto. Verifique o link e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input 
        type="url"
        className="form-input"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Cole o link da Amazon ou Mercado Livre"
      />
      <button 
        className="btn extract-btn"
        onClick={handleExtract}
      >
        <i className="fas fa-search"></i>
        Extrair Dados
      </button>
    </>
  );
};

export default LinkForm;
