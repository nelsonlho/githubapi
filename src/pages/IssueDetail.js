import React from 'react';

class IssueDetail extends React.Component {
  render() {
    console.log(this.props.params);
    

    const {issue_id} = this.props.params;
    const {issues} = this.props;


    if(!issues){
        return <p></p>;
    } 

    const issue = issues.find(i=>i.id === parseInt(issue_id));
    if(!issue){
        return <p>Not Found </p>;
    } 
    return (
        <div>
           {issue.title}
        </div>
    );
  }
}

export default IssueDetail;
