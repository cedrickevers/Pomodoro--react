import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
const moment = require("moment")
var handle = require('handle');


const Header = () => <h1>Pomodoro Clock</h1>

const SetTimer = ({ type, label, value, handleClick }) => (
    <div className='SetTimer'>
        <div id={`${type}-label`}>{label}</div>
        <div className='SetTimer-controls'>
            <button id={`${type}-decrement`} onClick={() => handleClick(false, `${type}Value`)}>&darr;</button>
            <h1 id={`${type}-length`}>{value}</h1>
            <button id={`${type}-increment`} onClick={() => handleClick(true, `${type}Value`)}>&uarr;</button>
        </div>
    </div>
)

const Timer = ({ mode, time }) => (
    <div className='Timer'>
        <h1 id='timer-label'>{mode === 'session' ? 'Session ' : 'Break '}</h1>
        <h1 id='time-left'>{time}</h1>
    </div>
)

const Controls = ({ active, handleReset, handlePlayPause }) => (
    <div className='Controls'>
        <button id='start_stop' onClick={handlePlayPause}>{active ? <span>&#10074;&#10074;</span> : <span>&#9658;</span>}</button>
        <button id='reset' onClick={handleReset}>&#8635;</button>
    </div>
)


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            breakValue: 5,
            sessionValue: 25,
            time: 25 * 60 * 1000,
            mode: 'session',
            active: false
        }
    }

    handleSetTimers = (inc, type) => {
        if (inc && this.state[type] === 60) return
        if (!inc && this.state[type] === 1) return
        this.setState({ [type]: this.state[type] + (inc ? 1 : -1) })
    }
    render() {
        return (
            <div>
                <Header />
                <div className='settings'>
                    <SetTimer
                        type='break'
                        label='Break Length'
                        value={this.state.breakValue}
                    />
                    <SetTimer
                        type='session'
                        label='Session Length'
                        value={this.state.sessionValue}
                    />
                </div>
                <Timer mode={this.state.mode} time={moment(this.state.time).format('mm:ss')} />
                <Controls active={this.state.active} />

            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("test"));
