import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    
    let { title, description, imageUrl, newsUrl, author, timeStamp, source , theme} = this.props //obtained from .map() of News component
  
    return (
      <div className="card border-0" style={{ width: "18rem" }}>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className= {`card-body bg-${theme==='light'?'light':'dark'} text-${theme==='light'?'dark':'light'} `}>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ left: '90%',  zIndex: '1'}}>
            {source}</span>
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {author} on {new Date(timeStamp).toGMTString()}</small></p>
          <a href={newsUrl} target="_blank" className={`btn btn-sm btn-outline-primary`}>Read More</a>
        </div>
      </div>
    )
  }
}
