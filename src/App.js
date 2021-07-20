import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const ac = new AbortController();

    fetch('https://jsonplaceholder.typicode.com/comments', {
      signal: ac.signal
    })
      .then(res => res.json())
      .then(res => {
        console.log('res', res);
        setComments(res);
      });

    return () => ac.abort();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Reproduction scenario</h1>
        <ul>
          {comments && <p>Resultats ok</p>}
          {comments &&
            comments.map(comment => <li key={comment.id}>{comment.name}</li>)}
        </ul>
      </header>
    </div>
  );
}

export default App;
