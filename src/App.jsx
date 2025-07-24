import Navbar from './Components/Navbar';
import Mainrouting from './Routing/Mainrouting';
import './App.css';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div className="bg-black text-white min-h-screen font-[Poppins]">
      <Navbar />
      <div className=""><Mainrouting /></div>
      <Footer/>

    </div>
  );
};

export default App;
