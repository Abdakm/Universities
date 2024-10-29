const getUsers = `SELECT * FROM Users`;
const addUser = `INSERT INTO public.users(firstname, lastname, password, email, phone, university_name) VALUES ($1, $2, $3, $4, $5, $6)`;
const getUserByEmail = `SELECT * FROM Users WHERE email = $1`;
const getUserById = `SELECT * FROM Users WHERE user_id = $1`;
const updateUser = `UPDATE users SET firstname=$1, lastname=$2,password=$3, email=$4, phone=$5, university_name=$6 WHERE user_id=$7`;
const deleteUser = `DELETE FROM Users WHERE user_id = $1`;
const checkUser = `SELECT * FROM Users WHERE email = $1 and password = $2`;
const getSession = `SELECT * FROM UsersSession WHERE sid = $1`;

module.exports = {
    getUsers,
    addUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
    checkUser,
    getSession,
}