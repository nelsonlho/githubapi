import React from 'react';
import {Pager} from 'react-bootstrap';
import ajax from 'superagent';

class App extends React.Component {

  constructor(props){
  	 super(props);
  	 this.state = {
  	 	loading : false,
  	 	issues : null
  	 }
  }

 componentDidMount(){
 	this.setState({loading : true});
 	ajax.get(`https://api.github.com/repos/rails/rails/issues`)
        .end((error, response) => {
            if (!error && response) {
                this.setState({ issues: response.body , loading : false});
            } else {
                console.log(`Error fetching user data.`, error);
            }
        }
    );
  }
    render() {
    	const {loading, issues} = this.state;
    	if(loading){
    		return <div className="app_loading"> Loading</div>;
    	}
        return (
            <div className="app">
                    <a href="/"><Pager><h1>GitHub Rail Issues</h1></Pager></a>
        			<div>{  React.cloneElement( this.props.children, { issues: this.state.issues })}</div>
            </div>
        );
    }
}

export default App;
