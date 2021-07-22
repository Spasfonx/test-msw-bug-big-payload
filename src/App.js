import logo from './logo.svg';
import './App.css';
import useFetch from 'use-http'

function App() {
  const { data: comments } = useFetch('https://jsonplaceholder.typicode.com/comments', {}, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Reproduction scenario</h1>
        <ul>
          {comments && <p>Resultats ok</p>}
          {comments &&
            comments.map((comment, i) => <li key={i}>{comment.name}</li>)}
        </ul>
      </header>
    </div>
  );
}

export default App;
