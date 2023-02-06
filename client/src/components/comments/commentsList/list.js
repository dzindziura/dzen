import React, { useState } from "react"

export const List = (props) => {
    const replies = (id2) => {
        props.idReplies(id2)
    }
    if(props.data === []){
        return (
            <h1>No items</h1>
        )
    }
    const list = props.data.map(item => {
        return (
            <div className={props.left ? 'mt-5 ml-20': 'mt-5'}>
                <div className="comments_head drop-shadow-md grid grid grid-cols-3 lg:grid-cols-3 head_block">
                    <div className="col-start-1 col-end-3 lg:col-end-4 sm:col-end-8 col-start-1 grid sm:grid-cols-7 lg:grid-cols-7">
                        <div className="avatar"><img src='https://cdn-icons-png.flaticon.com/512/147/147144.png' alt="avatar"></img></div>
                        <div className="item"><span className="font-bold mt-2">{item.name}</span></div>
                        <div className="item"><span className="mt-2 absolute">{item.created_at.slice(0,10)}</span></div>
                        <div className="item col-start-3 sm:col-start-3 sm:col-end-5 lg:col-start-4 lg:col-end-7 font-normal"><span>{item.date}</span></div>
                        <div className="col-start-7 col-end-9">
                            <span onClick={() => replies(item.coment_id)} data-id={item.id}><i class="fa fa-hashtag" aria-hidden="true"></i></span>
                            <i class="fa fa-bookmark-o ml-3" aria-hidden="true"></i>
                            <i class="fa fa-arrow-up ml-3" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <div className="comment_block mt-5">
                    {item.content}
                </div>
                {item.replies.length !== 0 ? <List data={item.replies} left={'ml-20'} idReplies={props.idReplies}/> : ''}
            </div>
        )
    })
    return (
        <>
            {list}
        </>
    )
}