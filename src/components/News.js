import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  //These two methods will put deafult value and check that valid datatype is sent through prop respectively
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
    totalResults: 0,
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  //it will run whenever news component obj will be created
  constructor(props) {
    super(props);
    document.title = `${this.capitalize(this.props.category)} AppTitle`;
    this.state = {
      articles: [],
      loading: true,
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

  fetchMoreData = async() => {
    this.setState({page: this.state.page+1});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=57294dba78d24e929793bf3a5654da33&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat( parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

   capitalize=(word)=>{
    let sliceAlpha = word.slice(0,1);
    let capitalizedAlpha = sliceAlpha.toUpperCase();
    return capitalizedAlpha+word.slice(1);
    
    
}

  render() {
    return (
      <>
        <h2 className="text-center" >Top Headlines On {this.capitalize(this.props.category)}</h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!=this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {
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
        </div>
        </InfiniteScroll>
    
      </>
    );
  }
}

export default News;
