import { useEffect, useState } from "react";
import "../../App.css";
import Pagination from "../Pagination/Pagination";
import { BarChartBox } from "../BarChartBox/BarChartBox";
import { PieCartBox } from "../PieCartBox/PieCartBox";

export const TouristicAttractionTable = () => {
  const [touristicAttraction, setTouristicAttraction] = useState([]);
  const [touristicAttractionPie, setTouristicAttractionPie] = useState([]);
  const [dataQt, setDataQt] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async () => {
    const url = "https://api-colombia.com/api/v1/TouristicAttraction";
    const res = await fetch(url);
    const results = await res.json();

    const groupedData = {};

    results.forEach((item) => {
      const departmentId = item.city.departmentId || "Unknown Department";
      const departmentName = `Department-id: ${departmentId}`;
      const cityName = item.city.name || "Unknown City";

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
  };

  useEffect(() => {
    getData().then(() => {
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

      const dataPartiesArrayPie = touristicAttraction.map((item, index) => ({
        id: `${item.department}-${item.city}-${index}`,
        name: `${item.department}-${item.city}`,
        value: item.count,
        color: colors[index % colors.length],
      }));

      setTouristicAttractionPie(dataPartiesArrayPie);
    });
  }, [touristicAttraction]);

  const indexEnd = currentPage * dataQt;
  const indexStart = indexEnd - dataQt;

  const nData = touristicAttraction.slice(indexStart, indexEnd);
  const nPages = Math.ceil(touristicAttraction.length / dataQt);

  return (
    <>
      <div className="sub-content">
        <div className="charts">
          <BarChartBox
            data={touristicAttraction}
            dataKey="count"
            xAxisKey="city"
          />
          <PieCartBox data={touristicAttractionPie} />
        </div>
        <div className="table-content">
          <table>
            <thead>
              <tr>
                <th>Departamento</th>
                <th>Ciudad</th>
                <th>Conteo</th>
              </tr>
            </thead>
            <tbody>
              {nData.map(({ department, city, count }, index) => (
                <tr key={`${department}-${city}-${index}`}>
                  <td>{department}</td>
                  <td>{city}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
