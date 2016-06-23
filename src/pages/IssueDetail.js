import React from 'react';

class IssueDetail extends React.Component {
  render() {
    console.log(this.props.params);


    const {issueID} = this.props.params;
    const {issues} = this.props;


    if(!issues){
        return <p></p>;
    }

    const issue = issues.find(i=>i.id === parseInt(issueID));
    if(!issue){
        return <p>Not Found </p>;
    }
    return (
        <div>
           <h3>{issue.title}</h3>
           <div>{issue.body}</div>
           
        </div>
    );
  }
}

export default IssueDetail;
