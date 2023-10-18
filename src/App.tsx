import './App.css';
import Campaign from './component/Campaign';
import Layouts from './layouts';

function App() {
  return (
    <div className="App">
      <Layouts main={ <Campaign/> } />
   
    </div>
  );
}

export default App;
