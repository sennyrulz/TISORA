import adminModel from '../models/adminModel.js';
import Admin from '../models/adminModel.js';

export const getAdmin = async (req, res) => {
  try {
  const admin = await adminModel.find();
    return res.json(admin);
  } catch(err) {res.status(500).json({ message: 'Server error', error: err.message });
}};

export const createAdmin = async (req, res) => {
  try{
    const { payload } = req.body;
    console.log(payload)

    // Validate required fields
    if (!payload || !payload.name || !payload.email || !payload.passwordn) {
    return res.status(400).json({ message: 'All fields are required' });
  }

    // Create new admin
  const newAdmin = new adminModel(payload);

    // Save to DB
    const savedAdmin = await newAdmin.save();

    // Respond
    return res.status(201).json(savedAdmin);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating admin', error: err.message });
  }
};

export const updateAdmin = async (req, res) => {
  const { id, ...others } = req.body;

  // Validate input
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  try {
    const updatedAdmin = await adminModel.findByIdAndUpdate(
      id,
      { ...others },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    return res.json(updatedAdmin);
  } catch (err) {
    return res.status(500).json({ message: 'Error updating admin', error: err.message });
  }
};

export const deleteAdmin = async (req, res) => {
  const { id } = req.query;

  // Validate that ID is provided
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  try {
    const deletedAdmin = await adminModel.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    return res.status(200).json({ message: 'Admin deleted successfully', data: deletedAdmin });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting admin', error: err.message });
  }
};
