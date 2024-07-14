import React from "react";

function Object() {
  const initState = {
    books: [
      {
        id: 1,
        title: "مقدمة ابن خلدون ",
        author: "ابن خلدون ",
        isbn: "1289499030",
      },
      {
        id: 2,
        title: "الحاوي في الطب ",
        author: "ابو بكر الرازي ",
        isbn: "893847239479",
      },
      {
        id: 3,
        title: "الحاوي في الطب ",
        author: "ابو بكر الرازي ",
        isbn: "893847239479",
      },
      {
        id: 4,
        title: "مقدمة ابن خلدون ",
        author: "ابن خلدون ",
        isbn: "1289499030",
      },
      {
        id: 5,
        title: "الحاوي في الطب ",
        author: "ابو بكر الرازي ",
        isbn: "893847239479",
      },
      {
        id: 6,
        title: "الحاوي في الطب ",
        author: "ابو بكر الرازي ",
        isbn: "893847239479",
      },
    ],
  };

  return (
    <div className="container mx-auto max-w-screen-md pt-20">
      {initState.books.map((book) => (
        <div
          key={book.id}
          className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-100 shadow-md"
        >
          <p className="font-bold mb-2">Title: {book.title}</p>
          <p className="font-bold mb-2">Author: {book.author}</p>
          <p className="font-bold mb-2">ISBN: {book.isbn}</p>
        </div>
      ))}
    </div>
  );
}

export default Object;
