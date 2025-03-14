import React, { useState } from 'react';
import './form.css';

let Form = () => {
    let [list, setList] = useState([]);

    let AddToList = (event) => {
        if (event.target.value !== ""){

        setList([...list, { id: Date.now(), value: event.target.value, selected: false }]);
        event.target.value = '';   
    }
    console.log(list)
    };

    let toggleSelection = (id) => {
        let newList = list.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        );
        setList(newList);
    };

    let removeSelectedItems = () => {
        setList(list.filter(item => !item.selected));
    };

    let toggleSelectAll = () => {
        let allSelected = list.every(item => item.selected);
        setList(list.map(item => ({ ...item, selected: !allSelected })));
    };

    let removeItem = (id) => {
        setList(list.filter(item => item.id !== id));
    };

    let List = list.map((item) => (
        <div className='listitem1' key={item.id}>
            <input
                type='checkbox'
                className='item-checkbox'
                checked={item.selected}
                onChange={() => toggleSelection(item.id)}
            />
            {item.selected &&
              (<strike><li className='listitem2'>{item.value}</li></strike>)  } 
            {!item.selected  &&
              (<li className='listitem'>{item.value}</li>)  } 
            { item.selected  &&
               ( <button className='remove-this' onClick={() => removeItem(item.id)}>x</button>)} 
        </div>
    ));

    let Bottom = () => {
        if (list.length > 0) {
            let selectedItems = list.filter(item => item.selected).length;
            return (
                <div id='footer1'>
                    <p id='count'>{list.length} items left</p>
                    <button id='all'>All</button>
                    <button id='active'>Active</button>
                    <button id='completed'>Completed</button>
                    {selectedItems > 0 && (
                        <button id='remove-selected' onClick={removeSelectedItems}>
                            Clear completed
                        </button>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className='box1'>
            <div >
                <input
                    className='select-all'
                    type='checkbox'
                    onChange={toggleSelectAll}
                    checked={list.length > 0 && list.every(item => item.selected)}
                />
                <input  id="input" onKeyDown={(event) => event.key === 'Enter' && AddToList(event)}/>
            </div>
            <div>{List}</div>
            <Bottom />
        </div>
    );
};

export default Form;