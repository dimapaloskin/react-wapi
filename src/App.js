import React, { Component } from 'react'

import Context from './components/Context'
import Gain from './components/Gain'
import Oscillator from './components/Oscillator'
import Tick from './components/Tick'

class App extends Component {
  constructor(props) {
    super(props)
    this.changeFrequency = this.changeFrequency.bind(this)
    this.changeDetune = this.changeDetune.bind(this)
    this.changeGain = this.changeGain.bind(this)
    this.onTick = this.onTick.bind(this)
    this.toggleTick = this.toggleTick.bind(this)

    this.state = {
      frequency: 440,
      detune: 0,
      gain: 0,
      realGain: 0,
      needPlay: true,
      runTickTock: false,
      step: 0
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

  onTick () {
    const { needPlay, step } = this.state
    const nextStep = (step === 7) ? 0 : step + 1
  
    this.setState({
      needPlay: !needPlay,
      realGain: needPlay ? 0.5 : 0,
      frequency: step === 0 ? 440 : 300,
      step: nextStep
    })
  }

  toggleTick () {
    const next = !this.state.runTickTock
    this.setState({
      runTickTock: next,
      realGain: next ? this.state.realGain : 0,
      step: next ? this.state.step : 0
    })
  }

  render() {
    return (
      <div className="App">
        <Tick bpm={200} steps={2} onTick={this.onTick} run={this.state.runTickTock} />
        <Context onCreate={this.onContextCreated}>
          <Gain gain={this.state.realGain}>
            <Oscillator
              type="triangle"
              frequency={this.state.frequency}
              detune={this.state.detune}
              start={true}
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
          <div>
            <button onClick={this.toggleTick}>Toggle tick tock</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App
