import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios'; 
import { Comments } from './components/comments/comments'
import { useEffect } from 'react';
const App = () => {
  function transformArray(inputArray) {
    const commentMap = {};

    // Create a map of comments
    inputArray.forEach(comment => {
      comment.replies = []
      commentMap[comment.coment_id] = comment;
    });

    // Link the replies
    inputArray.forEach(comment => {
      const parentComment = commentMap[comment.id_replies];
      if (parentComment) {
        parentComment.replies.push(comment);
      }
    });

    // Return the root comments (comments with no parent)
    return inputArray.filter(comment => !comment.id_replies);
  }
  useEffect(() => {
    const getMessages = async () => {
      const result = await axios.get('http://localhost:5000/getAllComments');
      // console.log(result.data)
      const inputArrayResult = transformArray(result.data);

      console.log(inputArrayResult)
    }
    getMessages();
  })
  return (
    <div className="App">
      <Comments />
    </div>
  );
}

export default App;
