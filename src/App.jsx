import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/SignUp';
import './App.css'

function App() {
  return (
    <>
   
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" Component={Login} />
          <Route path="/auth/signup" Component={SignUp}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
