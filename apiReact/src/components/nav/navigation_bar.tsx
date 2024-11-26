import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Dashboard, ImportContacts, Refresh } from '@mui/icons-material';
import { VoteTrendsChart, CsvUploadForm} from '../../pages';

function SimpleBottomNavigation() {

  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = (newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:        
        window.location.href = '/';
        break;
      case 2:
        navigate('/importCSV');
        break;
      default:
        break;
    }
  };

  return (
    <div style={styles.navContainer}>
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => handleNavigation(newValue)}
      showLabels
    >
      <BottomNavigationAction label='Dashboard' icon={<Dashboard />} />
      <BottomNavigationAction label='Atualizar' icon={<Refresh />} />
      <BottomNavigationAction label='Importar Pesquisas CSV' icon={<ImportContacts />} />

    </BottomNavigation>
    </div>
  );
}

const styles = {
  navContainer: {
    position: 'fixed' as const,
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    zIndex: 10,
    boxShadow: '0 -2px 5px rgba(0,0,0,0.2)',
  },
  nav: {
    height: 60,
  },
};



function FDashboard() {

const [data, setData] = useState([]); 
const [loading, setLoading] = useState(true); 
const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/pesquisa');
        if (!response.ok) throw new Error('Erro ao buscar os dados!');
        const result = await response.json();
        setData(result); 
        
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 
  }, []); 


    // Renderização condicional
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

  return (

    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
    <h1>Dashboard - Intenções de Voto</h1>
    <VoteTrendsChart data={data} />
    </div>

  );

}

function FRefresh() {
  return <h1>Atualizar</h1>;

}

function FImportCSV() {

  return(
    <CsvUploadForm />
  )
}

export default function App() {
  return (
    <Router>
      <div style={{ paddingBottom: '60px' }}>
        <Routes>
          <Route path='/' element={<FDashboard />} />
          <Route path='/' element={<FRefresh />} />
          <Route path='/importCSV' element={<FImportCSV />} />
        </Routes>
        <SimpleBottomNavigation />
      </div>
    </Router>
  );
}
