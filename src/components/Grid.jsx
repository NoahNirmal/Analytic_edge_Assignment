import React, { useEffect, useState } from 'react';
import './Grid.css';
import { useNavigate } from 'react-router-dom';

export const Grid = () => {
  const [dataapi, setDataapi] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    searchTitle();
  }, [searchValue]);

  async function fetchUsers() {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`);
      const data = await res.json();
      const totalCount = res.headers.get('X-Total-Count');
      setDataapi(data);
      setFilterdata(data);
      setTotalPages(Math.ceil(totalCount / 10));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const searchTitle = () => {
    if (searchValue) {
      setFilterdata([...dataapi.filter((ele) => ele.title.toLowerCase().includes(searchValue.toLowerCase()))]);
      setTotalPages(Math.ceil(filterdata.length / 10));
      setCurrentPage(1);
    } else {
      fetchUsers();
    }
  };

  return (
    <div className='Grid_Container'>
      <div className='Filter_container'>
        <h1>Posts</h1>
        <input type="text" placeholder="Search..." onChange={(e) => {
          setSearchValue(e.target.value);
        }} />
      </div>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : filterdata?.map((ele) => (
            <tr onClick={() => {
              navigate(`/Comments/${ele.userId}`);
            }} key={ele.id}>
              <td>{ele.userId}</td>
              <td>{ele.id}</td>
              <td>{ele.title}</td>
              <td>{ele.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='paginations'>
        <button onClick={() => {
          setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        }} disabled={currentPage === 1}>Previous</button>
        <span>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((ele) => (
            <button
              className='numbers'
              key={ele}
              onClick={() => {
                setCurrentPage(ele);
              }}
            >
              {ele}
            </button>
          ))}
        </span>
        <button onClick={() => {
          setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
        }} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};
