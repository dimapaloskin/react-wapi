import React, { Component } from 'react'
import PropTypes from 'prop-types'

const MINUTE_IN_MS = 60 * 1000

class Tick extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isRunning: false,
      interval: MINUTE_IN_MS / 100 / 4,
      previous: Date.now()
    }

    this.tick = this.tick.bind(this)
  }

  componentDidMount () {
    this.setup(this.props)
    this.tick()
  }

  componentWillReceiveProps (nextProps) {
    this.setup(nextProps)
  }

  setup (props) {
    const interval = MINUTE_IN_MS / this.props.bpm / props.steps
    this.setState({
      interval,
      isRunning: props.run
    })
  }

  tick () {
    const { isRunning, previous, interval } = this.state
    const { onTick } = this.props
    const now = Date.now()
    const diff = now - previous

    if (isRunning && diff >= interval) {
      onTick && onTick()
      this.setState({
        previous: now
      })
    }

    window.requestAnimationFrame(this.tick)
  }

  render () {
    return (
      <noscript>
        {this.props.children || null}
      </noscript>
    )
  }
}

Tick.propTypes = {
  bpm: PropTypes.number,
  steps: PropTypes.number,
  run: PropTypes.bool,
  onTick: PropTypes.func
}

Tick.defaultProps = {
  bpm: 100,
  steps: 4,
  run: false
}

export default Tick
