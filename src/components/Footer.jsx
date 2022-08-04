import React from 'react';

class DateTaskBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date()
        }
    }

    componentDidMount = () => {
        this.timeInterval = setInterval(() => {
            this.setState({
                time: new Date(),
                hour: this.state.time.getHours() <10 ? "0" + this.state.time.getHours(): this.state.time.getHours(),
                minute: this.state.time.getMinutes() <10 ? "0" + this.state.time.getMinutes(): this.state.time.getMinutes(),
                year: this.state.time.getFullYear(),
                month: this.state.time.getMonth() + 1 <10 ? "0" + Number(this.state.time.getMonth() + 1): Number(this.state.time.getMonth() + 1),
                day: this.state.time.getDate() <10 ? "0" + this.state.time.getDate(): this.state.time.getDate(),
            })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timeInterval)
    }

    render() {
        return <>
                <div id="time">{this.state.hour}:{this.state.minute}</div>
                <div id="date">{this.state.day}.{this.state.month}.{this.state.year}</div>
            </>
    }
}

class Footer extends React.Component {
    render() {
        return <footer>
                <div>
                    <div className="windows">
                        <i className="fa-brands fa-windows"></i>
                    </div>
                    <div className="app">
                        <a href="https://github.com/LeQu15" target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </div>
                    <div id="footer-container">
                        <i className="fa-solid fa-wifi"></i>
                        <i className="fa-solid fa-volume-high"></i>
                        <div className="clock">
                            <DateTaskBar/>
                        </div>
                    </div>
                </div>
            </footer>
    }
}

export default Footer