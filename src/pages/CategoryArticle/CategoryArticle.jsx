import React from "react";
import "./CategoryArticle.css";
import { useParams } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useEffect, useState } from "react";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

function CategoryArticle() {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    //bring our collection from db
    const articleRef = collection(db, "articles");

    //set up query to filter documents
    const q = query(articleRef, where("category", "==", categoryName));

    //get documents from this collection
    getDocs(q, articleRef)
      .then((res) => {
        
        const articles = res.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        console.log(articles);
        setArticles(articles);
      })
      .catch((error) => console.log(error));
  }, [categoryName]); //run anytime that changes


  return (
    <div className="category-articles">
      {/* {articles.map((item)=>(
        <p>{item.title}</p>
      ))} */}

      {articles.map((item)=> (
        <ArticleCard key={item.id} article={item}/>
      ))}
      </div>
  )
}

export default CategoryArticle;
