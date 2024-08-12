import { useState } from 'react'
import '../../App.css';
import { PresidentTable } from '../PresidentTable/PresidentTable';
import AirportByRegionTable from '../AirportByRegionTable/AirportByRegionTable';
import { TouristicAttractionTable } from '../TouristicAttractionTable/TouristicAttractionTable';


const tabsData = [
    { id: 'president', title: 'President' },
    { id: 'airport', title: 'Airport' },
    { id: 'touristicAttraction', title: 'TouristicAttraction'},
  ];
const Tabs = () => {
    const [activeTab, setActiveTab] = useState('president');

  const handleTabClick = (id) => {
    setActiveTab(id);
  };


  return (
    <div id="container">
    <div className="tab-buttons">
      {tabsData.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.title}
        </button>
      ))}
    </div>

    <div className="tab-contents">
        {tabsData.map((tab) => (
          <div
            key={tab.id}
            className={`content ${activeTab === tab.id ? 'show' : ''}`}
            id={tab.id}
          >
            <div className="infos">
              <h1 className="content-title">{tab.title}</h1>
              {tab.id === 'president' && <PresidentTable/>}
              {tab.id === 'airport' && <AirportByRegionTable/>}
              {tab.id === 'touristicAttraction' && <TouristicAttractionTable />}
            </div>
          </div>
        ))}
      </div>
  </div>
  );
}

export default Tabs