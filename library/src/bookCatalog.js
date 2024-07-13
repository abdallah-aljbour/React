import axios from "axios";
import "./Catalog.css";
import React, { useState, useEffect } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getDatabase,
  ref,
  push,
  set,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpXE19ah-ZIRaiNjRYpoWFt9UUmNUXdZg",
  authDomain: "react-75781.firebaseapp.com",
  databaseURL: "https://react-75781-default-rtdb.firebaseio.com",
  projectId: "react-75781",
  storageBucket: "react-75781.appspot.com",
  messagingSenderId: "415410449957",
  appId: "1:415410449957:web:919f05499bd9fbee6119cc",
  measurementId: "G-DSS4SFRLLT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

const Catalog = () => {
  const [data, setData] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", isbn: "" });
  const [editingIndex, setEditingIndex] = useState(-1); // -1 means not editing

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://react-75781-default-rtdb.firebaseio.com/books.json"
  //     );
  //     if (response.data) {
  //       const formattedData = Object.keys(response.data).map((key) => ({
  //         id: key,
  //         ...response.data[key],
  //       }));
  //       setData(formattedData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data from Firebase:", error);
  //   }
  // };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://react-75781-default-rtdb.firebaseio.com/books.json"
      );
      if (response.data) {
        const formattedData = Object.keys(response.data)
          .filter((key) => !response.data[key].deleted) // Filter out deleted books
          .map((key) => ({
            id: key,
            ...response.data[key],
          }));
        setData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const booksRef = ref(getDatabase(), "books");
      if (editingIndex === -1) {
        // Add new book
        const newBookRef = push(booksRef);
        await set(newBookRef, { ...newBook, deleted: false }); // Include deleted flag
      } else {
        // Edit existing book
        const bookId = data[editingIndex].id;
        const bookRef = ref(getDatabase(), `books/${bookId}`);
        await update(bookRef, newBook);
      }
      setNewBook({ title: "", author: "", isbn: "" });
      setEditingIndex(-1); // Reset editing state
      fetchData(); // Refresh the data after adding/editing a book
      alert(
        editingIndex === -1
          ? "Book added successfully!"
          : "Book updated successfully!"
      );
    } catch (error) {
      console.error("Error adding/editing book to Firebase:", error);
      alert("Error adding/editing book to Firebase. Please try again.");
    }
  };

  const handleEdit = (index) => {
    // Set current book data for editing
    const { title, author, isbn } = data[index];
    setNewBook({ title, author, isbn });
    setEditingIndex(index);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const bookRef = ref(getDatabase(), `books/${id}`);
        await update(bookRef, { deleted: true }); // Soft delete by marking as deleted
        fetchData(); // Refresh the data after deleting
        alert("Book deleted successfully!");
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Error deleting book. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="add-book-form">
        <h2>{editingIndex === -1 ? "Add a New Book" : "Edit Book"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            ISBN:
            <input
              type="text"
              name="isbn"
              value={newBook.isbn}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">
            {editingIndex === -1 ? "Add Book" : "Update Book"}
          </button>
        </form>
      </div>

      <div className="catalog">
        {data.map((e, index) => (
          <div key={e.id} className="card">
            <p>Title : {e.title}</p>
            <p>Author : {e.author}</p>
            <p>ISBN : {e.isbn}</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(e.id)}> Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Catalog;
