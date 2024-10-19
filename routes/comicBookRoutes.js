const express=require("express");
const router=express.Router();
const {createComicBook,getAllComicBooks,getComicBook,updateComicBook,deleteComicBook}=require("../controllers/comicBookController");

router.route("/")
    .post(createComicBook) //to add a new comic book to the inventory 
    .get(getAllComicBooks); //to retrieve all available comic books in the inventory


router.route("/:id")
    .get(getComicBook)// returns the full details of a specific comic book based on its ID
    .put(updateComicBook)//updates to the attributes of an existing comic book 
    .delete(deleteComicBook);// removes a comic book from the inventory

module.exports=router;

