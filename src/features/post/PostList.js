import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPost } from './postSlice'

const PostList = () => {
    const posts = useSelector((state) => state.post.posts)
    const dispatch = useDispatch()
    const [data, setData] = useState({
        name: '',
        email: '',
    })


    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(addPost(data))
        setData({
            name: '',
            email: '',
        })
    }

    console.log("Redux post : ", posts)

    return (
        <div>
            <h1>Post List</h1>
            <label for="name">
                Name :
                <input type="text" value={data.name} onChange={(e) => {
                    setData({
                        ...data,
                        name: e.target.value
                    })
                }} />
            </label>
            <label for="email">
                email :
                <input type="text" value={data.email} onChange={(e) => {
                    setData({
                        ...data,
                        email: e.target.value
                    })
                }} />
            </label>
            <button type='submit' onClick={onSubmit}>Submit</button>
        </div>
    )
}

export default PostList