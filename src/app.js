
import React, { useState, useEffect, Component } from 'react';

import ReactDOM from 'react-dom';

const moment = require("moment")
import Modal from 'react-modal';

 
import "./index.css";


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  

const Header = () => <h1>Pomodoro Clock</h1>

const SetTimer = ({ type, label, value, app }) => (
    < div className='SetTimer' >
        <div id={`${type}-label`}>{label}</div>
        <div className='SetTimer-controls'>
            <button id={`${type}-decrement`} onClick={() => app.handleSetTimers(false, `${type}Value`)}>&darr;</button>
            <h1 id={`${type}-length`}>{value}</h1>
            <button id={`${type}-increment`} onClick={() => app.handleSetTimers(true, `${type}Value`)}>&uarr;</button>
        </div>
    </div >
)

const Timer = ({ mode, time }) => (
    <div className='Timer'>
        <h1 id='timer-label'>{mode === 'session' ? 'Session ' : 'Break '}</h1>
        <h1 id='time-left'>{time}</h1>
    </div>
)

const Controls = ({ active, handleReset, handlePlayPause, app }) => (
    <div className='Controls'>
        <button id='start_stop' onClick={() => app.handlePlayPause()}>{active ? <span>&#10074;&#10074;</span> : <span>&#9658;</span>}</button>
        <button id='reset' onClick={() => app.handleReset()}>&#8635;</button>
    </div>
)

Modal.setAppElement('#test')
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            breakValue: 5,
            sessionValue: 25,
            time: 25 * 60 * 1000,
            active: false,
            mode: 'session',
            modalIsOpen: false
        }
        
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

    componentDidUpdate(prevProps) {
        if (this.state.time === 0 && this.state.mode === 'session') {
            this.handleReset()
            this.openModal()
            //this.audio.play()
        }
        if (this.state.time === 0 && this.state.mode === 'break') {
            this.setState({ time: this.state.sessionValue * 60 * 1000, mode: 'session' })
            //this.audio.play()


        }
    }

    handleSetTimers(inc, type) {
        if (inc && this.state[type] === 60) return
        if (!inc && this.state[type] === 1) return
        this.setState({ [type]: this.state[type] + (inc ? 1 : -1) })
    }

    handlePlayPause(timeValue=this.state.sessionValue) {
        if (this.state.active) {
            this.setState({ active: false }, () => clearInterval(this.pomodoro))
        }
        else {
            if (!this.state.touched) {
                this.setState({
                    time: timeValue * 60 * 1000,
                    active: true,
                    touched: true
                }, () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }), 1000)
                )
            } else {
                this.setState({
                    active: true,
                    touched: true
                }, () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }), 1000))
            }
        }
    }

    handleReset() {
        this.setState({
            breakValue: 5,
            sessionValue: 25,
            time: 25 * 60 * 1000,
            active: false,
            mode: 'session',
            touched: false
        })
        this.audio.pause()
        this.audio.currentTime = 0
        clearInterval(this.pomodoro)
    }

    enableBreak(){
        this.closeModal()
        this.setState({ time: this.state.breakValue * 60 * 1000, mode: 'break' })
        this.handlePlayPause(this.state.breakValue)
    }

    render() {
        return (
            <div>
                 <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Break Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Want a break ?</h2>
          <div></div>
          <form>
            <button onClick={() => this.enableBreak()}>Yes</button>
            <button onClick={() => this.closeModal()}>No</button>
          </form>
        </Modal>
      </div>
    );
  }
                <main>
                    <Header />
                    <div className='settings'>
                        <SetTimer
                            type='break'
                            label='Break Length'
                            value={this.state.breakValue}
                            app={this}
                        />
                        <SetTimer
                            type='session'
                            label='Session Length'
                            value={this.state.sessionValue}
                            app={this}
                        />
                    </div>
                    <Timer mode={this.state.mode} time={moment(this.state.time).format('mm:ss')} />
                    <Controls active={this.state.active} handleReset={this.handleReset} handlePlayPause={this.handlePlayPause} app={this} />
                    <audio
                        id='beep'
                        src=' '
                        ref={ref => this.audio = ref}>
                    </audio>
                </main>
            </div>

        );
    }
}

ReactDOM.render(<App />, document.getElementById("test"));
 
