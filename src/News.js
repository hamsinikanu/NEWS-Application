import React, { useEffect ,useState} from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology"
] 
const  News = () => {
  const [articles,setArticles] = useState([])
  const [totalArticles,setTotalArticles] = useState(0);
  const [currentPage,setCurrentPage] = useState(undefined)
  const [selectedCategory,setSelectedCategory] = useState("general")
 
  const loadNews = ( pageNo = 1)=>{
    console.log(pageNo)
    axios({
      url:"https://newsapi.org/v2/top-headlines",
 method:"GET",
params: {
  country:"in",
  apikey:"192813e9ef2b4309b5c9289d8e422b10",
  page : pageNo,
  category :  selectedCategory
 } }).then((res)=>{
  if(res.status==200){
  console.log(res);
  setArticles([...articles,...res.data.articles])
  setTotalArticles(res.data.totalResults)
  setCurrentPage(pageNo)
  }
 }).catch((err)=>{
  console.log(err);
  alert("Something went wrong")
 })
  
  }

    useEffect(()=>{
        loadNews();
     
    },[])
    useEffect(()=>{
      loadNews()
    },[selectedCategory])
    
  return (
    <div>
       <h1>WELCOME TO TODAYS NEWS</h1>
    <div >
      {
        categories.map((category)=> {
          return (
          
             <button className ="btn btn-primary"  style={{margin:10}} onClick={()=> {
              setArticles([]);
              setSelectedCategory(category);
             }}> {category}</button> 
          )
        })
      }
    <InfiniteScroll style ={{display:"flex", flexWrap:"wrap"}}
             dataLength={articles.length} //This is important field to render the next data
               next={()=> {

                loadNews(currentPage+1);
              
                  console.log("Next");
  }}
  hasMore={totalArticles != articles} >
      {articles.map((article,index) => {
        return (
      <div className="card" style={{width: 200,margin:30, padding:15}} key={index}>
  <img className="card-img-top" src={article.urlToImage} alt="Card image cap" style={{width:"100%",height:"150"}} />
  <div className="card-body">
    <h5 className="card-title">{article.title}</h5>
    <p className="card-text">{article.description}</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>)})}
</InfiniteScroll>
 </div>
 </div>
       
    
  )
}

export default News;
//
//
//
//192813e9ef2b4309b5c9289d8e422b10