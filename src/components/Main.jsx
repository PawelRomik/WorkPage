import React from 'react';
import Location from './Weather.jsx'
import ToDoList from './ToDoList.jsx';
import Notepad from './Notepad.jsx'
import Clock from './Clock.jsx'
import Paint from'./Paint.jsx'
import Calculator from './Calculator.jsx'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            array: this.props.object,
            onOff: false,
            title: '',
            module: false,
            opacity: 0,
            display: 'none',
        }
    }

    hideApp = () => {
        this.setState({
            opacity: 0,
        })
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            },100)
        })
    }


    removeApp = async() => {
        await this.hideApp()
            this.setState({
                display: 'none',
                module: false,
            })
    }

    launchApp=(e)=> {
        this.setState({
            onOff: true,
            title: e.target.getAttribute('data-name'),
            display: 'flex',
        }, function() {
            switch(this.state.title) {
                case "To-Do List":
                    this.setState({
                        module: <ToDoList/>
                    })
                    break;
                case "Notepad": 
                    this.setState({
                        module: <Notepad/>
                    })
                    break;
                case "Clock":
                    this.setState({
                        module: <Clock/>
                    })
                    break;
                case "Paint":
                    this.setState({
                        module: <Paint/>
                    })
                    break;
                case "Calculator":
                    this.setState({
                        module: <Calculator/>
                    })
                    break;
                default:
                    this.setState({
                        module: false
                    })
            }
            setTimeout(() => {
                this.setState({
                    opacity: 100 + "%",
                })
            }, 100);
        })
    }

    showItems() {
        const array = this.state.array.map((elem,index) => <div key={index} data-name={elem.text} className="application" onClick={this.launchApp}><li className={elem.icon + " icon"}></li>{elem.text}</div>)
        return array
    }

    render() {
        
        return <main>
                    <Location/>
                    <div id="container-main">{this.showItems()}</div>
                    <div id="application-container" style={{opacity: this.state.opacity, display: this.state.display}}>
                        <div className="title">
                            <h3>{this.state.title}</h3>
                            <div className="close" onClick={this.removeApp}>X</div>
                        </div>
                        {!this.state.module? '' : this.state.module}
                    </div>
                </main>
    }
}


export default Main