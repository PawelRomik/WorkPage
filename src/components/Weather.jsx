import React from 'react';

class Location extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userLocation: false,
      }
    }

  async componentDidMount() {
    try {
      const response = await fetch("https://json.geoiplookup.io/")
      const json = await response.json()
      if(!response.ok) {
        throw Error(response.statusText)
      } else {
        this.setState({
          userLocation: json.country_name
        })
      }
    } catch (error) {
        console.error(error)
      }
  }

  render() {
      if(this.state.userLocation) {
        return <Weather userLocation = {this.state.userLocation}/>
      } else {
        return null
      }
  }
}

class Weather extends React.Component {
  constructor(props) {
    super(props)
    const date = new Date()
    this.state = {
      userLocation: this.props.userLocation,
      hour: date.getHours(),
      temp: 0,
      icon: 'clear-day'
    }
  }

  componentDidMount() {
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+this.state.userLocation+"?unitGroup=metric&key=522VLJBXMFTG3QPE4MXXL7BLC&contentType=json")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          temp: result.days[0].hours[this.state.hour].temp + '\u2103',
          icon: result.days[0].hours[this.state.hour].icon
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    return <div className = "weather">
      <img src={require(`../img/weather/${this.state.icon}.png`)} alt={this.state.icon}/>
      <p>{this.state.temp}</p>
    </div>
  }
}

export default Location