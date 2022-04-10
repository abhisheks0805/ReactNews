import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News= (props)=> {
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,settotalResults] = useState(0);
  //document.title = `${capitalize(props.category)} AppTitle`;
  
  const updateNews=async()=> {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${props.page}&pageSize=${props.pageSize}`;
    setLoading(true);
    
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);
    
  }
  //useEffect method executes after render
  useEffect(() => {
    updateNews();
  },[]);
  

  const fetchMoreData = async () => {
    setPage(page+1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${props.page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
    setLoading(false);
  };

  const capitalize = (word) => {
    let sliceAlpha = word.slice(0, 1);
    let capitalizedAlpha = sliceAlpha.toUpperCase();
    return capitalizedAlpha + word.slice(1);
  };

 
    return (
      <>
        <h2 className="text-center">
          Top Headlines On {capitalize(props.category)}
        </h2>
        {/* {loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length != totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
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
News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
  totalResults: 0,
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
