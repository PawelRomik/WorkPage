import React from 'react';

class Animation extends React.Component {
    constructor(props) {
        super(props)
        this.loginRef = React.createRef()
        this.animateRef = React.createRef()
        this.state = {
            password: 'password',
            logIn: false,
        }
    }

    componentDidMount() {
        this.loginRef.current.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                this.setState({
                    logIn: true
                })
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    login = () => {
        this.setState({
            logIn: true
        })
    }

    componentWillUnmount() {
        this.loginRef.current.removeEventListener('keypress')
    }

    animate() {
        if(!this.state.logIn) {
            return <div className ="container-animation">
            <div className="profile">
                <i className="fa-solid fa-user"></i>
            </div>
            <h2 >User</h2>
            <div>
                <input ref={this.loginRef} onChange={this.handleChange} maxLength="22" type="password" value={this.state.password} placeholder="Password"></input>
                <i onClick={this.login} className="fa-solid fa-arrow-right-to-bracket"></i>
            </div>
        </div>
        } else {
            setTimeout(() => {
                this.animateRef.current.style.opacity = "0"
                this.animateRef.current.addEventListener('transitionend', () => {
                this.animateRef.current.remove()
                })
            }, 3000);
            return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        }
    }

    render() {
            return <div ref={this.animateRef} className="animation">{this.animate()}</div>
    }
}

export default Animation