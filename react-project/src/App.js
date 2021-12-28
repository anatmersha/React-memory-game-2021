import './App.css';
import MemoryGame from "./Components/MemoryGame";

function App() {
  return (
    <div className="App" 
    // style={{
    //   backgroundImage:"url(https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIyfHxiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60)"
    //   ,backgroundSize: "contain",
    //   width: "80%",
    //   marginLeft: "200px"
    //   }}
      >
     <MemoryGame/>
    </div>
  );
}

export default App;
