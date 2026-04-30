import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Forgot from "./Password";
import Account from "./Account";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;