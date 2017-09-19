import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Gain extends Component {
  constructor (props, context) {
    super(props, context)

    const { audioContext, destination } = context
    this.gain = audioContext.createGain()
    props.onCreate && props.onCreate(this.gain)
    this.gain.connect(destination)
    
  }

  getChildContext () {
    return {
      audioContext: this.context.audioContext,
      destination: this.gain
    }
  }

  componentWillMount () {
    this.setup(this.props)
  }

  componentWillUnmount () {
    const { destination } = this.context
    this.gain.disconnect(destination)
  }

  componentWillReceiveProps (nextProps) {
    this.setup(nextProps)
  }

  setup (props) {
    const { gain } = props
    this.gain.gain.value = gain
  }

  render () {
    return (
      <noscript>
        {this.props.children || null}
      </noscript>
    )
  }
}

Gain.propTypes = {
  gain: PropTypes.number,
  onCreate: PropTypes.func
}

Gain.defaultProps = {
  gain: 1
}

Gain.childContextTypes = {
  audioContext: PropTypes.instanceOf(window.AudioContext),
  destination: PropTypes.instanceOf(window.AudioNode)
}

Gain.contextTypes = {
  audioContext: PropTypes.instanceOf(window.AudioContext),
  destination: PropTypes.instanceOf(window.AudioNode)
}

export default Gain
