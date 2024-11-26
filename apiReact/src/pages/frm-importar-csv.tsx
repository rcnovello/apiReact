import '../App.css';
import { useState } from 'react';
import axios from 'axios';

function FrmImportCSV() {
  const [file, setFile] = useState();
  const [showModal, setShowModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  function handleChange(event) {
    setFile(event.target.files[0]);
    setShowModal(true); // Exibir modal ao selecionar arquivo
  }

  function handleConfirm() {
    const url = 'http://localhost:3001/uploadCsv';
    const formData = new FormData();
    formData.append('upload', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    };

    axios.post(url, formData, config)
      .then((response) => {
        setUploadStatus('Arquivo enviado com sucesso! '+
        'Clique em Dashboard para visualizar as atualizações em tempo real,'+
        'cargas CSV maiores que 10 linhas podem demorar até 10 minutos para carregar no MS SQL(AWS-RDS)');
      })
      .catch((error) => {
        setUploadStatus('Falha ao enviar o arquivo.');
      })
      .finally(() => {
        setShowModal(false); 
      });
  }

  function handleCancel() {
    setShowModal(false); 
  }

  return (
    <div className='App'>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Importar Arquivo CSV de Pesquisa Eleitoral</h1>
        <input type='file' onChange={handleChange} />
        {file && <button type='button' onClick={() => setShowModal(true)}>Enviar</button>}
      </form>

      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Confirmar Envio</h2>
            <p>Você está prestes a enviar o arquivo: <strong>{file.name}</strong></p>
            <button onClick={handleConfirm}>Confirmar</button>
            <button onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      )}

      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default FrmImportCSV;