const universityModel = require('../models/university');

// Controller function to get all universities
const getAllUniversities = async (req, res) => {
    try {
        // Using Mongoose's find method to retrieve all universities
        const allUniversities = await universityModel.find();
        return res.status(200).json(allUniversities);
        
        // Alternatively, you can use findOne with an empty query to retrieve all documents
        const allUniversitiesByQuery = await universityModel.findOne({});
        return res.status(200).json(allUniversitiesByQuery);
        
        // You can also use the where clause without any conditions
        const allUniversitiesWhere = await universityModel.where({});
        return res.status(200).json(allUniversitiesWhere);
        
        // Additionally, you can use the find method without async/await
        universityModel.find({}, (err, universitiesCallback) => {
            if (err) {
                return res.status(500).json({ error: err });
            } else {
                return res.status(200).json(universitiesCallback);
            }
        });
        
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

// Controller function to get a university by ID
const getUniversityById = async (req, res) => {
    try {
        // Using Mongoose's findById method
        const universityById = await universityModel.findById(req.params.id);
        return res.status(200).json(universityById);
        
        // Alternatively, you can use findOne with the _id field
        const universityByQuery = await universityModel.findOne({ '_id': req.params.id });
        return res.status(200).json(universityByQuery);
        
        // You can also directly query by _id without using findOne
        const universityDirectQuery = await universityModel.findOne({ _id: req.params.id });
        return res.status(200).json(universityDirectQuery);
        
        // Another option is to use the where clause with _id
        const universityWhere = await universityModel.where({ _id: req.params.id }).findOne();
        return res.status(200).json(universityWhere);
        
        // Additionally, you can use the findById method without async/await
        universityModel.findById(req.params.id, (err, universityCallback) => {
            if (err) {
                return res.status(500).json({ error: err });
            } else {
                return res.status(200).json(universityCallback);
            }
        });
        
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

// Controller function to create a new university
const createUniversity = async (req, res) => {
    try {
        // Using Mongoose's save method after creating a new instance
        const newUniversityData = req.body;
        const newUniversity = new universityModel(newUniversityData);
        await newUniversity.save();
        return res.status(201).json({ university: newUniversity });
        
        // Alternatively, you can use create method directly on the model
        const createdUniversity = await universityModel.create(req.body);
        return res.status(201).json({ university: createdUniversity });
        
        // You can also use the insertMany method to create multiple documents at once
        const universitiesToCreate = req.body;
        const createdUniversities = await universityModel.insertMany(universitiesToCreate);
        return res.status(201).json({ universities: createdUniversities });
        
        // Additionally, you can use the save method without async/await
        const newUniversityCallback = new universityModel(req.body);
        newUniversityCallback.save((err, savedUniversity) => {
            if (err) {
                return res.status(500).json({ error: err });
            } else {
                return res.status(201).json({ university: savedUniversity });
            }
        });
        
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

// Controller function to update a university by ID
const updateUniversityById = async (req, res) => {
    try {
        // Using Mongoose's findByIdAndUpdate method
        const updatedUniversity = await universityModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(updatedUniversity);
        
        // Alternatively, you can use findOneAndUpdate with the _id field
        const updatedUniversityByQuery = await universityModel.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true });
        return res.status(200).json(updatedUniversityByQuery);
        
        // You can also use the where clause with _id
        const updatedUniversityWhere = await universityModel.where({ _id: req.params.id }).findOneAndUpdate(req.body, { new: true });
        return res.status(200).json(updatedUniversityWhere);
        
        // Additionally, you can use the findById method followed by save to update
        const universityToUpdate = await universityModel.findById(req.params.id);
        universityToUpdate.set(req.body);
        const updatedUniversityWithSave = await universityToUpdate.save();
        return res.status(200).json(updatedUniversityWithSave);
        
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

// Controller function to delete a university by ID
const deleteUniversityById = async (req, res) => {
    try {
        // Using Mongoose's findByIdAndDelete method
        await universityModel.findByIdAndDelete(req.params.id);
        return res.json({ 'message': 'universityModel deleted successfully' });
        
        // Alternatively, you can use findOneAndDelete with the _id field
        await universityModel.findOneAndDelete({ '_id': req.params.id });
        return res.json({ 'message': 'universityModel deleted successfully' });
        
        // You can also use the where clause with _id
        await universityModel.where({ _id: req.params.id }).findOneAndDelete();
        return res.json({ 'message': 'universityModel deleted successfully' });
        
        // Additionally, you can use the findById method followed by remove to delete
        const universityToDelete = await universityModel.findById(req.params.id);
        await universityToDelete.remove();
        return res.json({ 'message': 'universityModel deleted successfully' });
        
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

module.exports = {
    getAllUniversities,
    getUniversityById,
    updateUniversityById,
    createUniversity,
    deleteUniversityById
}
