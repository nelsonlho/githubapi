import React from 'react';
import ajax from 'superagent';

class IssueDetail extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          comments : null,

        };
  }

  componentWillReceiveProps(newProps){
      const {issues} = newProps;
      const {comments} = this.state;
      if(issues && comments == null){
         const issue = issues.find(i=>i.id === parseInt(issueID));
         fetchComments(issue.comments_url);
      }
  }

  parseUsername(str) {
	   return str.replace(/[@]+[A-Za-z0-9-_]+/g, u=> {
		      let username = u.replace("@","");
          username = 'https://www.github.com' + username;
		      return <a href={username}>{u}</a>;
	       });
    };

  fetchComments(url){
    ajax.get(url)
          .end((error, response) => {
              if (!error && response) {
                  if (response.body.comments !== "0")
                    this.setState({ comments: response.body , loading : false});
              } else {
                  console.log(`Error fetching user data.`, error);
              }
          }
      );
  }
  render() {
    console.log(this.props.params);
    const {issueID} = this.props.params;
    const {issues, comments} = this.props;
    if(!issues){
        return <p>Not Found </p>;
    }
    const issue = issues.find(i=>i.id === parseInt(issueID));
    let body = this.parseUsername(issue.body);
    console.log(body);
    if (issue.comments !==0){
      this.fetchComments(issue.comments_url);
    }



    return (
      <div>
        <div className="issue issueDetail">
           <h3>{issue.title}</h3>
           <div>{body}</div>
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
          <p className='username'>{issue.user.login}</p>
        </div>

        <ul>{comments.map((comment,index)=>{
           return <li key={index} >{comment.name}</li>
       })}
       </ul>
      </div>
    );
  }
}

export default IssueDetail;
