import { useEffect, useState } from 'react';
import '../../App.css';
import Pagination from '../Pagination/Pagination';
import { BarChartBox } from '../BarChartBox/BarChartBox';
import { LineChart } from 'recharts';

export const TouristicAttractionTable = () => {
  const [touristicAttraction, setTouristicAttraction] = useState([]);
  const [dataQt, setDataQt] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async() => {
    const url = "https://api-colombia.com/api/v1/TouristicAttraction";
    const res = await fetch(url);
    const results = await res.json();
    console.log(results, "results");

    const groupedData = {};

    results.forEach((item) => {
      const departmentId = item.city.departmentId || 'Unknown Department';
      const departmentName = `Department-id: ${departmentId}`;
      const cityName = item.city.name || 'Unknown City';

      if (!groupedData[departmentName]) {
        groupedData[departmentName] = {};
      }

      if (!groupedData[departmentName][cityName]) {
        groupedData[departmentName][cityName] = {
          attractions: [],
          count: 0,
        };
      }

      groupedData[departmentName][cityName].attractions.push({
        id: item.id,
        name: item.name,
        description: item.description,
        images: item.images,
        latitude: item.latitude,
        longitude: item.longitude,
      });

      groupedData[departmentName][cityName].count += 1;
    });

    // Convertir groupedData a un array
    const dataArray = [];
    Object.entries(groupedData).forEach(([department, cities]) => {
      Object.entries(cities).forEach(([city, data]) => {
        dataArray.push({
          department,
          city,
          count: data.count,
        });
      });
    });

    setTouristicAttraction(dataArray);
    console.log(dataArray, "touristicAttraction");
  };

  useEffect(() => {
    getData();
  }, []);

  const indexEnd = currentPage * dataQt;
  const indexStart = indexEnd - dataQt;

  // Usar el array para la paginación
  const nData = touristicAttraction.slice(indexStart, indexEnd);
  const nPages = Math.ceil(touristicAttraction.length / dataQt);

  return (
    <>
      <div className='charts'>
        <BarChartBox data={touristicAttraction} />
        <LineChart data={touristicAttraction} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Departamento</th>
            <th>Ciudad</th>
            <th>Conteo</th>
          </tr>
        </thead>
        <tbody>
          {nData.map(({ department, city, count }) => (
            <tr key={`${department}-${city}`}>
              <td>{department}</td>
              <td>{city}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
      <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} nPages={nPages} setDataQt={setDataQt}/>
    </>
  );
};
