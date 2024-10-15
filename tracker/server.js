import express from 'express';
import cors from 'cors'; 
import fs from 'fs'; 


const app = express();



const corsOption = {
    origin: '*',
    optionSuccessStatus:200,
}

app.use(cors(corsOption))
app.use(express.json()); // parse incoming JSON data


// routing to save coins data to a JSON file
app.post('/save-coins', (req, res) => {
    const coinsData = req.body; // data sent from the frontend

    fs.writeFile('coinsData.json', JSON.stringify(coinsData, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Error saving data');
        }
        console.log('Data successfully written to coinsData.json');
        res.status(200).send('Data saved successfully');
    });
});



const server = app.listen(8082, function () {
    const port = server.address().port;
    console.log("Backend API listening over port: " + port);
})