import { useEffect, useState } from "react";
import "../../App.css";
import Pagination from "../Pagination/Pagination";
import { BarChartBox } from "../BarChartBox/BarChartBox";
import { PieCartBox } from "../PieCartBox/PieCartBox";

export const AirportByDepartmentTable = () => {
  const [airportData, setAirportData] = useState({});
  const [airportDataPie, setAirportDataPie] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [dataQt, setDataQt] = useState(5);
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
            count: 0,
          };
        }

        acc[department.name][city.name].airports.push({
          id: airport.id,
          name: airport.name,
          type: airport.type,
          iataCode: airport.iataCode,
        });
        acc[department.name][city.name].count += 1;

        return acc;
      }, {});

      setAirportData(groupedData);
    } catch (error) {
      console.error("Error fetching airport data: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const barChartDataArray = Object.entries(airportData).flatMap(
      ([department, cities]) =>
        Object.entries(cities).map(([city, data]) => ({
          name: `${department} - ${city}`,
          count: data.count,
        }))
    );

    setBarChartData(barChartDataArray);

    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FF33A8",
      "#FF8C33",
      "#33FFF5",
      "#FF33D1",
      "#B833FF",
      "#FFAF33",
      "#33FF9A",
    ];

    const dataPartiesArrayPie = Object.entries(airportData).map(
      ([department, cities], index) => ({
        id: department,
        name: department,
        value: Object.values(cities).reduce((acc, city) => acc + city.count, 0),
        color: colors[index % colors.length],
      })
    );

    setAirportDataPie(dataPartiesArrayPie);
  }, [airportData]);

  const indexEnd = currentPage * dataQt;
  const indexStart = indexEnd - dataQt;

  const nData = Object.entries(airportData).slice(indexStart, indexEnd);
  const nPages = Math.ceil(Object.keys(airportData).length / dataQt);

  return (
    <>
      <div className="content_panel">
        <div className="content_panel__charts">
          <BarChartBox data={barChartData} dataKey="count" xAxisKey="name" />
          <PieCartBox data={airportDataPie} />
        </div>
        <div className="content_panel__table">
          <table className="content_panel__table-content">
            <thead>
              <tr>
                <th>Departamento</th>
                <th>Ciudad</th>
                <th>Conteo</th>
              </tr>
            </thead>
            <tbody>
              {nData.map(([department, cities]) =>
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
        </div>
      </div>
      <div className="content_panel__pagination">
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
