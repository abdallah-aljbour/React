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
  const divStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  };

  const pStyle = {
    margin: "5px 0",
    fontWeight: "bold",
  };

  const containerStyle = {
    maxWidth: "600px",
    margin: "auto",
    paddingTop: "20px",
  };

  return (
    <div className="container" style={containerStyle}>
      {initState.books.map((book) => (
        <div key={book.id} style={divStyle}>
          <p style={pStyle}>Title: {book.title}</p>
          <p style={pStyle}>Author: {book.author}</p>
          <p style={pStyle}>ISBN: {book.isbn}</p>
        </div>
      ))}
    </div>
  );
}
export default Object;
