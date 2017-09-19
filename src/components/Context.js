import React, { Component } from 'react'
import PropTypes from 'prop-types'

// TODO: sampleRate
// https://developer.mozilla.org/ru/docs/Web/API/AudioContext
class Context extends Component {
  constructor (props) {
    super(props)
    this.audioContext = new window.AudioContext()
    props.onCreate && props.onCreate(this.audioContext)
  }

  getChildContext () {
    return {
      audioContext: this.audioContext,
      destination: this.audioContext.destination
    }
  }

  render () {
    return (
      <noscript>
        {this.props.children || null}
      </noscript>
    )
  }
}

Context.propTypes = {
  onCreate: PropTypes.func
}

Context.childContextTypes = {
  audioContext: PropTypes.instanceOf(window.AudioContext),
  destination: PropTypes.instanceOf(window.AudioNode)
}

export default Context
