import { useEffect, useState } from 'react';
import '../../App.css';
import Pagination from '../Pagination/Pagination';
import { BarChartBox } from '../BarChartBox/BarChartBox';
import { LineChart } from 'recharts';

export const PresidentTable = () => {
  const [president, setPresident] = useState([]);
  const [dataParties, setDataParties] = useState([]);
  const [dataQt, setDataQt] = useState(7);
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

    const sortedParties = Object.keys(partyCounts).sort((a, b) => partyCounts[b].count - partyCounts[a].count);

    const sortedData = sortedParties.flatMap(party => partyCounts[party].data);
    
    // Convert partyCounts to an array for mapping
    const dataPartiesArray = sortedParties.map(party => ({
      id: party,
      politicalParty: party,
      count: partyCounts[party].count,
    }));
    
    setDataParties(dataPartiesArray);
  }, [president]);

  const indexEnd = currentPage * dataQt;
  const indexStart = indexEnd - dataQt;

  const nData = dataParties.slice(indexStart, indexEnd);
  const nPages = Math.ceil(dataParties.length / dataQt);

  return (
    <>
       <div className='charts'>
        <BarChartBox data={dataParties} />
        <LineChart data={dataParties} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Partido Político</th>
            <th>Conteo</th>
          </tr>
        </thead>
        <tbody>
          {nData.map(data => (
            <tr key={data.id}>
              <td>{data.politicalParty}</td>
              <td>{data.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
   
      <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} nPages={nPages} setDataQt={setDataQt}/>
    </>
  );
};