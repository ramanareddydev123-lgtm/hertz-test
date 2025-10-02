import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';




// create a mock server - list of github repos
// search, sort, filter, pagination
// debounce - search
// dropdown component

const mockJson = [
  {
    id: 1,
    name: "max-1-abc",
    description: "this is description for repo-1-abc",
    stars: 2,
  },
  {
    id: 2,
    name: "hertz-2-abc",
    description: "this is description for repo-1-abc",
    stars: 3,
  },
  {
    id: 3,
    name: "repo-3-abc",
    description: "this is description for repo-1-abc",
    stars: 1,
  },
  {
    id: 4,
    name: "car-rental-4-abc",
    description: "this is description for repo-1-abc",
    stars: 4,
  },
  {
    id: 5,
    name: "hertz-5-rental-4-abc",
    description: "this is description for repo-1-abc",
    stars: 4,
  },
  {
    id: 6,
    name: "hertz-6-rental-4-abc",
    description: "this is description for repo-1-abc",
    stars: 4,
  },
  {
    id: 7,
    name: "hertz-7-rental-4-abc",
    description: "this is description for repo-1-abc",
    stars: 4,
  },
  {
    id: 8,
    name: "hertz-8-rental-4-abc",
    description: "this is description for repo-1-abc",
    stars: 4,
  },
  {
    id: 9,
    name: "hertz-9-rental-4-abc",
    description: "this is description for repo-1-abc",
    stars: 4,
  }

]

const debounce = (fn, delay) => {

  let timer;

  return (...args) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => fn.apply(this, args), delay);
  }

}


function App() {

  const [githubData, setGithubData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const fetchData = async (searchData, page, filters) => {
    setLoading(true);
    // Simulate API pagination by slicing the data
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = mockJson.slice(startIndex, endIndex);
    setGithubData(paginatedData);
    setLoading(false);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    
    if (value) {
      const filteredData = mockJson.filter((item) => 
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setGithubData(filteredData.slice(0, pageSize));
      setCurrentPage(1);
    } else {
      const initialData = mockJson.slice(0, pageSize);
      setGithubData(initialData);
      setCurrentPage(1);
    }
  }

  const debouncedChange = debounce(handleChange, 300);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  if (loading) {

    return (<div> Loading....</div>);
  }

  const handleOpenDrawer = (item) => {

    setSelectedItem(item);
    setOpenDrawer(true);
  }

  const handleKeyPress = (e) => {

    e.keyPresscode === 13 && handleOpenDrawer();
  }

  return (
    <div className="App">

      <input type="text" placeholder='Search Github Repo' onChange={debouncedChange}/>

      <ul> 
        Github Data
      {
        !loading && githubData.map((item) => { 
          return (
            <li className='list-item' key={item.id} onKeyPress={() => handleKeyPress} onClick={() => handleOpenDrawer(item)}> <span>{item.name}</span> : <span>{item.description}</span></li>
          )
         
        })
      }
      </ul>

      <div>
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        > 
          Prev 
        </button>
        <span style={{margin: '0 10px'}}>
          Page {currentPage} of {Math.ceil(mockJson.length / pageSize)}
        </span>
        <button 
          disabled={currentPage >= Math.ceil(mockJson.length / pageSize)} 
          onClick={() => setCurrentPage(currentPage + 1)}
        > 
          Next 
        </button>
      </div>

      {openDrawer && <Drawer
        anchor='right'
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div style={{width: '400px', padding: '20px'}}>
          <h2> {selectedItem.name} </h2>
          <p> {selectedItem.description} </p>
          <p> Stars : {selectedItem.stars} </p>
        </div>
      </Drawer>
      }
      
    </div>
  );
}

export default App;
