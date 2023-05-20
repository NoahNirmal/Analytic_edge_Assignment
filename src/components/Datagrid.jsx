import React, { useState, useEffect } from 'react';

const Datagrid = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const fetchData = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10&q=${searchTerm}`);
    const data = await response.json();
    console.log(data)
    const totalCount = response.headers.get('X-Total-Count');
    console.log(totalCount)

    setPosts(data);
    setTotalPages(Math.ceil(totalCount / 10));
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <div>
        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." />
        <input type="text" value={filterValue} onChange={handleFilterValueChange} placeholder="Filter Value" />
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('userId')}>User ID</th>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('body')}>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.userId}</td>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Datagrid;
