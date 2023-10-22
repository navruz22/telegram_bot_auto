import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import CarType from "./Pages/CarType";
import Main from "./Pages/Main";
import { useEffect, useState } from "react";
import LoginPage from "./Pages/LoginPage";


function App() {

  const [isAuth, setIsAuth] = useState(false)
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [])

  return (
    <div className="w-full h-full">
      {isAuth && <Navbar />}
      {!isAuth ? <Routes>
        <Route
          exact
          path='/'
          element={<LoginPage />}
        />
      </Routes> : <Routes>
        <Route
          exact
          path='/'
          element={<Main />}
        />
        <Route
          path='/cartype'
          element={<CarType />}
        />
      </Routes>}
    </div>
  );
}

export default App;
