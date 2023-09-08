import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
        

const Database = () => {
  const changedPyt = useRef(null);
  const changedOdp = useRef(null);
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleClick = async () => {
    const pytValue = changedPyt.current.value;
    const odpValue = changedOdp.current.value;
    setShowModal(false)
    try {
      const response = await fetch('http://localhost:5000/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: selectedRow.id, pytanie: pytValue, odpowiedz: odpValue }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
  
      const jsonData = await response.json();
      setData(jsonData);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
    fetchData()
  };
  const handleClickDelete = async () => {
    setShowModal(false)
    try {
      const response = await fetch('http://localhost:5000/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: selectedRow.id})
      });
  
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
  
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
    fetchData()
  };
  const openModal = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };


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
        maxWidth: '20px',
        selector: row => row.id,
    },
    {
        name: 'Pytanie',
        selector: row => row.pytanie,
    },
    {
        name: 'Kiedy',
        maxWidth: '160px',
        selector: row => row.kiedy,
    },
    {
        name: 'Streak',
        selector: row => row.streak,
        maxWidth: '20px',
    },
    {
        name: 'Edit',
        button: true,
        cell: (row) => (
          <button onClick={() => openModal(row)} className='py-2 buttonA'>
            Edit
          </button>),
    }
  ];
  return (
    <div>
      <DataTable theme='dark'
          columns={columns}
          data={data}
          pagination
      />
      {showModal && 
        <div className="modal-container">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Edit
                    </h3>
                    <button
                    className="float-right rounded text-red-500 bg-red-300 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClickDelete}>
                    Delete
                  </button>
              </div>
              <div className="relative p-6 flex-auto">
                <div>
                    <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900">Edit:</label>
                    <input ref={changedPyt} type="text" id="small-input" defaultValue={selectedRow.pytanie} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"/>
                    <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900">Edit:</label>
                    <input ref={changedOdp} type="text" id="small-input" defaultValue={selectedRow.odpowiedz} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"/>
                </div>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClick}
                  >
                    Save Changes
                  </button>
                </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Database;