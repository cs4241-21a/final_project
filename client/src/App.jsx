import { useEffect, useState } from 'react';
import './App.css';

import PTag from './components/PTag';

function App() {

  const [state, setState] = useState({ hello: "what" });

  useEffect(() => {
    const callback = async () => {
      const res = await fetch(`http://localhost:3001/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        }
      });

      const data = await res.json();
      setState({
        ...state,
        hello: data.hello
      });
    }

    callback();

  });

  return (
    <div className="App">
      <header className="App-header">
        {
          <p>{state.hello}</p>
        }

        <PTag foo={'bar'} />

      </header>
    </div>
  );
}

export default App;
