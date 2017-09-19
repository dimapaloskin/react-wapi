# react-wapi

[short demo](https://wapi-test.now.sh/)
## Drafts for something like that:

```js
<div>
  <Tick bpm={200} steps={2} onTick={this.onTick} run={true} />
  <Context>
    <Gain gain={this.state.realGain}>
      <Oscillator
        type="triangle"
        frequency={this.state.frequency}
        detune={this.state.detune}
        start={true}
      />
    </Gain>
  </Context>
</div>
```
