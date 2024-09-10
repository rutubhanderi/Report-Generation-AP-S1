import './App.css';
import DashboardCards from './components/dashboardcards';
//import Footer from './components/footer';
import MainTitle from './components/maintitle';
import NavigationBar from './components/navigation';
import VisionMission from './components/visionmission';

function App() {
  return (
    <>
      <NavigationBar/>
      <MainTitle/>
      
      <DashboardCards/>
      <VisionMission/>
       {/* <Footer/> */}
    </>
  );
}

export default App;
