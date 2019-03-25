import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: 10 };
    this.timer = 0;

  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    console.log('componentDidMount')
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    clearInterval(this.timer)
  }

  startTimer = () => {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    console.log("countdown:", seconds)
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      console.log("clear interval")
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.state.time.m}min : {this.state.time.s}s
        </div>
        <button onClick={this.startTimer}>Start</button>
      </div>
    );
  }
}

export default App;
