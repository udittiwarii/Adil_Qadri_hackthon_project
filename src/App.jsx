import Navbar from './Components/Navbar';
import Mainrouting from './Routing/Mainrouting';
import './App.css';

const App = () => {
  return (
    <div className="bg-black text-white min-h-screen font-[Poppins]">
      <Navbar />
      <div className=""><Mainrouting /></div>

    </div>
  );
};

export default App;
