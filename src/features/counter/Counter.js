import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount, resetCount, setTitle } from './counterSlice'

const Counter = () => {
    const count = useSelector((state) => state.counter.count)
    const title = useSelector((state) => state.counter.title)

    const dispatch = useDispatch()

    const [incrementAmount, setIncrementAmount] = useState(0)
    const [judul, setJudul] = useState('')

    const addValue = Number(incrementAmount) || 0


    const handleIncrement = () => {
        dispatch(increment())
    }
    const handleDecrement = () => {
        dispatch(decrement())
    }

    const handleReset = () => {
        setIncrementAmount(0)
        dispatch(resetCount())
    }


    return (
        <div>
            <h1>{title}</h1>
            <h3>{count}</h3>
            <button style={{
                marginRight: '10px'
            }} onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <button style={{
                marginLeft: '10px'
            }} onClick={handleReset} >Reset</button>

            <div>
                <input type='text' value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)} />
            </div>
            <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
            <div>
                <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} />
                <button onClick={() => {
                    dispatch(setTitle(judul))
                    setJudul('')
                }} >Change Title</button>
            </div>
        </div>
    )
}

export default Counter