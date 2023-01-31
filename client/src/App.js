import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios'; 
import { Comments } from './components/comments/comments'
import { useEffect } from 'react';
const App = () => {
  const getMessages = () => {
    axios.get('http://localhost:4000/getAllComments', (res) => {
      console.log(res);
    })
  }
  useEffect(() => {
    getMessages();
    console.log('useEffect')
  })
  return (
    <div className="App">
      <Comments />
    </div>
  );
}

export default App;
