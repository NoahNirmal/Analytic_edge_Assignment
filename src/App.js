import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Grid } from './components/Grid';
import { Comments } from './components/Comments';
// import Datagrid from './components/Datagrid';

function App() {
  return (
    <div className="app">
      {/* <Datagrid /> */}
      <Routes>
        <Route  path='/' element={<Grid />}/>
        <Route  path='/comments/:id' element={<Comments/>}/>
      
      </Routes>
      
    
    </div>
  );
}

export default App;
