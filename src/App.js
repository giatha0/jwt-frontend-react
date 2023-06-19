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
import { Scrollbars } from 'react-custom-scrollbars';

const App = () => {
  const { user } = useContext(UserContext);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight - 60);
  }, [user])

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
            <Scrollbars autoHide style={{ height: scrollHeight }}>
              <div className="app-container">
                <AppRoutes />
              </div>
            </Scrollbars>
          </>
        }
      </Router >


      <ToastContainer
        position="bottom-center"
        autoClose={3000}
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
