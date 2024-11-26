import { useState, useEffect } from 'react';
import { Card, Button} from '../components';

function ListClientes() {
  const [data, setData] = useState([]); // Estado para armazenar os dados da API
  const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento
  const [error, setError] = useState<string | null>(null); // Estado para gerenciar erros

  // useEffect para buscar os dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/pesquisa');
        if (!response.ok) throw new Error('Erro ao buscar os dados!');
        const result = await response.json();
        setData(result); // Armazena os dados no estado
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Chama a função de busca
  }, []); // Executa apenas uma vez ao montar o componente

  // Renderização condicional
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      {data.slice(0, 10).map((cliente: any) => (
        <Card title={`Bem-vindo ${cliente.Nome}`} key={cliente.ClienteID}>
          <p>E-mail: {cliente.Email}</p>
          <p>Telefone: {cliente.Telefone}</p>
          <Button 
            label={`Exibir Dashboard`}
            onClick={() => alert(`Exibir Dashboard ${cliente.Nome}`)} 
            variant='contained' 
            color='primary' 
          />
          
        </Card>
      ))}
    </div>
  );
}

export default ListClientes;
