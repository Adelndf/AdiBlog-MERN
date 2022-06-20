import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Error404, Home, Login, Register } from "./pages";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Not found page */}
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
