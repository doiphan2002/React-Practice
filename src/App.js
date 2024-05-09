
import './App.scss';
import Header from './components/Header';
import Home from './components/Home';
import TableUsers from './components/TableUsers';
import { Container } from 'react-bootstrap';
import { ToastContainer} from 'react-toastify';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import { UserContext } from './context/UserContext';
import { useContext } from 'react';


function App() {
  
  const { user } = useContext(UserContext);
  console.log(">> user:", user)
  return (
    <>
    <div className='app-container'>
      
    <Header />
      <Container>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/users' element={<TableUsers/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
</Container>
    </div>
    <ToastContainer
    position='top-right'
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover/>
      
    
    </>
  );
}

export default App;
