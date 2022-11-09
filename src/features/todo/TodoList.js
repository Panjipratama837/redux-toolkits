import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './todo.css'
// import { addTodo } from './todoSlice'

import {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} from '../api/apiSlice'


const TodoList = () => {
    const [title, setTitle] = useState('')

    // const todos = useSelector((state) => state.todo.todos)
    // const dispatch = useDispatch()

    const color = [
        'aqua',
        'yellow',
        'hotpink',
    ]


    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTodosQuery()

    useEffect(() => {
        if (todos !== undefined) {
            checkTodos()
            checkCompletedTodos()
        }

    }, [])

    const checkTodos = () => {
        const filterNotCompleted = todos.filter((todo) => todo.completed === false)
        return filterNotCompleted.length
    }

    const checkCompletedTodos = () => {
        const filterCompleted = todos.filter((todo) => todo.completed === true)
        return filterCompleted.length
    }






    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()


    console.log('todos', todos)

    // console.log("Redux todo : ", todos)

    const todoNotCompleted = () => {
        const filterNotCompleted = todos.filter((todo) => todo.completed === false)
        const displayNotCompleted = filterNotCompleted.map((todo, index) => {
            return (
                <>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '10px',
                        backgroundColor: color[index % 3],
                        padding: '10px',
                    }} key={todo.id}>
                        <h4 style={{
                            margin: 'auto 0',
                        }}>{todo.title}</h4>
                        {/* <button onClick={() => {
                            updateTodo({
                                id: todo.id,
                                title: todo.title,
                                completed: !todo.completed,
                            })
                        }} >Done</button> */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '10px',
                        }}>
                            <i style={{
                                color: 'green',
                                cursor: 'pointer',
                                fontSize: '30px',
                            }} onClick={() => {
                                updateTodo({
                                    id: todo.id,
                                    title: todo.title,
                                    completed: !todo.completed,
                                })
                            }} class="bi bi-check"></i>
                        </div>
                    </div>


                </>
            )
        })

        return displayNotCompleted
    }

    const todoCompleted = () => {
        const filterCompleted = todos.filter((todo) => todo.completed === true)
        const displayCompleted = filterCompleted.map((todo, index) => {
            return (
                <>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '10px',
                        backgroundColor: color[index % 3],
                        padding: '10px',
                    }} key={todo.id}>
                        <h4 style={{
                            margin: 'auto 0',
                        }}>{todo.title}</h4>

                        <i style={{
                            color: 'red',
                            cursor: 'pointer',
                            fontSize: '30px',
                        }} onClick={() => {
                            deleteTodo(todo.id)
                        }} class="bi bi-trash-fill"></i>
                    </div>


                </>
            )
        })

        return displayCompleted
    }

    // const filterCompleted = todos.filter((todo) => todo.completed === true)
    // const displayCompleted = filterCompleted.map((todo) => {
    //     return (
    //         <div style={{
    //             display: 'flex',
    //             justifyContent: 'space-between',
    //             marginTop: '10px'
    //         }} key={todo.id}>
    // <h4>{todo.title}</h4>
    // <button onClick={() => {
    //     deleteTodo(todo.id)
    // }} >Delete</button>
    //         </div>
    //     )
    // })


    // let content;
    // if (isLoading) {
    //     content = <p>Loading...</p>
    // } else if (isSuccess) {
    //     content = todos.map((todo) => (
    //         <div style={{
    //             display: 'flex',
    //             justifyContent: 'space-between',
    //             marginTop: '10px'
    //         }} key={todo.id}>
    //             <h4>{todo.title}</h4>
    //             <button onClick={() => {
    //                 updateTodo({
    //                     id: todo.id,
    //                     title: todo.title,
    //                     completed: !todo.completed,
    //                 })
    //             }} >Done</button>
    //         </div>
    //     ))

    // } else if (isError) {
    //     content = <p>{error}</p>
    // }


    // console.log("Completed : ", filterCompleted);
    // console.log("Not Completed : ", filterNotCompleted);

    return (
        <>
            <h1 style={{
                textAlign: 'center',
                paddingTop: '20px',
                paddingBottom: '20px'
            }}>Todo List</h1>

            <div style={{
                width: '50%',
                margin: '0 auto',
                border: '3px solid black'
            }}>
                <div style={{
                    padding: '20px',
                }}>
                    <div style={{
                        borderBottom: '1px solid black',
                        paddingBottom: '10px'
                    }}>
                        <label for="todo">
                            Add Todo :
                            <input style={{
                                width: '100%',
                                padding: '10px',
                                marginTop: '10px',
                            }} value={title} onChange={(e) => {
                                setTitle(e.target.value)

                            }} onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addTodo({
                                        id: Date.now(),
                                        title: title,
                                        completed: false
                                    })
                                    setTitle('')
                                }
                            }} placeholder="Input your todo list" type="text" />
                        </label>
                    </div>
                    {/* header */}
                    <div style={{
                        marginTop: "20px"
                    }}>
                        <div style={{
                            borderBottom: '3px solid black',
                            paddingBottom: '10px'
                        }}>
                            <h1>New Task</h1>
                        </div>

                        <div>
                            {/* <p>Task Orbit</p> */}
                            {/* {todos ? displayNotCompleted : <p>No Task</p>} */}
                            {todos === undefined && <p>loading ....</p>}
                            {todos && checkTodos() > 0 ? todoNotCompleted() : <p>No Task</p>}
                        </div>
                    </div>

                    <div style={{
                        marginTop: "20px"
                    }}>
                        <div style={{
                            borderBottom: '3px solid black',
                            paddingBottom: '10px'
                        }}>
                            <h1>Completed Task</h1>
                        </div>

                        <div>
                            {todos === undefined && <p>loading ....</p>}
                            {todos && checkCompletedTodos() > 0 ? todoCompleted() : <p>No Completed Task</p>}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default TodoList