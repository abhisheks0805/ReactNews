import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  //it will run whenever news component obj will be created
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  //CDM method executes after render
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=57294dba78d24e929793bf3a5654da33&page=1&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  handleNextClick = async () => {
    let totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);

    if (totalPages > this.state.page) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=57294dba78d24e929793bf3a5654da33&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true,
      })
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ articles: parsedData.articles });

      this.setState({
        page: this.state.page + 1,
        loading: false,
      });
    }
  };
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=57294dba78d24e929793bf3a5654da33&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });

    this.setState({
      page: this.state.page - 1,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center">Top Headlines</h2>
        {this.state.loading&&<Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://www.roobinascake.com/assets/admin/images/no-preview-available.png"
                  }
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page == 1}
            type="button"
            class="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &laquo; Previous
          </button>
          <button
            disabled={
              Math.ceil(this.state.totalResults / this.props.pageSize) ==
              this.state.page
            }
            type="button"
            class="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
