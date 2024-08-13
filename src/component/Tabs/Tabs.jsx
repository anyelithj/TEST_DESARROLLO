import { useState } from "react";
import "../../App.css";
import { PresidentTable } from "../PresidentTable/PresidentTable";
import AirportByRegionTable from "../AirportByRegionTable/AirportByRegionTable";
import { TouristicAttractionTable } from "../TouristicAttractionTable/TouristicAttractionTable";
import { AirportByDepartmentTable } from "../AirportByDepartmentTable/AirportByDepartmentTable";

const tabsData = [
  { id: "president", title: "Presidentes " },
  { id: "touristicAttraction", title: "Atracciones turísticas" },
  { id: "airportDepartment", title: " Aeropuertos por departamento" },
  { id: "airportRegion", title: "Aeropuertos por región" },
];
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("president");

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div id="container">
      <div className="tabs__buttons">
        {tabsData.map((tab) => (
          <button
            key={tab.id}
            className={`tabs__button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="tabs__contents">
        {tabsData.map((tab) => (
          <div
            key={tab.id}
            className={`tabs__content ${activeTab === tab.id ? "show" : ""}`}
            id={tab.id}
          >
            <div className="tabs__info">
              <h1 className="tabs__title">Gráficos</h1>
              {tab.id === "president" && <PresidentTable />}
              {tab.id === "touristicAttraction" && <TouristicAttractionTable />}
              {tab.id === "airportDepartment" && <AirportByDepartmentTable />}
              {tab.id === "airportRegion" && <AirportByRegionTable />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

