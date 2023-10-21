import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import CarType from "./Pages/CarType";
import Main from "./Pages/Main";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          exact
          path='/'
          element={<Main />}
        />
        <Route
          path='/turi'
          element={<CarType />}
        />
      </Routes>
    </div>
  );
}

export default App;
