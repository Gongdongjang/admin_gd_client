import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Login";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
