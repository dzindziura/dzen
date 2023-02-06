import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios'; 
import { Comments } from './components/comments/comments'
import {useEffect, useState} from 'react';

const App = () => {
  const [arrayDataOldFormat, setArrayDataOldFormat] = useState([]);
  const [dataComment, setDataComment] = useState([]);
  function transformArray(inputArray) {
    const commentMap = {};

    inputArray.forEach(comment => {
      comment.replies = []
      commentMap[comment.coment_id] = comment;
    });

    inputArray.forEach(comment => {
      const parentComment = commentMap[comment.id_replies];
      if (parentComment) {
        parentComment.replies.push(comment);
      }
    });

    return inputArray.filter(comment => !comment.id_replies);
  }
  const getMessages = async () => {
    const result = await axios.get('http://localhost:5000/getAllComments');
    setArrayDataOldFormat(result.data)
    const inputArrayResult = transformArray(result.data);

    setDataComment(inputArrayResult);
  }
  useEffect(() => {
    getMessages();

  }, [])
  const addNewComment = async (data, id = null) => {
    const dataPush = {
      user_id: data.user_id,
      content: data.content,
      id_replies: id
    }
    await axios.post('http://localhost:5000/comments', dataPush);
    getMessages();
  }

  return (
    <div className="App">
      <Comments data={dataComment} addNewComment={addNewComment}/>
    </div>
  );
}

export default App;
