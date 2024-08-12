import { useEffect, useState } from 'react';
import '../../App.css';
import Pagination from '../Pagination/Pagination';
import { BarChartBox } from '../BarChartBox/BarChartBox';
import { LineChart } from 'recharts';

export const PresidentTable = () => {
  const [president, setPresident] = useState([]);
  const [dataQt, setDataQt] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);


const getData = async () => {
    const url = "https://api-colombia.com/api/v1/President";
    const res = await fetch(url);
    const results = await res.json();
    setPresident(results)
};

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
// console.log(sortedParties, "sortedParties");


const sortedData = sortedParties.flatMap(party => partyCounts[party].data);
// console.log(sortedData, "sortedData");

// return sortedData;
  useEffect(() => {
    getData();
  }, [])
  const indexEnd = currentPage * dataQt;
  const indexStart = indexEnd - dataQt;

  const nData = sortedData.slice( indexStart, indexEnd);
  const nPages = Math.ceil(sortedData.length / dataQt) 
  return (
    <>
    <table>
    <thead>
      <tr>
        <th>Presidente</th>
        <th>Partido Político</th>
        <th>Conteo</th>
      </tr>
    </thead>
    <tbody>
      {nData.map(data => (
        <tr key={data.id}>
          <td>{data.name}</td>
          <td>{data.politicalParty}</td>
          {/* <td>{data}</td> */}
        </tr>
      ))}
    </tbody>
    </table>
    <div className='charts'>
    <BarChartBox data={sortedData} />
    <LineChart  data={sortedData}/>
    </div>
    <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} nPages={nPages} setDataQt={setDataQt}/>
    </>
    

  )
}

