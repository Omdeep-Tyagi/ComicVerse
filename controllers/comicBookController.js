const asyncHandler= require("express-async-handler");
const ComicBook= require("../models/comicBookModel");



//@desc Create new Comic Book
//@route POST /api/comicBook
const createComicBook=asyncHandler(async(req,res)=>{
    const { bookName, authorName, yearOfPublication, price, discount, numberOfPages, condition, description, genre, inStock } = req.body;

    // Validation to ensure required fields are provided
    if (!bookName || !authorName || !yearOfPublication || !price || !numberOfPages || !condition) {
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    // Create a new Comic Book
    const comicBook = new ComicBook({
        bookName,
        authorName,
        yearOfPublication,
        price,
        discount,
        numberOfPages,
        condition,
        description,
        genre,
        inStock
    });

    const createdComicBook = await comicBook.save();
    res.status(201).json(createdComicBook);
});




// @desc Get all comic books with pagination, filtering, and sorting
// @route GET /api/comicBook
const getAllComicBooks = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'bookName', order = 'asc', author, year, priceMin, priceMax, condition } = req.query;

    // Build filtering options
    let filterOptions = {};
    if (author) filterOptions.authorName = author;
    if (year) filterOptions.yearOfPublication = year;
    if (priceMin || priceMax) filterOptions.price = { $gte: priceMin || 0, $lte: priceMax || Number.MAX_SAFE_INTEGER };
    if (condition) filterOptions.condition = condition;

    // Sorting options
    const sortOrder = order === 'asc' ? 1 : -1;

    // Paginate the data
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: sortOrder }
    };

    const comicbooks = await ComicBook.paginate(filterOptions, options);

    res.status(200).json(comicbooks);
});



//@desc Get Comic Book by ID
//@route GET /api/comicBook/:id
const getComicBook= asyncHandler(async (req,res)=>{
    const comicBook = await ComicBook.findById(req.params.id);

    if (!comicBook) {
        res.status(404);
        throw new Error("Comic Book not found");
    }

    res.status(200).json(comicBook);
});


//@desc Update Comic Book
//@route PUT /api/comicBook/:id
const updateComicBook=  asyncHandler(async (req,res)=>{
    const comicBook = await ComicBook.findById(req.params.id);

    if (!comicBook) {
        res.status(404);
        throw new Error("Comic Book not found");
    }

    const updatedComicBook = await ComicBook.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // This option returns the updated document
    );

    res.status(200).json(updatedComicBook);
});



//@desc Delete Comic Book
//@route DELETE /api/comicBook/:id
const deleteComicBook= asyncHandler(async (req,res)=>{
    const comicBook = await ComicBook.findById(req.params.id);

    if (!comicBook) {
        res.status(404);
        throw new Error("Comic Book not found");
    }

    const deletedComicBook =await comicBook.deleteOne({_id: req.params.id}); 
    
    // Send the deleted comic book details in the response
    res.status(200).json({
        message: "Comic Book deleted successfully",
        deletedComicBook: comicBook // Sending the comicBook object as response
    });
});


module.exports={createComicBook,getAllComicBooks,getComicBook,updateComicBook,deleteComicBook};