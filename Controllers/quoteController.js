const fs = require('node:fs')
const bodyParser = require('body-parser');

const getallQuotes = (req, res)=>{
    fs.readFile('./Models/quotes.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            res.json(JSON.parse(data))
        }
    })
}

const createNewQuote = (req, res)=>{

    let newQuote = req.body

    // first get the content
    fs.readFile('./Models/quotes.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            fs.writeFile('./Models/quotes.json', JSON.stringify([...JSON.parse(data), newQuote], null, 2), (err)=>{
                if (err){
                        res.send("Failed to add new quote")
                } else {
                        res.send("Author added succesfully")
                }
            })
        }
    })
}

const getQuoteById = (req, res) => {

    fs.readFile('./Models/quotes.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            
            const id = parseInt(req.params.id);
            const quote = JSON.parse(data).find(q => q.id === id);
                
            if (quote) {
                res.json(quote);
            } else {
                res.status(404).json({ message: "Quote not found" });
            }

        }
    })
  }

  const deleteQuote = (req, res) => {

    fs.readFile('./Models/quotes.json', "utf8", (err, data)=>{
        if(err){
            res.send("Failed to read data ....")
        } else {
            
            const id = parseInt(req.params.id);
            const index = JSON.parse(data).findIndex(q => q.id === id);
            if (index !== -1){
                const deletedQuote = JSON.parse(data).splice(index, 1)[0];
                res.json({message: "Quote deleted succesfully", deletedQuote});
            } else {
                res.status(404).json({ message: "Quote not found" });
            }

        }
    })
  }


module.exports = {
    createNewQuote,
    getallQuotes,
    getQuoteById,
    deleteQuote
}