import React from 'react';

if(!localStorage.notes) localStorage.setItem('notes', JSON.stringify(''))

class Notepad extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: JSON.parse(localStorage.notes),
        };
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        }, () => {
            localStorage.setItem('notes', JSON.stringify(this.state.text))
        })
    }

    render() {
        return <div id="appBox">
                    <textarea value={this.state.text} onChange={this.handleChange}></textarea>
                </div>
    }
}

export default Notepad