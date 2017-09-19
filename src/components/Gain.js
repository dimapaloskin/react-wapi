import { Component } from 'react'
import PropTypes from 'prop-types'

class Gain extends Component {
  constructor (props, context) {
    super(props, context)
    const { audioContext, destination } = context
    this.gain = audioContext.createGain()
    this.gain.connect(destination)
    this.setup(props)
  }

  getChildContext () {
    return {
      audioContext: this.context.audioContext,
      destination: this.gain
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setup(nextProps)
  }

  setup (props) {
    const { gain } = props
    this.gain.gain.value = gain
  }

  render () {
    return this.props.children || null
  }
}

Gain.childContextTypes = {
  audioContext: PropTypes.instanceOf(window.AudioContext),
  destination: PropTypes.instanceOf(window.AudioNode)
}

Gain.propTypes = {
  gain: PropTypes.number
}

Gain.defaultProps = {
  gain: 1
}

Gain.contextTypes = {
  audioContext: PropTypes.instanceOf(window.AudioContext),
  destination: PropTypes.instanceOf(window.AudioNode)
}

export default Gain
