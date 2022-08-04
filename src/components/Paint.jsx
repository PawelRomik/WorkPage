import React from 'react';

if(!localStorage.bgc) localStorage.setItem('bgc', JSON.stringify('#ffffff'))
if(!localStorage.canvas) localStorage.setItem('canvas', JSON.stringify(''))

class Paint extends React.Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()
        this.ctxRef = React.createRef()
        this.state = {
            color: '#000000',
            bgcColor: JSON.parse(localStorage.bgc),
            lineWidth: 3,
            isPainting: false,
            shape: 'round',
            buttonText: <i className="fa-solid fa-square"></i>
        }
    }


    componentDidMount() {
        const canvas=this.canvasRef.current
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight

        const ctx = canvas.getContext('2d')
        this.ctxRef.current = ctx;
        this.ctxRef.current.strokeStyle = this.state.color
        this.ctxRef.current.lineWidth = this.state.lineWidth
        this.ctxRef.current.lineCap = this.state.shape;
        this.ctxRef.current.lineJoin = this.state.shape;

        if(localStorage.canvas!=='') {
            let img = new Image();
            img.src = JSON.parse(localStorage.canvas);
            img.onload =() => {
                this.ctxRef.current.drawImage(img, 0 ,0) 
            }
        }

        window.addEventListener('resize', this.resizeCanvas)
        window.addEventListener('orientationchange', this.resizeCanvas)
    }

    resizeCanvas = () =>{
        const canvas=this.canvasRef.current
        const ctx = canvas?.getContext('2d')
        let temp = ctx.getImageData(0,0, canvas?.width, canvas?.height)
        canvas.width =canvas?.parentElement.clientWidth;
        canvas.height = canvas?.parentElement.clientHeight
        ctx.putImageData(temp, 0, 0)
        this.updateCanvas()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeCanvas)
        window.removeEventListener('orientationchange', this.resizeCanvas)
    }


    updateCanvas() {
        this.ctxRef.current.strokeStyle = this.state.color
        this.ctxRef.current.lineWidth = this.state.lineWidth
        this.ctxRef.current.lineCap = this.state.shape;
        this.ctxRef.current.lineJoin = this.state.shape;
    }

    clear = (e) => {
        this.ctxRef.current.clearRect(0,0, this.canvasRef.current.width, this.canvasRef.current.height)
        this.endPaint(e)
    }

    changeColor = (e) => {
        this.setState({
            color: e.target.value
        }, () => {
            this.updateCanvas()
        })

    }

    changeShape = () => {
        this.setState({
            shape: this.state.shape === 'square' ? 'round' :'square',
        }, () => {
            this.updateCanvas()
        })
    }

    changeBgcColor =(e) => {
        this.setState({
            bgcColor: e.target.value
        }, () => {
            localStorage.setItem('bgc', JSON.stringify(this.state.bgcColor))
        })
    }

    changeWidth = (e) => {
        this.setState({
            lineWidth: e.target.value
        },() => {
            this.updateCanvas()
        })
    }

    startPaint = (e) => {
        e.stopPropagation();
        this.ctxRef.current.beginPath();
        if(e.targetTouches) {
            const rect = e.target.getBoundingClientRect();
            this.ctxRef.current.moveTo(e.targetTouches[0].pageX - rect.left, e.targetTouches[0].pageY - rect.top)
        } else {
            this.ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
        this.setState({
            isPainting: true
        })
    }


    paint = (e) => {
        e.stopPropagation();
        if(this.state.isPainting) {
            if(e.targetTouches) {
                const rect = e.target.getBoundingClientRect();
                this.ctxRef.current.lineTo(e.targetTouches[0].pageX - rect.left, e.targetTouches[0].pageY - rect.top)
            } else {
                this.ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            }
            this.ctxRef.current.stroke()
        }
    }

    endPaint = (e) => {
        e.stopPropagation();
        this.ctxRef.current.closePath();
        this.setState({
            isPainting: false
        }, () => {
            localStorage.setItem('canvas', JSON.stringify(this.canvasRef.current.toDataURL("image/png")))
        })
        this.saveImage()
    }

    saveImage = () => {
        let img = new Image();
        img.src = this.canvasRef.current.toDataURL("image/png");
        img.onload = () => {
            this.ctxRef.current.fillStyle = this.state.bgcColor
            this.ctxRef.current.fillRect(0,0,this.canvasRef.current.width, this.canvasRef.current.height)
            this.ctxRef.current.drawImage(img, 0, 0)
            this.setState({
                imageHref: this.canvasRef.current.toDataURL("image/png")
            })
            this.ctxRef.current.clearRect(0,0, this.canvasRef.current.width, this.canvasRef.current.height)
            this.ctxRef.current.drawImage(img, 0, 0) 
        }
    }



    render() {
        return <>
                <div className="toolbar">
                    <button className="clearCanvas" onClick={this.clear}>
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                    <div>
                        <label htmlFor="color">Color: </label>
                        <input id="color" name = "color" type="color" value={this.state.color} onChange={this.changeColor}></input>
                    </div>
                    <div>
                        <label htmlFor="color">Background: </label>
                        <input id="bgccolor" name = "bgccolor" type="color" value={this.state.bgcColor} onChange={this.changeBgcColor}></input>
                    </div>
                    <div>
                        <label htmlFor="Width">Width: </label>
                        <input id="lineWidth" name = "lineWidth" type="number" value={this.state.lineWidth} onChange={this.changeWidth}></input>
                    </div>
                    <div>
                        <button onClick={this.changeShape}>{this.state.shape === 'round' ? <i className="fa-solid fa-circle"></i>: <i className="fa-solid fa-square"></i>}</button>
                    </div>
                </div>
                <div className="board">
                    <canvas style={{backgroundColor: this.state.bgcColor}} ref={this.canvasRef} onTouchStart = {this.startPaint} onTouchMove={this.paint} onTouchEnd={this.endPaint} onTouchCancel={this.endPaint} onMouseLeave={this.endPaint} onMouseDown={this.startPaint} onMouseMove = {this.paint} onMouseUp={this.endPaint}></canvas>
                </div>
                <div className="save">
                    <a onClick={this.saveImage} download href={this.state.imageHref}>
                        <i className="fa-solid fa-file-arrow-down"></i>
                    </a>
                </div>
            </>
    }
}

export default Paint