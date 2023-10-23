import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import CarType from "./Pages/CarType";
import Car from "./Pages/Car";
import { useEffect, useState } from "react";
import LoginPage from "./Pages/LoginPage";
import { AuthContext } from "./Context/index";
import CarModel from "./Pages/CarModel";

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
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
    }}>
      <div className="w-full h-full">
        {isAuth && <Navbar />}
        <div className="max-w-[1200px] px-2 mx-auto">
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
              element={<Car />}
            />
            <Route
              path='/cartype'
              element={<CarType />}
            />
            <Route
              path='/carmodel'
              element={<CarModel />}
            />
          </Routes>}
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
