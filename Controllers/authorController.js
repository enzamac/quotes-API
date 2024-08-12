const fs = require('node:fs');
const bodyParser = require('body-parser');

const getallAuthors = (req, res)=>{
    fs.readFile('./Models/authors.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            res.json(JSON.parse(data))
        }
    })
}

const createNewAuthor = (req, res)=>{

    let newAuthor = req.body

    // first get the content
    fs.readFile('./Models/authors.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            fs.writeFile('./Models/authors.json', JSON.stringify([...JSON.parse(data), newAuthor], null, 2), (err)=>{
                if (err){
                        res.send("Failed to add new author")
                } else {
                        res.send("Author added succesfully")
                }
            })
        }
    })
}

const getAuthorById = (req, res) => {

    fs.readFile('./Models/authors.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            
            const id = parseInt(req.params.id);
            const author = JSON.parse(data).find(q => q.id === id);
                
            if (author) {
                res.json(author);
            } else {
                res.status(404).json({ message: "Author not found" });
            }

        }
    })
  }

  const deleteAuthor = (req, res) => {

    fs.readFile('./Models/authors.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            
            const id = parseInt(req.params.id);
            const index = JSON.parse(data).findIndex(q => q.id === id);
            if (index !== -1){
                const deletedAuthor = JSON.parse(data).splice(index, 1)[0];
                res.json({message: "Author deleted succesfully", deletedAuthor});
            } else {
                res.status(404).json({ message: "Author not found" });
            }

        }
    })
  }

module.exports = {
    createNewAuthor,
    getallAuthors,
    getAuthorById,
    deleteAuthor
}