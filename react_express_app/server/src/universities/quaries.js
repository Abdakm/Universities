const getAllUniversities = `SELECT * FROM "Universities"`;
const getUniversityById = `SELECT * FROM "Universities" WHERE id_university = $1`;
const checkUniversityExists = `SELECT * FROM "Universities" WHERE university_name = $1 `;
const addUniversity = `INSERT INTO "Universities" (university_name, location, number, email, description, image_src, site, type) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
const deleteUniversity = `DELETE FROM "Universities" WHERE id_university = $1`;
const updateUniversity = `UPDATE "Universities" SET university_name=$1, location=$2, "number"=$3, email=$4, description=$5, image_src=$6, site=$7, type=$8 WHERE id_university = $9`;
module.exports = {
    getAllUniversities,
    getUniversityById,
    checkUniversityExists,
    addUniversity,
    deleteUniversity,
    updateUniversity
}