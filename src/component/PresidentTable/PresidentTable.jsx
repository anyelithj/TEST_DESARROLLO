import { useEffect, useState } from "react";
import "../../App.css";
import Pagination from "../Pagination/Pagination";
import { BarChartBox } from "../BarChartBox/BarChartBox";
import { PieCartBox } from "../PieCartBox/PieCartBox";

export const PresidentTable = () => {
  const [president, setPresident] = useState([]);
  const [dataParties, setDataParties] = useState([]);
  const [dataPartiesArrayPie, setDataPartiesArrayPie] = useState([]);
  const [dataQt, setDataQt] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async () => {
    const url = "https://api-colombia.com/api/v1/President";
    const res = await fetch(url);
    const results = await res.json();
    setPresident(results);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const partyCounts = president.reduce((acc, item) => {
      const party = item.politicalParty.toLowerCase().trim();
      if (!acc[party]) {
        acc[party] = { count: 0, data: [] };
      }
      acc[party].count += 1;
      acc[party].data.push(item);
      return acc;
    }, {});

    const sortedParties = Object.keys(partyCounts).sort(
      (a, b) => partyCounts[b].count - partyCounts[a].count
    );

    const sortedData = sortedParties.flatMap(
      (party) => partyCounts[party].data
    );

    const dataPartiesArray = sortedParties.map((party) => ({
      id: party,
      politicalParty: party,
      count: partyCounts[party].count,
    }));

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

    const dataPartiesArrayPie = sortedParties.map((party, index) => ({
      id: party,
      name: party,
      value: partyCounts[party].count,
      color: colors[index % colors.length],
    }));
    setDataParties(dataPartiesArray);
    setDataPartiesArrayPie(dataPartiesArrayPie);
  }, [president]);

  const indexEnd = currentPage * dataQt;
  const indexStart = indexEnd - dataQt;

  const nData = dataParties.slice(indexStart, indexEnd);
  const nPages = Math.ceil(dataParties.length / dataQt);
  return (
    <>
      <div className="sub-content">
        <div className="charts">
          <BarChartBox
            data={dataParties}
            dataKey="count"
            xAxisKey="politicalParty"
          />
          <PieCartBox
            data={Array.isArray(dataPartiesArrayPie) ? dataPartiesArrayPie : []}
            dataKey="count"
          />
        </div>
        <div className="table-content">
          <table>
            <thead>
              <tr>
                <th>Partido Político</th>
                <th>Conteo</th>
              </tr>
            </thead>
            <tbody>
              {nData.map((data) => (
                <tr key={data.id}>
                  <td>{data.politicalParty}</td>
                  <td>{data.count}</td>
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
