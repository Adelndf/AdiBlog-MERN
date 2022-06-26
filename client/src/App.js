import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Error404, Home, Login, Register } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Not found page */}
        <Route path="/*" element={<Error404 />} />
      </Routes>
      <ToastContainer />
    </main>
  );
}

export default App;
