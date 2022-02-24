import React, { useImperativeHandle, useRef } from 'react';
import './index.scss'

function AddInput(props) {

    const { isInputShow, addItem } = props,
    inputRef = useRef();
    const submitValue = () => {
        const inputValue = inputRef.current.value.trim();
        if (inputValue.length === 0) {
            return
        }
        // console.log(inputValue)
        addItem(inputValue);
        inputRef.current.value = '';
    }
    return (
<>
{
    isInputShow
    ?
    (
        <div className='input-wrapper'>
            <input 
            type ="text"
            placeholder='请输入待办事项'
            ref = {inputRef}
            />
            <button className='btn btn-primary'
            onClick={submitValue}
            >添加</button>
        </div>
    )
    :
    ''
}
</>
    );

}


export default AddInput;