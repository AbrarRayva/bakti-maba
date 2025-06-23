const { JadwalKegiatan, Lokasi } = require('../models');

// Display a list of all activities
exports.getActivities = async (req, res) => {
    try {
        const activities = await JadwalKegiatan.findAll({
            include: [{ model: Lokasi }],
            order: [['tanggal', 'ASC'], ['waktu_mulai', 'ASC']]
        });
        res.render('admin/campus/index', {
            title: 'Manage Activities',
            activities,
            layout: 'layouts/admin', // Explicitly set layout
            success_msg: req.flash('success_msg'),
            error_msg: req.flash('error_msg')
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
};

// Show the form for creating a new activity
exports.getNewActivityForm = async (req, res) => {
    try {
        const locations = await Lokasi.findAll();
        res.render('admin/campus/form', {
            title: 'Add New Activity',
            activity: {},
            locations,
            action: '/admin/campus',
            method: 'POST',
            layout: 'layouts/admin' // Specify layout here
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
};

// Create a new activity
exports.createActivity = async (req, res) => {
    try {
        await JadwalKegiatan.create(req.body);
        req.flash('success_msg', 'Activity created successfully!');
        res.redirect('/admin/campus');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Failed to create activity.');
        res.redirect('/admin/campus/new');
    }
};

// Show the form for editing an activity
exports.editActivityForm = async (req, res) => {
    try {
        const activity = await JadwalKegiatan.findByPk(req.params.id);
        if (!activity) {
            return res.status(404).render('error', { message: 'Activity not found' });
        }
        const locations = await Lokasi.findAll();
        res.render('admin/campus/form', {
            title: 'Edit Activity',
            activity,
            locations,
            action: `/admin/campus/${activity.id_kegiatan}?_method=PUT`,
            method: 'POST',
            layout: 'layouts/admin' // Specify layout here
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
};

// Update an activity
exports.updateActivity = async (req, res) => {
    try {
        await JadwalKegiatan.update(req.body, {
            where: { id_kegiatan: req.params.id }
        });
        req.flash('success_msg', 'Activity updated successfully!');
        res.redirect('/admin/campus');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Failed to update activity.');
        res.redirect(`/admin/campus/${req.params.id}/edit`);
    }
};

// Delete an activity
exports.deleteActivity = async (req, res) => {
    try {
        await JadwalKegiatan.destroy({
            where: { id_kegiatan: req.params.id }
        });
        req.flash('success_msg', 'Activity deleted successfully!');
        res.redirect('/admin/campus');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Failed to delete activity.');
        res.redirect('/admin/campus');
    }
};