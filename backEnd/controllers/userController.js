import User from '../models/userModel.js'

const getUser = (req, res) =>{
User.find()
.then(users => res.json(users))
.catch(err => res.status(500).json({ message: 'Server error', error: err.message }));
};

export const createUser = (req, res)=>{
    const {
    id,
    fullName,
    email,
    phone,
    address,
    password} = req.body

// Validate required fields
    if (!id || !fullName || !email || !phone || !address || !password ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

//Create new user
const newUser = new User ({
    id,
    fullName,
    email,
    phone,
    address,
    password,
});
newUser.save()
.then(savedUser => res.status(201).json(savedUser))
.catch(err => res.status(500).json({ message: 'Error creating user', error: err.message }));
};
   
//Update admin
const updateUser = (req,res)=>{
    const {id, ...updates } = req.body
    if (!id) return res.status(400).json({ message: 'ID is required' });
User.findByIdAndUpdate(id, updates, { new: true })
    .then(updated => {
      if (!updated) return res.status(404).json({ message: 'User not found' });
      res.json(updated);
    })
    .catch(err => res.status(500).json({ message: 'Error updating user', error: err.message }));
};

// Delete user
const deleteUser = (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: 'ID is required' });

  User.findByIdAndDelete(id)
    .then(deleted => {
      if (!deleted) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    })
    .catch(err => res.status(500).json({ message: 'Error deleting user', error: err.message }));
};

export { getUser, updateUser, deleteUser };