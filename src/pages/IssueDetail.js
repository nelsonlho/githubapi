import React from 'react';
import ajax from 'superagent';

class IssueDetail extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          comments : null,
        };
  }

  componentDidMount(){
      const {issues} = this.props;
      const {comments} = this.state;
      const {issueID} = this.props.params;
      if(issues && typeof issueID !== 'undefined'){
         const issue = issues.find(i=>i.id === parseInt(issueID));
         this.fetchComments(issue.comments_url);
      }
  }

  componentWillReceiveProps(newProps){
      const {issues} = this.props;
      const {comments} = this.state;
      const {issueID} = newProps.params;
      if(issues && comments !== null){
         const issue = issues.find(i=>i.id === parseInt(issueID));
         this.fetchComments(issue.comments_url);
      }
  }

 
  fetchComments(url){
    ajax.get(url)
          .end((error, response) => {
              if (!error && response) {
                  if (response.body.comments !== "0")
                    this.setState({ comments: response.body});
              } else {
                  console.log(`Error fetching user data.`, error);
              }
          }
      );
  }
  render() {
    console.log(this.props.params);
    const {issueID} = this.props.params;
    const {comments} = this.state;
    const {issues} = this.props;
    if(!issues){
        return <p>Not Found </p>;
    }
    const issue = issues.find(i=>i.id === parseInt(issueID));

    if(!issue){
      return <p>Issue Not Found </p>;
    }
    let username = issue.user.login;
    
    let comments_block = <span/>;

    if(comments){
      comments_block = <div className="comments col-md-12">
      <ul>{comments.length ? comments.map((comment,index)=>{
           return <li key={index} ><p><a href={`https://github.com/${comment.user.login}`}>{comment.user.login}</a></p>
           <p>{comment.body}</p>
           </li>
            }) : "No comments" }
       </ul>
    </div>
    }

    return (
      <div className="container">
        <div className="row">
        <div className="col-md-12" >
        <div className="issue issueDetail">
           <h3>{issue.title}</h3>
           <div>{username}</div>
           <ul>{issue.labels.map((label,index)=>{
              let fontColor = 'black';
              if (label.name === "activerecord" || label.name === "needs work"
                || label.name === "attached PR" )
                fontColor = 'white';
              let labelKey = index + label.name;
              let labelStyle = {
                backgroundColor: '#'+label.color,
                color: fontColor,
              }
              return <li key={index} className="labels" style={labelStyle}>{label.name}</li>
          })}
          </ul>
          <img src={issue.user.avatar_url}/>
          <p className='username'><a target="_blank" href={`https:\/\/github.com/${issue.user.login}`}>{"@"+issue.user.login}</a></p>


                    {comments_block}


        </div>
        
       </div>
       </div>
      </div>
    );
  }
}

export default IssueDetail;