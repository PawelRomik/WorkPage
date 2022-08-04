import React from 'react';

if(!localStorage.clock) localStorage.setItem('clock', JSON.stringify(['']))

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            pause: 'Unpause',
            stoper: 0,
            alarm: '',
            alarmArray: [...JSON.parse(localStorage.clock)].filter(elem => elem !=='')
        };
    }

    componentDidMount = () => {
        this.clockInterval = setInterval(() => {
            this.setState({
                date: new Date(),
                hour: this.state.date.getHours() <10 ? "0" + this.state.date.getHours(): this.state.date.getHours(),
                minute: this.state.date.getMinutes() <10 ? "0" + this.state.date.getMinutes(): this.state.date.getMinutes(),
                year: this.state.date.getFullYear(),
                month: this.state.date.getMonth() + 1 <10 ? "0" + Number(this.state.date.getMonth() + 1): Number(this.state.date.getMonth() + 1),
                day: this.state.date.getDate() <10 ? "0" + this.state.date.getDate(): this.state.date.getDate(),
                seconds: this.state.date.getSeconds() <10 ? "0" + this.state.date.getSeconds(): this.state.date.getSeconds(),
                currentTime: this.state.hour + ":" + this.state.minute,
            })

            if(this.state.alarmArray.includes(this.state.currentTime)) {
                this.setState({
                    alarmArray: this.state.alarmArray.filter(item => item !== this.state.currentTime)
                }, () => {
                    localStorage.setItem('clock', JSON.stringify(this.state.alarmArray))
                })
                window.alert(`Alarm: ${this.state.currentTime}`)
            }
        }, 100)
    }

    componentWillUnmount() {
        clearInterval(this.clockInterval)
        clearInterval(this.stoperInterval)
    }

    handleStoper = () => {
        if(this.state.pause === 'Unpause') {
            this.setState({
                pause: 'Pause'
            })
            this.stoperInterval = setInterval(() => {
                this.setState({
                    stoper: this.state.stoper + 100,
                })
            }, 100)
        } else {
            clearInterval(this.stoperInterval)
            this.setState({
                pause: 'Unpause'
            })
        }
    }

    resetStoper = () => {
        this.setState({
            pause: 'Unpause',
            stoper: 0
        })
        clearInterval(this.stoperInterval)
    }

    handleChangeAlarm = (e) => {
        this.setState({
            alarm: e.target.value
        })
    }

    deleteAlarm = (e) => {
        const array = this.state.alarmArray
        array.splice(e.currentTarget.getAttribute('data-index'), 1)
        this.setState({
            arrayOfTasks: array,
        }, () => {
            localStorage.setItem('clock', JSON.stringify(this.state.alarmArray))
        })
    }

    addAlarm = () => {
        if(this.state.alarm !== '') {
            this.setState({
                alarmArray: [...this.state.alarmArray, this.state.alarm]
            }, () => {
                localStorage.setItem('clock', JSON.stringify(this.state.alarmArray))
            })
        } else {
            window.alert('You must enter the time')
        }
    }

    showAlarms() {
        const array = this.state.alarmArray.sort().map((elem, index) => <div key={index}><div>Alarm: {elem}</div><button data-index={index} onClick={this.deleteAlarm}>Remove</button></div>)
        array.sort()
        return array
    }

        render() {
            return <div id="appBox">
                        <div className="currentTime">Time: 
                            <p>{this.state.currentTime + ":" + this.state.seconds}</p>
                        </div>
                        <div className="stoper">
                            <p>Stoper: </p>
                            {(this.state.stoper/1000).toFixed(1)}
                            <div>
                                <button onClick={this.handleStoper}>{this.state.pause}</button>
                                <button onClick={this.resetStoper}>Reset</button>
                            </div>
                        </div>
                        <div className="alarm">
                            <p>Alarm: </p>
                            <div className="addAlarm">
                                <input type="time" name="appt" min="00:00" max="23:00" value={this.state.alarm} onChange={this.handleChangeAlarm}/>
                                <button onClick={this.addAlarm}>Add</button>
                            </div>
                            <div className="alarms">{this.showAlarms()}</div>
                        </div>
                    </div>
    }
}

export default Clock