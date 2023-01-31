import './comment.scss'
import { useEffect, useState } from 'react'
import { List } from './commentsList/list'
import { AddCommentForm } from './addCommentForm/addCommentForm'
export const Comments = () => {
    const comments = [
        {
            id: 213,
            avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
            comment: "2",
            name: 'Alex',
            date: '22.05.22 в 22:30',
            allow_reply: true,
            level: 1,
            replies: [
                {
                    id: 51,
                    avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
                    comment: "1",
                    name: 'Alex',
                    date: '22.05.22 в 22:30',
                    allow_reply: true,
                    level: 2,
                    replies: [
                        {
                            id: 2131,
                            avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
                            comment: "Поздравляю и желанию дальнейшего процветания. Успехов и всего самого наилучшего. Ваша новость еще раз свидетельство того, что все под силу изменить, если нас много и мы едины.",
                            name: 'Alex',
                            date: '22.05.22 в 22:30',
                            allow_reply: true,
                            level: 3,
                            replies: [],
                        }
                    ]
                },
                {
                    id: 123,
                    avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
                    comment: "Поздравляю и желанию дальнейшего процветания. Успехов и всего самого наилучшего. Ваша новость еще раз свидетельство того, что все под силу изменить, если нас много и мы едины.",
                    name: 'Alex',
                    date: '22.05.22 в 22:30',
                    allow_reply: true,
                    level: 2,
                    replies: []
                },
            ]
        },
        {
            id: 92241,
            avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
            comment: "Поздравляю и желанию дальнейшего процветания. Успехов и всего самого наилучшего. Ваша новость еще раз свидетельство того, что все под силу изменить, если нас много и мы едины.",
            name: 'Alex',
            date: '22.05.22 в 22:30',
            allow_reply: true,
            level: 1,
            replies: []
        }
    ]

    const [dataComments, setDataComments] = useState(comments);
    const setData = (e, id, level) => {
        let newElement = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
        let arr = [];
        for (let i = 0; i < level - 1; i++) {
            newElement = newElement.parentNode
            arr.push(newElement.getAttribute('data-id'));
        }
        arr.unshift(id)
        console.log(arr)
        // let newObj = {};
        // const obj = (arrObj = comments) => {
        //     arrObj.map(item => {
        //         if (item.id == arr[arr.length - 1]) {
        //             arr.splice(arr.length - 1, 1)
        //             if (arr.length !== 0) {
        //                 return obj(item.replies);
        //             } else {
        //                 return null
        //             }
        //         }
        //     })
        // }
        // obj()
    }
    const pushNewData = (data) => {
        console.log(data)
        const newData2 = {
            id: 922312,
            avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
            comment: data.comment,
            name: data.username,
            date: '22.05.22 в 22:30',
            allow_reply: true,
            level: 1,
            replies: []
        }
        setDataComments(prevItems => {
            return [...prevItems, newData2]
        })
        // dataComments.push({
        //         id: 9221,
        //         avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
        //         comment: data.comment,
        //         name: data.username,
        //         date: '22.05.22 в 22:30',
        //         allow_reply: true,
        //         level: 1,
        //         replies: []
        // })
        // const newData = dataComments;
        // setDataComments(newData);
    }
    return (
        <div className="container mx-auto mt-10">
            <AddCommentForm send={pushNewData}/>
            <div className="wrapper mx-auto">
                <List data={dataComments} setData={setData} />
            </div>
        </div>
    )
}