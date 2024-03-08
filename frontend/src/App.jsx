import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Authentication/login";
import Signup from "./pages/Authentication/signup";
import NoteState from "./context/notes/noteState";

export default function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </NoteState>
  );
}
