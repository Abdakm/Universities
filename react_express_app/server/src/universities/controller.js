const pool = require('../../db/dbUniversity');
const queries = require('./quaries');


const getUniversities = (req, res) => {
    pool.query(queries.getAllUniversities, (err, result) => {
        if(err) throw err;
        return res.status(200).send(result.rows);
    })
}

const addUniversity = (req, res) => {
    const {university_name, location, number, email, description, image_src, site, type} = req.body;
    // check if the university alrady exisits
    pool.query(queries.checkUniversityExists,[university_name], (err, result) => {
        if(err) throw err;
        if(result.rows.length){
            return res.status(400).json({message:'this university alrady exists !!!'});
        } else if(university_name && email && image_src && type){
            pool.query(queries.addUniversity, [university_name, location, number, email, description, image_src, site, type], (err, result) => {
                if(err) throw err;
                return res.status(201).json({message: 'the university has been added successfuly'});
            })
        } else {
            return res.status(400).json({message:'your information is bad !!!'});
        }
    })
}

const getUniversityById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUniversityById, [id], (err, result) => {
        if(err) throw err;
        const noUniversityFound = !result.rows.length;
        if(noUniversityFound) return res.status(400).json({message: 'you are posting wrong information'});
        
        return res.status(200).json(result.rows);        
    })
}

const editUniversity = (req, res) => {
    const {university_name, location, number, email, description, image_src, site, type} = req.body;

    pool.query(queries.checkUniversityExists,[university_name], (err, result) => {
        if(err) throw err;
        if(result.rows.length) return res.status(400).json({message:'this university alrady exists !!!'});
    
        const id = parseInt(req.params.id);
        pool.query(queries.getUniversityById, [id], (err, result) => {
            if(err) throw err;
            if(!result.rows.length) return res.status(400).send('there is no university have this id');
                
            if(university_name && email && type){
                    pool.query(queries.updateUniversity, [university_name, location, number, email, description, image_src, site, type, id], (err, result) => {
                        if(err) throw err;
                        return res.status(201).json({message: 'university has been updated successfully'});
                    })
                } else {
                    return res.status(400).json({message: "there is important information you are not post it"});
                }
            })
        })
}

const deleteUniversity = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUniversityById, [id], (err, result) => {
        const noUniversityFound = !result.rows.length;
        if(noUniversityFound) return res.status(400).json({message: "thers is no university, you post bad information"});
        
        pool.query(queries.deleteUniversity, [id], (err, result) => {
            if(err) throw err;
            res.status(200).json({message: "the university deleted successfuly"})
        })
    })
}

module.exports = {
    getUniversities,
    addUniversity,
    getUniversityById,
    editUniversity,
    deleteUniversity,
}