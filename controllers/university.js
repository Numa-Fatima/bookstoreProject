const fs = require('fs')
const uuid = require('uuid')
const path = require('path');

function readFile() {
    const filePath = path.resolve(__dirname, '../University.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}

// Function to write data to a JSON file
function writeFile(data) {
    // Writing the data to University.json file
    fs.writeFileSync(`${__dirname}/../University.json`, JSON.stringify(data), 'utf8')
}


const getAll = (req, res) => {
    try {
        // Sending a JSON response containing all universities
        res.status(200).json({uni: readFile()})
    } catch(e) {
        // Handling errors and sending a 500 status code with error message
        res.status(500).json({ error: e })
    }
}

const getById =  (req, res) => {
    try {
        // Extracting university ID from request parameters
        const id = req.params.id
        // Retrieving the specific university with the given ID
        const university = readFile()[id]
        // If university not found, sending a 404 status code with error message
        if (!university) return res.status(404).json({'message':`University id ${id} not found`});
        // Sending a JSON response containing the requested university
        res.status(200).json({uni:university})
    } catch(e) {
        // Handling errors and sending a 500 status code with error message
        res.status(500).json({ error: e })
    }
}

const create = (req, res) => {
    // Extracting data from request body
    const data = req.body
    // Reading existing data from the file
    let university = readFile()
    // Generating a unique ID for the new university
    const id = uuid.v4()
    // Checking if the generated ID already exists
    if (university[id]) {
        // If ID already exists, sending a JSON response with error message
        return res.json({'message':`University id ${id} is already exists`});
    }
    // Assigning the generated ID to the new university data
    data['university_id'] = id
    // Adding the new university data to the existing data
    university[id] = data
    // Writing the updated data to the file
    writeFile(university)
    // Sending a JSON response containing the newly created university
    res.status(201).json({'university':university[id]})
}

const update = (req, res) => {
    // Extracting data from request body and university ID from request parameters
    const data = req.body
    const id = req.params.id
    // Reading existing data from the file
    let university = readFile()
    // Checking if the university with the given ID exists
    if (!university[id]) return res.status(404).json({'message':'not found'});
    // Assigning the university ID to the updated data
    data['university_id'] = id
    // Updating the university data with the new information
    university[id] = data
    // Writing the updated data to the file
    writeFile(university)
    // Sending a JSON response containing the updated university data
    res.status(200).json({'university':university[id]})
}

const remove = (req, res) => {
    const university_id = req.params.id
    let university = readFile()
    // Checking if the university with the given ID exists
    if (!university[university_id]) {
        // If university doesn't exist, sending a JSON response with error message
        return res.json({'message':`University id ${university_id} not found`});
    }    
    delete university[university_id];
    writeFile(university)
    res.json({'message':'university deleted successfully'})
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}