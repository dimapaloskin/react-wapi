import React, { Component } from 'react'

import Context from './components/Context'
import Gain from './components/Gain'
import Oscillator from './components/Oscillator'

class App extends Component {
  constructor(props) {
    super(props)
    this.changeFrequency = this.changeFrequency.bind(this)
    this.changeDetune = this.changeDetune.bind(this)
    this.changeGain = this.changeGain.bind(this)

    this.state = {
      frequency: 440,
      detune: 0,
      gain: 50,
      realGain: 50 / 100
    }
  }

  onContextCreated(audioContext) {
    console.log(audioContext)
  }

  changeFrequency (event) {
    const { value } = event.target
    this.setState({
      frequency: parseInt(value, 10)
    })
  }

  changeDetune (event) {
    const { value } = event.target
    this.setState({
      detune: parseInt(value, 10)
    })
  }

  changeGain (event) {
    const { value } = event.target
    this.setState({
      realGain: (parseInt(value, 10) / 100),
      gain: value
    })
  }

  render() {
    return (
      <div className="App">
        <Context onContextCreated={this.onContextCreated}>
          <Gain gain={this.state.realGain}>
            <Oscillator
              type="triangle"
              frequency={this.state.frequency}
              detune={this.state.detune}
              start={false}
            />
          </Gain>
        </Context>

        <div>
          <div>Frequency: {this.state.frequency}</div>
          <input
            type="range"
            min="100"
            max="880"
            step="20"
            value={this.state.frequency}
            onChange={this.changeFrequency}
          />

          <div>Detune: {this.state.detune}</div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={this.state.detune}
            onChange={this.changeDetune}
          />

          <div>Gain: {this.state.gain}</div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={this.state.gain}
            onChange={this.changeGain}
          />
        </div>
      </div>
    );
  }
}

export default App
