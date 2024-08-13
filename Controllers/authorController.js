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

  
  // update the existing author by id 
const updateAuthorById = (req, res) => {
    // refer to an id
    const { id } = req.params
    // read file
    fs.readFile('./Models/authors.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('Failed to get data')
        } else {
            const authors = JSON.parse(data)
            const authorIndex = authors.findIndex(a => a.id == id)
            if (authorIndex !== -1) {
                authors[authorIndex] = { ...authors[authorIndex], ...req.body }
                // write data to the file
                fs.writeFile('./Models/authors.json', JSON.stringify(authors, null, 2), (err) => {
                    if (err) {
                        res.send('Failed to update authors')
                    } else {
                        res.json(authors[authorIndex])
                    }
                })
            } else {
                res.send('Authors not found')
            }

        }
    })

}

// delete author by id 
const deleteAuthorById = (req, res) => {
    // refer to an id
    const { id } = req.params
    // read file
    fs.readFile('./Models/authors.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('Failed to get data')
        } else {
            let authors = JSON.parse(data)
            const authorIndex = authors.findIndex(a => a.id == id)
            if (authorIndex !== -1) {
                authors = authors.filter(a=>a.id !== id)
                // write data to the file
                fs.writeFile('./Models/authors.json', JSON.stringify(authors, null, 2), (err) => {
                    if (err) {
                        res.send('Failed to update authors')
                    } else {
                        res.json('Successfully deleted author')
                    }
                })
            } else {
                res.send('Authors not found!')
            }

        }
    })

}

module.exports = {
    createNewAuthor,
    getallAuthors,
    getAuthorById,
    updateAuthorById,
    deleteAuthorById
}