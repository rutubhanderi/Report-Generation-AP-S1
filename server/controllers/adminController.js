const Admin = require('../models/admin');

const createAdmin = async (req, res) => {
    try {
        const admin = await Admin.create(req.body);
        res.status(201).json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create admin' });
    }
};

const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch admins' });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        await Admin.destroy({ where: { admin_id: id } });
        res.status(200).json({ message: 'Admin deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete admin' });
    }
};

module.exports = { createAdmin, getAdmins, deleteAdmin };
