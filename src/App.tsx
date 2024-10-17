import Navbar from './components/Navbar';
import Discussion from './components/Discussion';
import './App.css'; // Assuming you are still using Tailwind

function App() {
  return (
    <>
      <div className="min-h-screen bg-gunmetal mx-64">
        {/* Navbar Component */}
        <Navbar />

        {/* Main Discussion Section */}
        <div className="p-4">
          <Discussion />
        </div>
      </div>
    </>
  );
}

export default App;
