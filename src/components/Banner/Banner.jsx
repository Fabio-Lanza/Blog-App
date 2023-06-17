import { useEffect, useState } from "react";
import "./Banner.css";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

function Banner() {
  const [mainArticle, setMainArticle] = useState("");
  const [otherArticles, setOtherArticles] = useState([]);

  //when this page loads, get to 5 article and display

  useEffect(() => {
    //create reference
    const articleRef = collection(db, "articles");

    //set up query to filter documents
    const q = query(articleRef, orderBy("createdAt", "desc"), limit(5))

    //get documents from this collection
    getDocs(q, articleRef)
      .then((res) => {
        //console.log(res.docs[0].data())
        const articles = res.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        console.log(articles);
        setMainArticle(articles[0]);
        setOtherArticles(articles.splice(1));
      })
      .catch((error) => console.log(error));
  }, []);

  
  return (
    <div className="banner-container">
      <div
        className="main-article-container"
        style={{ backgroundImage: `url(${mainArticle?.imageUrl})`}}>
            <div className="banner-info">
                <h3>Food Article</h3>
                <small>{mainArticle?.createdAt?.toDate().toDateString()}</small>
            </div>
        </div>
      <div className="other-articles-container">
        {otherArticles?.map((item, index)=> (
            <div key={index} className="other-article-item"
            style={{ backgroundImage: `url(${item?.imageUrl})`}}>
                 <div className="banner-info">
                <h3>Food Article</h3>
                <small>{mainArticle?.createdAt?.toDate().toDateString()}</small>
            </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
