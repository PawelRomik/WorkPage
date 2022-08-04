import React from 'react'
import {evaluate} from 'mathjs'

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            score: '0',
            minus: 0,
            lastNumber: '',
            array: ['0'],
        }
    }

    number = (e) => {
        const numberArray = ['1','2','3','4','5','6','7','8','9', '0']
        if(numberArray.includes(e.target.innerHTML)) {
            if(this.state.array.length !== 1 && this.state.array[0] === '' && e.target.innerHTML ==='0') {}
            else if(this.state.array[this.state.array.length - 1]!=='+' && this.state.array[this.state.array.length - 1]!=='-' && this.state.array[this.state.array.length - 1]!=='/' && this.state.array[this.state.array.length - 1]!=='*'  && this.state.array[this.state.array.length - 1]!=='.') {
                if(this.state.array[0] === '0') {
                    this.setState({
                        array: [e.target.innerHTML]
                    }, () => {
                        this.updateText()
                    })
                } else if(this.state.array[this.state.array.length-1]==='0') {
                    this.state.array.pop()
                    this.setState({
                        array: [...this.state.array,e.target.innerHTML]
                    }, () => {
                        this.updateText()
                    })
                } else {
                    const lastNumber = this.state.array.pop() + e.target.innerHTML
                    this.setState({
                        array: [...this.state.array, lastNumber]
                    }, () => {
                        this.updateText()
                    })
                }
            } else {
                this.setState({
                    array: [...this.state.array, e.target.innerHTML]
                }, () => {
                    this.updateText()
                })
            }
        }
    }
    
    comma = (e) => {
        if(e.target.innerHTML === '.') {
            if(this.state.array[this.state.array.length-1] !== '+' && this.state.array[this.state.array.length-1] !== '+-' && this.state.array[this.state.array.length-1] !== '-' && this.state.array[this.state.array.length-1] !== '/' && this.state.array[this.state.array.length-1] !== '*' && this.state.array[this.state.array.length-1] !== '*-'  && !this.state.array[this.state.array.length - 1].includes(".") && this.state.array[this.state.array.length-1] !== '/-') {
                const lastNumber = this.state.array.pop() + e.target.innerHTML
                this.setState({
                    array: [...this.state.array, lastNumber]
                }, () => {
                    this.updateText()
                })
            }
        }
    }

    add = (e) => {
        const numberArray = ['+','-','/','*']
        if(numberArray.includes(e.target.innerHTML)) {
            if(this.state.array[this.state.array.length-1] === '+' || this.state.array[this.state.array.length-1] === '*' || this.state.array[this.state.array.length-1] === '/') {
                if(e.target.innerHTML==='-'&&this.state.array[this.state.array.length-1].charAt(this.state.array[this.state.array.length-1].length - 1)!=='.') {
                    const element = this.state.array.pop()
                    this.setState({
                        array: [...this.state.array, element + e.target.innerHTML]
                    }, () => {
                        this.updateText()
                    })
                }
            } else if(this.state.array[this.state.array.length-1] !== '+' && this.state.array[this.state.array.length-1] !== '+-' && this.state.array[this.state.array.length-1] !== '-' && this.state.array[this.state.array.length-1] !== '/' && this.state.array[this.state.array.length-1] !== '*' && this.state.array[this.state.array.length-1] !== '*-' && this.state.array[this.state.array.length-1] !== '/-') {
                if(this.state.array[this.state.array.length-1].charAt(this.state.array[this.state.array.length-1].length - 1)!=='.') {
                    this.setState({
                        array: [...this.state.array, e.target.innerHTML]
                    }, () => {
                        this.updateText()
                    })
                }
            }
        }
    }

    summary = () => {
        if(this.state.array[this.state.array.length - 1] === "+" || this.state.array[this.state.array.length - 1] === "+-" || this.state.array[this.state.array.length - 1] === "*-" || this.state.array[this.state.array.length - 1] === "/-" || this.state.array[this.state.array.length - 1] === "-" || this.state.array[this.state.array.length - 1] === "/" || this.state.array[this.state.array.length - 1] === "*"  || this.state.array[this.state.array.length - 1]==='.') {
            this.state.array.pop()
        }
        let text = this.state.array.join("");
        text = evaluate(text)
        text = text.toFixed(2)
        this.setState({
            score: text.replace(/\.00$/, ''),
        }, () => {
            this.setState({
                array: [this.state.score]
            })
        })
    }

    clear = () => {
        this.setState({
            array: ['0']
        }, () => {
            this.updateText()
        })
    }

    remove = () => {
        if(this.state.array.length > 0) {
            let lastElement = this.state.array.pop()
            lastElement = lastElement.substring(0, lastElement.length-1)
            this.setState({
                array: lastElement === '' ?[...this.state.array] :[...this.state.array, lastElement]
            }, () => {
                this.updateText()
                if(this.state.array.length === 0) this.setState({
                    array: ['0']
                }, () => {
                    this.updateText()
                })
            })
        } else {
            this.setState({
                array: ['0']
            }, () => {
                this.updateText()
            })
        }
    }

    squareRoot = () => {
        if (this.state.array[this.state.array.length - 1]!=='+' && this.state.array[this.state.array.length - 1]!=='-' && this.state.array[this.state.array.length - 1]!=='/' && this.state.array[this.state.array.length - 1]!=='*' && this.state.array[this.state.array.length - 1]!=='.') {
            const lastElement = this.state.array.pop()
            this.setState({
                array: [...this.state.array, Math.sqrt(lastElement).toFixed(2).toString().replace(/\.00$/, '')]
            }, () => {
                this.updateText()
            })
        }
    }

    square = () => {
        if (this.state.array[this.state.array.length - 1]!=='+' && this.state.array[this.state.array.length - 1]!=='-' && this.state.array[this.state.array.length - 1]!=='/' && this.state.array[this.state.array.length - 1]!=='*' && this.state.array[this.state.array.length - 1]!=='.') {
            const lastElement = this.state.array.pop()
            this.setState({
                array: [...this.state.array, (lastElement*lastElement).toFixed(2).toString().replace(/\.00$/, '')]
            }, () => {
                this.updateText()
            })
        }
    }


    percent = () => {
        if (this.state.array[this.state.array.length - 1]!=='+' && this.state.array[this.state.array.length - 1]!=='-' && this.state.array[this.state.array.length - 1]!=='/' && this.state.array[this.state.array.length - 1]!=='*' && this.state.array[this.state.array.length - 1]!=='.') {
            const lastElement = this.state.array.pop()
            this.setState({
                array: [...this.state.array, (lastElement/100).toFixed(2).toString().replace(/\.00$/, '')]
            }, () => {
                this.updateText()
            })
        }
    }

    one = () => {
        if (this.state.array[this.state.array.length - 1]!=='+' && this.state.array[this.state.array.length - 1]!=='-' && this.state.array[this.state.array.length - 1]!=='/' && this.state.array[this.state.array.length - 1]!=='*' && this.state.array[this.state.array.length - 1]!=='.') {
            let lastElement = this.state.array.pop()
            lastElement = (1/lastElement).toFixed(2).toString().replace(/\.00$/, '')
            if (!Number.isFinite(Number(lastElement))) {
                lastElement = '0'
            }
            this.setState({
                array: [...this.state.array, lastElement]
            }, () => {
                this.updateText()
            })
        }
    }

    updateText = () => {
        this.setState({
            score: this.state.array.join("")
        })
    }

    render() {
        return <div id="calculator">
                    <div className="score">
                        <p>{this.state.score}</p>
                    </div>
                    <div className="buttons">
                        <div onClick={this.clear}>C</div>
                        <div onClick={this.remove}>
                            <i className="fa-solid fa-delete-left"></i>
                        </div>
                        <div onClick={this.percent}>%</div>
                        <div onClick={this.one}>{'\u215F'}<p>{'\u02e3'}</p></div>
                        <div onClick={this.number}>1</div>
                        <div onClick={this.number}>2</div>
                        <div onClick={this.number}>3</div>
                        <div onClick={this.add}>+</div>
                        <div onClick={this.number}>4</div>
                        <div onClick={this.number}>5</div>
                        <div onClick={this.number}>6</div>
                        <div onClick={this.add}>-</div>
                        <div onClick={this.number}>7</div>
                        <div onClick={this.number}>8</div>
                        <div onClick={this.number}>9</div>
                        <div onClick={this.add}>*</div>
                        <div onClick={this.squareRoot}>{'\u221a'}{'\u02e3'}</div>
                        <div onClick={this.number}>0</div>
                        <div onClick={this.square}>x{'\u00B2'}</div>
                        <div onClick={this.add}>/</div>
                        <div onClick={this.comma}>.</div>
                        <div onClick={this.summary}>=</div>
                    </div>
                </div>
    }
}

export default Calculator