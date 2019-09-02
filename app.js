import React from 'react';
import ReactDom from 'react-dom';

const Header = () => <h1>Pomodoro</h1>

const SetTimer = ({ type }) =>(
    <div>
        <div id={`${type}-label`}> {`${type} length`} </div>
    </div>
)

class App extends React.Component {
    render  () {
        return (
            <div>
                <Header/>
                <div>
                    <SetTimer type = "break"/>
                    <SetTimer type="session"/>
                </div>
            </div>
        )
    }
 

}
ReactDom.render(<App />, document.getElementById("test"))