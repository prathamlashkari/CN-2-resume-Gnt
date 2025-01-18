
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Navbar  from './components/navbar';
import Signin from './signin/signin';
import Signup from './signup/signup';
import Details from './components/details';
import Resume from './components/resume';
import ProtectedRoutes from './protectedroutes/protectedroutes';
import { BallTriangle } from "react-loader-spinner";
import { useContext } from 'react';
import { LoadingContext } from './contexts/loadingContext';
function App() {
  const {loading, setLoading} = useContext(LoadingContext);
  return (
    <>
    
    <BrowserRouter>
    {loading ? (
              <div className="loading-overlay">
                <BallTriangle
                  color="maroon"
                  height={100}
                  width={100}
                />
              </div>
            ) : (
              <ToastContainer />
            )}
    
      
         
          <Routes>

           
            
            
            <Route path="/" element={<Navbar />}>
            <Route index element={<ProtectedRoutes><Details /></ProtectedRoutes>} />
            <Route path="/resume" element={<ProtectedRoutes><Resume /></ProtectedRoutes>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
             
            </Route>
         

          </Routes>
    
      </BrowserRouter>
    </>
  );
}

export default App;
