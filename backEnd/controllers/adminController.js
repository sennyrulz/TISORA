import Admin from '../models/adminModel.js';

export const getAdmin = (req, res) => {
  Admin.find()
    .then(admins => res.json(admins))
    .catch(err => res.status(500).json({ message: 'Server error', error: err.message }));
};

export const createAdmin = (req, res) => {
  const { id, fullName, email, phone, address, password } = req.body;

  // Validate required fields
  if (!id || !fullName || !email || !phone || !address || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create new admin
  const newAdmin = new Admin({
    id,
    fullName,
    email,
    phone,
    address,
    password,
  });

  newAdmin.save()
    .then(savedAdmin => res.status(201).json(savedAdmin))
    .catch(err => res.status(500).json({ message: 'Error creating admin', error: err.message }));
};

export const updateAdmin = (req, res) => {
  const { id, ...updates } = req.body;
  if (!id) return res.status(400).json({ message: 'ID is required' });

  Admin.findByIdAndUpdate(id, updates, { new: true })
    .then(updated => {
      if (!updated) return res.status(404).json({ message: 'Admin not found' });
      res.json(updated);
    })
    .catch(err => res.status(500).json({ message: 'Error updating admin', error: err.message }));
};

export const deleteAdmin = (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: 'ID is required' });

  Admin.findByIdAndDelete(id)
    .then(deleted => {
      if (!deleted) return res.status(404).json({ message: 'Admin not found' });
      res.json({ message: 'Admin deleted successfully' });
    })
    .catch(err => res.status(500).json({ message: 'Error deleting admin', error: err.message }));
};
