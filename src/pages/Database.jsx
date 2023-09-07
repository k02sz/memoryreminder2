import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
        

const Database = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/all');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
        name: 'ID',
        selector: row => row.id,
    },
    {
        name: 'Pytanie',
        selector: row => row.pytanie,
    },
    {
      name: 'Kiedy',
      selector: row => row.kiedy,
  },
  {
      name: 'Streak',
      selector: row => row.streak,
  },
  ];
  return (
    <DataTable theme='dark'
        columns={columns}
        data={data}
    />
  );
};

export default Database;