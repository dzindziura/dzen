import React, { useState } from "react"

export const List = (props) => {
    const replies = (e, id, level) => {
        props.setData(e, id, level);
    }

    const list = props.data.map(item => {
        return (
            <div data-id={item.id} className={props.left ? 'mt-5 ml-20': 'mt-5'}>
                <div className="comments_head drop-shadow-md grid grid grid-cols-3 lg:grid-cols-3 head_block">
                    <div className="col-start-1 col-end-3 lg:col-end-4 sm:col-end-8 col-start-1 grid sm:grid-cols-8 lg:grid-cols-8">
                        <div className="avatar"><img src={item.avatar} alt="avatar"></img></div>
                        <div className="item"><span className="font-bold mt-2">{item.name}</span></div>
                        <div className="item col-start-3 sm:col-start-3 sm:col-end-5 lg:col-start-4 lg:col-end-7 font-normal"><span>{item.date}</span></div>
                        <div className="col-start-7 col-end-9">
                            <span onClick={(e) => replies(e, item.id, item.level)} data-id={item.id}><i class="fa fa-hashtag" aria-hidden="true"></i></span>
                            <i class="fa fa-bookmark-o ml-3" aria-hidden="true"></i>
                            <i class="fa fa-arrow-up ml-3" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <div className="comment_block mt-5">
                    {item.comment}
                </div>
                {item.replies.length !== 0 ? <List data={item.replies} left={'ml-20'} setData={props.setData}/> : ''}
            </div>
        )
    })
    return (
        <>
            {list}
        </>
    )
}