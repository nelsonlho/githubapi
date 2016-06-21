import React from 'react';
import ajax from 'superagent';
import { Grid, Row, Col, Pager, PageItem} from 'react-bootstrap';

export default class Issue extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          issues: [],
        };
  }
  componentWillMount() {
    ajax.get(`https://api.github.com/repos/rails/rails/issues`)
        .end((error, response) => {
            if (!error && response) {
                this.setState({ issues: response.body });
            } else {
                console.log(`Error fetching user data.`, error);
            }
        }
    );
  }

  renderIssues() {
    return this.state.issues.map((issue) => {
        let id = issue.id;
        let labels = issue.labels.map((label, index) =>{
          let fontColor = 'black';
          if (label.name === "activerecord" || label.name === "needs work"
            || label.name === "attached PR" )
            fontColor = 'white';
          let labelKey = id + index;
          let labelStyle = {
            borderRadius: '3px',
            backgroundColor: '#'+label.color,
            color: fontColor,
            padding: '4px',
            height: '15px',
            width: '15px',
            marginRight: '5px',
            fontSize: 14
          }
          return <span style={labelStyle} key={labelKey}><li>{label.name}</li></span>;
        });
        let maxLength = 140;
        let summary = issue.body;
        summary = this.shortenSummary(summary, maxLength);
        return (
              <div className="issue" key={issue.id}>
                  <h3>{issue.number}:  {issue.title}</h3>
                  <p>Summary: {summary} </p>
                  <ul>{labels}</ul>
                  <img src={issue.user.avatar_url}/>
                  <p className='username'>{issue.user.login}</p>
                </div>);
    });
 }

 shortenSummary(text, maxLength){
   let summary = text.substr(0, maxLength);
   summary = summary.substr(0, Math.min(summary.length, summary.lastIndexOf(" "))) + ' ...';
   return summary;
 }


 render() {
    const itemsPerPage = 25;
    let content = this.renderIssues();

    return (<Grid>
            <Row>
             <Col xsHidden md={3} />
              <Col xs={8} md={6} >
                <div>{content}</div>
              </Col>
              <Col xsHidden md={3} />
              </Row>
            </Grid>);
 }
}
