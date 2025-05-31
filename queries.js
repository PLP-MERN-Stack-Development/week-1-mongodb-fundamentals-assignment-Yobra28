//Task 2: Basic CRUD Operations
//finding genre with specific
db.books.find({ genre: "Romance" });


//Find books published after a certain year
db.books.find({ published_year: { $gt: 1945 } });


//Find books by a specific author
db.books.find({author: "Paulo Coelho"})


//Update the price of a specific book

db.books.updateOne({author: "Paulo Coelho"}, {$set: {price:20.99}});

// Delete a book by its title
db.books.deleteOne({title: "The Alchemist"})

//Task 3: Advanced Queries
/* Write a query to find books that are both in stock and published after 2010 */
db.books.find({
  in_stock: true,
  published_year: { $gt: 1945 }
});



/* Use projection to return only the title, author, and price fields in your queries*/
db.books.find(
  { genre: "Fantasy" },
  { title: 1, author: 1, price: 1 }
);

/* Implement sorting to display books by price (both ascending and descending) */
 db.books.find().sort({ price: 1 }); // Ascending
db.books.find().sort({ price: -1 }); // Descending


/*Use the `limit` and `skip` methods to implement pagination (5 books per page) */
db.books.find().skip(5).limit(5);


//Task 4: Aggregation Pipeline
/*Create an aggregation pipeline to calculate the average price of books by genre */
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
]);


/*Create an aggregation pipeline to find the author with the most books in the collection */
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  }
]);

/*Implement a pipeline that groups books by publication decade and counts them */
db.books.aggregate([
  {
    $group: {
      _id: "$published_year",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
]);

//Task 5: Indexing
/*Create an index on the `title` field for faster searches*/
db.books.createIndex({ title: 1 });

/*Create a compound index on `author` and `published_year`*/
db.books.createIndex({ author: 1, published_year: 1 });

/*Use the `explain()` method to demonstrate the performance improvement with your indexes*/
// Without index
db.books.find({ title: "The Great Gatsby" }).explain("executionStats");

// With index (run after creating the index)
db.books.find({ title: "The Great Gatsby" }).explain("executionStats");