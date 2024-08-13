import { useEffect, useState } from "react";
import "../../App.css";
import Pagination from "../Pagination/Pagination";
import { BarChartBox } from "../BarChartBox/BarChartBox";

const AirportByRegionTable = () => {
  const [airportData, setAirportData] = useState([]);
  const [dataQt, setDataQt] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async () => {
    const url = "https://api-colombia.com/api/v1/Airport";
    const res = await fetch(url);
    const results = await res.json();

    const groupedData = results.reduce((acc, airport) => {
      const { city, department, type } = airport;
      const region = city.region || "Desconocida";
      const departmentName = department.name || "Desconocido";
      const cityName = city.name || "Desconocida";

      if (!acc[region]) {
        acc[region] = {};
      }

      if (!acc[region][departmentName]) {
        acc[region][departmentName] = {};
      }

      if (!acc[region][departmentName][cityName]) {
        acc[region][departmentName][cityName] = {};
      }

      if (!acc[region][departmentName][cityName][type]) {
        acc[region][departmentName][cityName][type] = 0;
      }

      acc[region][departmentName][cityName][type] += 1;
      return acc;
    }, {});

    const dataArray = [];
    Object.entries(groupedData).forEach(([region, departments]) => {
      Object.entries(departments).forEach(([departmentName, cities]) => {
        Object.entries(cities).forEach(([cityName, types]) => {
          Object.entries(types).forEach(([type, count]) => {
            dataArray.push({
              region,
              departmentName,
              cityName,
              type,
              count,
            });
          });
        });
      });
    });

    setAirportData(dataArray);
  };

  useEffect(() => {
    getData();
  }, []);

  const indexEnd = currentPage * dataQt;
  const indexStart = indexEnd - dataQt;
  const nData = airportData.slice(indexStart, indexEnd);
  const nPages = Math.ceil(airportData.length / dataQt);
  return (
    <>
      <div className="sub-content">
        <div className="charts">
          <BarChartBox
            data={airportData}
            dataKey="count"
            xAxisKey="departmentName"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Región</th>
              <th>Departamento</th>
              <th>Ciudad</th>
              <th>Tipo</th>
              <th>Conteo</th>
            </tr>
          </thead>
          <tbody>
            {nData.map(({ region, departmentName, cityName, type, count }) => (
              <tr key={`${departmentName}-${cityName}-${type}`}>
                <td>{region}</td>
                <td>{departmentName}</td>
                <td>{cityName}</td>
                <td>{type}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-content">
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          nPages={nPages}
          setDataQt={setDataQt}
        />
      </div>
    </>
  );
};

export default AirportByRegionTable;
