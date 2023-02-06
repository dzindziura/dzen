import './comment.scss'
import { useEffect, useState } from 'react'
import { List } from './commentsList/list'
import { AddCommentForm } from './addCommentForm/addCommentForm'
export const Comments = ({data, addNewComment, addReplies}) => {
    const [idRepliesComment, setIdRepliesComment] = useState();
    const [form, setForm] = useState(false);
    const pushNewData = (data) => {
        addNewComment(data, idRepliesComment);
        setForm(false)
        setIdRepliesComment(null)
    }
    const idReplies = (id) => {
        setForm(true)
        setIdRepliesComment(id)
    }
    return (
        <div className="container mx-auto mt-10">
            <button onClick={() => setForm(!form)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {form ? 'Close form' : 'Open form'}
            </button>
            <AddCommentForm send={pushNewData} form={form}/>
            <div className="wrapper mx-auto">
                <List data={data} idReplies={idReplies}/>
            </div>
        </div>
    )
}