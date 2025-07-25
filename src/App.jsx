import { useContext } from 'react';
import Navbar from './Components/Navbar';
import Mainrouting from './Routing/Mainrouting';
import './App.css';
import Footer from './Components/Footer';
import { useTheme } from './context/ThemeContext'; // ✅ Adjust path if different

const App = () => {
  const { darkMode } = useTheme(); // ✅ Use ThemeContext

  return (
    <div
      className={`min-h-screen font-[Poppins] transition-colors duration-300 ${
        darkMode ? 'bg-black text-gray-400' : 'bg-white text-gray-800'
      }`}
    >
      <Navbar />
      <div className="">
        <Mainrouting />
      </div>
      <Footer />
    </div>
  );
};

export default App;
