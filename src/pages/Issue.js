import React from 'react';
import { Grid, Row, Col, Pager, PageItem} from 'react-bootstrap';
import {Link } from 'react-router';

const page_size = 10;





class ButtonLink extends React.Component{
     render(){
         const {onClick, text} = this.props;

         return <button onClick={()=>onClick()}>{text}</button>;
     }
}


export default class Issue extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          page : 0
        };
  }



  getPages(){
     const {page} = this.state;
     const {issues} = this.props;
     const number_of_pages = Math.ceil(issues.length/page_size);
     let next_page = page + 1 ,prev_page = page - 1; 
     let first_page = number_of_pages>0 ? 0 : -1;
     let last_page = number_of_pages > 0 ? number_of_pages - 1 : -1;


     if(page==0){
        prev_page = -1;
     }

     if(page==number_of_pages-1){
        next_page = -1;
     }
     return {
         number_of_pages,
         pages : {
             first_page,
             current_page : page,
             next_page,
             prev_page,
             last_page,
         }
     }

  }

  goToDetailView(issue_id){

  }

  renderIssues() {

    const {page} = this.state;
    const {issues} = this.props;
    let issues_in_page = issues.slice(page,page_size);
    console.log(issues_in_page.length);
    return issues_in_page.map((issue) => {
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
        let issue_link = "issue/"+issue.id;
        return <div className="issue" key={issue.id}>
                  <Link to={issue_link}>View Detail</Link>
                  <h3>{issue.number}:  {issue.title}</h3>
                  <p>Summary: {summary} </p>
                  <ul>{labels}</ul>
                  <img src={issue.user.avatar_url}/>
                  <p className='username'>{issue.user.login}</p>
                </div>;
    });
 }

 shortenSummary(text, maxLength){
   let summary = text.substr(0, maxLength);
   summary = summary.substr(0, Math.min(summary.length, summary.lastIndexOf(" "))) + ' ...';
   return summary;
 }



 goToPage(page){
    this.setState({page});
 }

 renderPagination(){

    const page_data = this.getPages();
    console.log(page_data);
    const {number_of_pages, pages} = page_data;
    const {prev_page,next_page, current_page, first_page,last_page} = pages;

    const first_button = first_page > -1 ? <ButtonLink text="First" onClick={()=>this.goToPage(0)}/>  : <span/>; 
    const last_button = last_page > -1 ? <ButtonLink text="Last" onClick={()=>this.goToPage(last_page)}/>  : <span/>; 
    const prev_button = prev_page > -1 ? <ButtonLink text="Previous" onClick={()=>this.goToPage(prev_page)}/>  : <span/>; 
    const next_button = next_page  > -1 ? <ButtonLink text="Next" onClick={()=>this.goToPage(next_page)}/>  : <span/>; 
    const current_page_button = <ButtonLink text={current_page+ 1} onClick={()=>this.goToPage(current_page)}/> ;

    return <div>
       Number of pages- {number_of_pages}

       {first_button}{prev_button}{current_page_button}{next_button}{last_button}
    </div>
 }


 render() {
    const {issues} = this.props;
    if(!issues){
      return <span/>;
    }


    const itemsPerPage = 25;
    let content = this.renderIssues();



    return (<Grid>
            <Row>
             <Col xsHidden md={3} />
              <Col xs={8} md={6} >
                {this.renderPagination()}
                <div>{content}</div>
               {this.renderPagination()}
              </Col>
              <Col xsHidden md={3} />
              </Row>
            </Grid>);
 }
}
