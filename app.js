import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
    render  () {
        return (
            <div> test class</div>
        )
    }
 

}
ReactDom.render(<App />, document.getElementById("test"))