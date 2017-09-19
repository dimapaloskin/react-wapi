import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Oscillator extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      isStarted: false
    }

    const { audioContext, destination } = context
    this.oscillator = audioContext.createOscillator()
    props.onCreate && props.onCreate(this.oscillator)
    this.oscillator.connect(destination)
  }

  setup (props) {
    const { type, frequency, detune, start } = props
    this.oscillator.type = type
    this.oscillator.frequency.value = frequency
    this.oscillator.detune.value = detune
    if (start && !this.state.isStarted) {
      this.setState({
        isStarted: true
      }, () => {
        this.oscillator.start()
      })
    }
  }

  componentDidMount () {
    this.setup(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.setup(nextProps)
  }

  render () {
    return (
      <noscript>
        {this.props.children || null}
      </noscript>
    )
  }
}

Oscillator.propTypes = {
  // TODO: add PeriodicWave support!
  // https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/setPeriodicWave
  type: PropTypes.string,
  frequency: PropTypes.number,
  detune: PropTypes.number,
  start: PropTypes.bool,
  onCreate: PropTypes.func
}

Oscillator.defaultProps = {
  type: 'sine',
  frequency: 440,
  detune: 0,
  start: false
}

Oscillator.contextTypes = {
  audioContext: PropTypes.instanceOf(window.AudioContext).isRequired,
  destination: PropTypes.instanceOf(window.AudioNode).isRequired
}

export default Oscillator
