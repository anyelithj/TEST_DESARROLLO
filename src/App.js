import './App.css';
import { AirportByDepartmentTable } from './component/AirportByDepartmentTable/AirportByDepartmentTable';
import AirportByRegionTable from './component/AirportByRegionTable/AirportByRegionTable';
import { PresidentTable } from './component/PresidentTable/PresidentTable';
import Tabs from './component/Tabs/Tabs';
import { TouristicAttractionTable } from './component/TouristicAttractionTable/TouristicAttractionTable';

function App() {
  return (
    <div>
      <Tabs />
      {/* <PresidentTable/>
      <AirportByDepartmentTable/>
      <AirportByRegionTable/>
      <TouristicAttractionTable/> */}
    </div>
  );
}

export default App;
