import React from 'react';
import ReactDom from 'react-dom';

const Header = () => <h1>Pomodoro</h1>

class App extends React.Component {
    render  () {
        return (
            <div>
                <Header/>
            </div>
        )
    }
 

}
ReactDom.render(<App />, document.getElementById("test"))