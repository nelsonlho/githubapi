import React from 'react';
import ajax from 'superagent';

export default class User extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          users: []
      };
  }

  componentWillMount(){
    const baseURL = 'https://api.github.com/users';
    ajax.get(`${baseURL}/${this.props.params.user}/events`)
        .end((error, response) => {
            if (!error && response) {
                this.setState({ [type]: response.body });
            } else {
                console.log(`Error fetching ${type}`, error);
            }
        }
    );
 }

 render() {
      return <ul>
          {this.state.events.map((event, index) => {
              const eventType = event.type;
              const repoName = event.repo.name;
              const creationDate = event.created_at;

              return (<li key={index}>
                  <strong>{repoName}</strong>: {eventType}
                  at {creationDate}.
              </li>);
          })}
      </ul>;
  }

}
