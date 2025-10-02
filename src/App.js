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
    // const res = await fetch('https://api.github.com/users/octocat/repos');
    // const data = await res.json();

    const splicedData = mockJson.splice(0, 2);
    console.log();
    setGithubData(splicedData)
    setLoading(false);
    // console.log(data);  
  }

  const handleChange = (e) => {

    const value = e.target.value;

    if (value){
      const tempGithubData = githubData.filter((item) => item.name.includes(value));
      setGithubData(tempGithubData);
    } else {
      setGithubData(mockJson)
    }
    // fetchData(value, 0, {});

  }

  const debouncedChange = debounce(handleChange, 300);

  useEffect(() => {

    fetchData();

  },[]);

  useEffect(() => {

    if (currentPage) {
      const splicedData = mockJson.splice(currentPage, 2);
      setGithubData(prevdata=> [...prevdata, ...splicedData])
    }
    
  }, [currentPage])

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
        <button disabled={currentPage === 1} onClick={() => { setCurrentPage(currentPage - 1)}}> Prev </button>
        <button disabled={(currentPage * pageSize) >= githubData.length} onClick={() => { setCurrentPage(currentPage + 1)}}> Next </button>
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
