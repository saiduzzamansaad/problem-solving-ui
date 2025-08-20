import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProblemList from './pages/ProblemList';
import ProblemDetail from './pages/ProblemDetail';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Myinfo from './pages/Myinfo';
import Pricing from './pages/Pricing';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative flex flex-col">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      
      <Router>
        <Navbar />
        <div className="relative z-10 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problems/:id" element={<ProblemDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/myinfo" element={<Myinfo />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;