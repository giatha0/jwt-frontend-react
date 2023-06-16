import './App.scss';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from 'react';
import NavHeader from './components/Navigation/NavHeader';
import AppRoutes from './routes/AppRoutes';
import { Rings } from 'react-loader-spinner'
import { UserContext } from './context/UserContext';

function App() {
  const { user } = useContext(UserContext);
  console.log('check app', user);

  return (
    <>
      <Router>
        {user && user.isLoading
          ?
          <div className='loading-container d-flex flex-column justify-content-center align-items-center min-vh-100'>
            <Rings
              height="100"
              width="100"
              color="#1877f2"
              radius="6"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="rings-loading"
            />
            <div>Loading data...</div>
          </div>
          :
          <>
            <div className='app-header'>
              <NavHeader />
            </div>
            <div className="app-container">
              <AppRoutes />
            </div>
          </>
        }
      </Router>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  );
}

export default App;
