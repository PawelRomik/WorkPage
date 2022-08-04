import React from 'react';

if(!localStorage.toDo) localStorage.setItem('toDo', JSON.stringify(['']))

class ToDoList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            arrayOfTasks: [...JSON.parse(localStorage.toDo)].filter(elem => elem !==''),
            task: '',
        };
    }

    handleTaskChange = (e) => {
        this.setState({
            task: e.target.value
        })
    }

    addNewTask = () => {
        if(this.state.task !== '') {
            this.setState({
                arrayOfTasks: [...this.state.arrayOfTasks, this.state.task],
                task: ''
            }, () => {
                localStorage.setItem('toDo', JSON.stringify(this.state.arrayOfTasks))
            })
        } else {
            window.alert('You need to enter the task')
        }
    }

    removeTask = (e) => {
        const array = this.state.arrayOfTasks
        array.splice(e.currentTarget.getAttribute('data-index'), 1)
        this.setState({
            arrayOfTasks: array,
        }, () => {
            localStorage.setItem('toDo', JSON.stringify(this.state.arrayOfTasks))
        })
    }

    showTasks = () => {
        const array = this.state.arrayOfTasks.map((e, i) => <div key={i}><div>{e}</div><button onClick={this.removeTask} data-index={i}><i className="fa-solid fa-check"></i></button></div>)
        return array;
    }

    render() {
        
        return <div id="appBox">
                    <div className="tasks">
                        <div>{this.showTasks()}</div>
                    </div>
                <div className="addTask">
                    <input className="todolist" type="text" placeholder="New Task" value={this.state.task} onChange={this.handleTaskChange}></input>
                    <button onClick={this.addNewTask}>Add</button>
                </div>
            </div>
    }
}

export default ToDoList