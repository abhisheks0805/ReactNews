import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  //These two methods will put deafult value and check that valid datatype is sent through prop respectively
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  //it will run whenever news component obj will be created
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57294dba78d24e929793bf3a5654da33&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  //CDM method executes after render
  async componentDidMount() {
    this.updateNews();
  }
  handleNextClick = async () => {
    let totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);
    console.log(this.state.page);

    if (totalPages > this.state.page) {
      this.setState({
        page: this.state.page+1,
      })
      this.updateNews();
    }

  };
  handlePrevClick = async () => {
    console.log(this.state.page);
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center">Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    author = {element.author}
                    date = {element.publishedAt}
                    source = {element.source.name}
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
