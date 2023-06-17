import React from "react";
import "./AddArticle.css";
import { useState } from "react";
import { storage, db, auth } from "../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddArticle() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const categories = ["Health", "Food", "Travel", "Technology"];
  const [formData, setFormData] = useState([
    {
      title: "",
      summary: "",
      paragraphOne: "",
      paragraphTwo: "",
      paragraphThree: "",
      category: "",
      image: "",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    //upload image to storage
    const imageRef = ref(storage, `images/${formData.image.name + v4()}`);
    uploadBytes(imageRef, formData.image)
      .then((res) => {
        console.log(res.ref);
        //get the url from this ref
        getDownloadURL(res.ref).then((url) => {
          console.log("this is url", url);

          //create reference to collection
          const articleRef = collection(db, "articles");

          //use addDoc to add documents
          addDoc(articleRef, {
            title: formData.title,
            summary: formData.summary,
            paragraphOne: formData.paragraphOne,
            paragraphTwo: formData.paragraphTwo,
            paragraphThree: formData.paragraphThree,
            category: formData.category,
            imageUrl: url,
            createdBy: user.displayName,
            userId: user.uid,
            createdAt: Timestamp.now().toDate(),
          });
        });
      })
      .then((res) => {
        toast("article saved successfully!", {
          type: "success",
          position: "top-right",
          autoClose: 5000,
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="add-article-form" onSubmit={handleSubmit}>
      <h2>Create Article</h2>
      <div className="input-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Maximum 100 characters"
          maxLength="100"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label htmlFor="summary">Summary</label>
        <textarea
          id="summary"
          onChange={(e) =>
            setFormData({ ...formData, summary: e.target.value })
          }
          placeholder="Maximum 120 characters"
          maxLength="120"
        />
      </div>
      <div className="input-group">
        <label htmlFor="paragraphOne">Paragraph One</label>
        <textarea
          id="paragraphOne"
          onChange={(e) =>
            setFormData({ ...formData, paragraphOne: e.target.value })
          }
          placeholder="Maximum 650 characters"
          maxLength="650"
        />
      </div>
      <div className="input-group">
        <label htmlFor="paragraphTwo">Paragraph Two</label>
        <textarea
          id="paragraphTwo"
          onChange={(e) =>
            setFormData({ ...formData, paragraphTwo: e.target.value })
          }
          placeholder="Maximum 650 characters"
          maxLength="650"
        />
      </div>
      <div className="input-group">
        <label htmlFor="paragraphThree">Paragraph Three</label>
        <textarea
          id="paragraphThree"
          onChange={(e) =>
            setFormData({ ...formData, paragraphThree: e.target.value })
          }
          placeholder="Maximum 650 characters"
          maxLength="650"
        />
      </div>
      <div className="input-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="">Select</option>
          {categories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label>Upload Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddArticle;
