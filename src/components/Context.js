import { Component } from 'react'
import PropTypes from 'prop-types'

class Context extends Component {
  constructor (props) {
    super(props)
    this.audioContext = new window.AudioContext()
  }

  getChildContext () {
    return {
      audioContext: this.audioContext,
      destination: this.audioContext.destination
    }
  }

  render () {
    return this.props.children || null
  }
}

Context.childContextTypes = {
  audioContext: PropTypes.instanceOf(window.AudioContext),
  destination: PropTypes.instanceOf(window.AudioNode)
}

export default Context
