import { useEffect, useState } from 'react';
import '../../App.css';
import Pagination from '../Pagination/Pagination';

export const AirportByDepartmentTable = () => {
  const [airportData, setAirportData] = useState({}); 
  const [dataQt, setDataQt] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);


  const getData = async () => {
    try {
      const url = "https://api-colombia.com/api/v1/Airport";
      const res = await fetch(url);
      const results = await res.json();
      
      const groupedData = results.reduce((acc, airport) => {
        const { department, city } = airport;

        if (!acc[department.name]) {
          acc[department.name] = {};
        }

        if (!acc[department.name][city.name]) {
          acc[department.name][city.name] = {
            airports: [],
            count: 0
          };
        }

        acc[department.name][city.name].airports.push({
          id: airport.id,
          name: airport.name,
          type: airport.type,
          iataCode: airport.iataCode
        });
        acc[department.name][city.name].count += 1;

        return acc;
      }, {});


      setAirportData(groupedData);
      // console.log(airportData, "airportData")
    } catch (error) {
      console.error("Error fetching airport data: ", error);
    }
  };

  useEffect(() => {
    getData(); 
  }, []);
  const indexEnd = currentPage * dataQt;
  const indexStart = indexEnd - dataQt;

  const nData = airportData.slice( indexStart, indexEnd);
  const nPages = Math.ceil(airportData.length / dataQt) 
  // console.log(airportData, "airportData after setting");

  return (
    <>
    <table>
      <thead>
        <tr>
          <th>Departamento</th>
          <th>Ciudad</th>
          <th>Conteo</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(airportData).map(([department, cities]) =>
          Object.entries(cities).map(([city, data]) => (
            <tr key={`${department}-${city}`}>
              <td>{department}</td>
              <td>{city}</td>
              <td>{data.count}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} nPages={nPages} setDataQt={setDataQt}/>
    </>
  );
}
