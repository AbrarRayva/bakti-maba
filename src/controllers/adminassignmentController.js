const { Tugas } = require('../models');
const path = require('path');
const fs = require('fs');

// Display a list of all assignments
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Tugas.findAll({ order: [['createdAt', 'DESC']] });
        res.render('admin/assignment/index', {
            title: 'Manage Assignments',
            assignments,
            layout: 'layouts/admin',
            success_msg: req.flash('success_msg'),
            error_msg: req.flash('error_msg')
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Failed to retrieve assignments.' });
    }
};

// Show the form for creating a new assignment
exports.getNewAssignmentForm = (req, res) => {
    res.render('admin/assignment/form', {
        title: 'Add New Assignment',
        assignment: {},
        action: '/admin/assignment',
        layout: 'layouts/admin'
    });
};

// Create a new assignment
exports.createAssignment = async (req, res) => {
    try {
        const { nama_tugas, deskripsi, deadline, link } = req.body;
        let filePath = null;

        if (req.file) {
            filePath = `/uploads/${req.file.filename}`;
        } else if (link) {
            filePath = link;
        }

        await Tugas.create({ nama_tugas, deskripsi, deadline, file_path: filePath });
        req.flash('success_msg', 'Assignment created successfully!');
        res.redirect('/admin/assignment');
    } catch (error) {
        console.error('Error creating assignment:', error);
        req.flash('error_msg', 'Failed to create assignment.');
        res.redirect('/admin/assignment/new');
    }
};

// Show the form for editing an assignment
exports.editAssignmentForm = async (req, res) => {
    try {
        const assignment = await Tugas.findByPk(req.params.id);
        if (!assignment) {
            req.flash('error_msg', 'Assignment not found.');
            return res.redirect('/admin/assignment');
        }
        res.render('admin/assignment/form', {
            title: 'Edit Assignment',
            assignment,
            action: `/admin/assignment/${assignment.id_tugas}?_method=PUT`,
            layout: 'layouts/admin'
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Failed to retrieve assignment for editing.' });
    }
};

// Update an assignment
exports.updateAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_tugas, deskripsi, deadline, link } = req.body;
        const assignment = await Tugas.findByPk(id);

        if (!assignment) {
            req.flash('error_msg', 'Assignment not found.');
            return res.redirect('/admin/assignment');
        }

        let filePath = assignment.file_path;
        if (req.file) {
            filePath = `/uploads/${req.file.filename}`;
        } else if (link) {
            filePath = link;
        }

        await assignment.update({ nama_tugas, deskripsi, deadline, file_path: filePath });
        req.flash('success_msg', 'Assignment updated successfully!');
        res.redirect('/admin/assignment');
    } catch (error) {
        console.error('Error updating assignment:', error);
        req.flash('error_msg', 'Failed to update assignment.');
        res.redirect(`/admin/assignment/${req.params.id}/edit`);
    }
};


// Delete an assignment
exports.deleteAssignment = async (req, res) => {
    try {
        const assignment = await Tugas.findByPk(req.params.id);
        if (assignment) {
            // Delete associated file if it exists and is not a URL
            if (assignment.file_path && !assignment.file_path.startsWith('http')) {
                const fullPath = path.join(__dirname, '..', '..', 'public', assignment.file_path);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            }
            await assignment.destroy();
            req.flash('success_msg', 'Assignment deleted successfully!');
        } else {
            req.flash('error_msg', 'Assignment not found.');
        }
        res.redirect('/admin/assignment');
    } catch (error) {
        console.error('Error deleting assignment:', error);
        req.flash('error_msg', 'Failed to delete assignment.');
        res.redirect('/admin/assignment');
    }
};
