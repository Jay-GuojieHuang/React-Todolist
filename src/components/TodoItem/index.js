import React from 'react'
import './index.scss';
export default function TodoItem(props) {
    const { data, openCheckModal, openEditModal, onCheckChange,deleteTodoItem } = props;
    return (
        <li className="todo-item">
            <div className="check-box">
                <input type="checkbox" checked={data.completed} onChange={()=>onCheckChange(data.id)} />
            </div>
            <span className="content" 
            style={{ 'textDecoration': data.completed ? 'line-through' : 'none' }}
            onClick={()=>{onCheckChange(data.id)}}
            >
                { data.content }
            </span>
            <div className="btn-group">
                <button className="btn btn-primary"
                onClick={()=> {openCheckModal(data.id)}}
                >查看</button>
                <button className="btn btn-warning"
                onClick={()=> {openEditModal(data.id)} }>编辑</button>
                <button className="btn btn-danger" 
                onClick={()=>deleteTodoItem(data.id)}
                >删除</button>
            </div>
        </li>
    )
}
