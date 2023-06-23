import "./Likes.css";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { auth } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../config/firebaseConfig";
import {
  addDoc,
  collection,
  where,
  query,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Likes({ articleId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const likesRef = collection(db, "likes");

    if (user) {
      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user.uid)
      );

      getDocs(q, likesRef).then((res) => {
        if (res.size > 0) {
          setIsLiked(true);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    const likesRef = collection(db, "likes");
    const q2 = query(likesRef, where("articleId", "==", articleId));
    getDocs(q2, likesRef).then((res) => {setLikeCount(res.size)});
  }, [isLiked]);

  const handleLike = () => {
    if (user) {
      const likesRef = collection(db, "likes");

      addDoc(likesRef, { userId: user?.uid, articleId: articleId }).then(
        (res) => setIsLiked(true)
      );
    }
  };

  const handleUnlike = () => {
    if (user) {
      const likesRef = collection(db, "likes");

      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user.uid)
      );

      getDocs(q, likesRef).then((res) => {
        console.log(res.size);
        const likedId = res.docs[0].id;

        deleteDoc(doc(db, "likes", likedId))
          .then((res) => setIsLiked(false))
          .catch((err) => console.log(err));
      });
    }
  };

  return (
    <div>
      {isLiked ? (
        <FaHeart onClick={handleUnlike} />
      ) : (
        <FaRegHeart onClick={handleLike} />
      )}
      <span>{likeCount}</span>
    </div>
  );
}

export default Likes;
