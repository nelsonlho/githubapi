import React from 'react';
import {Pager} from 'react-bootstrap';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                    <Pager><h1>GitHub Rail Issues</h1></Pager>
                {this.props.children}
            </div>
        );
    }
}

export default App;
