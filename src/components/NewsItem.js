import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source} =
      this.props;
    return (
      <div className="my-4">
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By: {author ? author : "Unknown"} On{" "}
                {new Date(date).toGMTString()}{" "}
              </small>
            </p>
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:"1",left:'90%'}}>
              {source}
            </span>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
