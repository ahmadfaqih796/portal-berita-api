// controllers/userController.js

const { Users } = require("../models");

// Mendapatkan semua pengguna
const getAllUserss = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Mendapatkan satu pengguna berdasarkan ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Memperbarui pengguna berdasarkan ID
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update data pengguna
    user.username = username;
    user.password = password;
    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Menghapus pengguna berdasarkan ID
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hapus pengguna
    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllUsers, getUserById, updateUserById, deleteUserById };
