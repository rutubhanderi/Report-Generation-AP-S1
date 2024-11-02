const express = require('express');
const supabase = require('../db/db');
const VolunteerRouter = express.Router();

// Get all reports
VolunteerRouter.get('/', async (_request, _response) => {
    try {
        const { data, error } = await supabase
            .from('report')
            .select('*')
            .order('report_id', { ascending: true });

        if (error) {
            return _response.status(500).json({ error: error.message });
        }

        return _response.json({ data });
    } catch (error) {
        return _response.status(500).json({ error: error.message });
    }
});

// Get specific report by report_id
VolunteerRouter.get('/:report_id', async (_request, _response) => {
    try {
        const { report_id } = _request.params;

        const { data, error } = await supabase
            .from('report')
            .select('*')
            .eq('report_id', report_id)
            .single();

        if (error) {
            return _response.status(404).json({ error: 'Report not found' });
        }

        return _response.json({ data });
    } catch (error) {
        return _response.status(500).json({ error: error.message });
    }
});

// Create new report
VolunteerRouter.post('/', async (_request, _response) => {
    try {
        const {
            report_id,
            report_name,
            task_completed,
            task_pending,
            total_hours,
            date,
            volunteer_id,
            report_description,
            report_comments,
            report_status,
            admin_id
        } = _request.body;

        const { data, error } = await supabase
            .from('report')
            .insert([
                { 
                    report_id,
                    report_name,
                    task_completed,
                    task_pending,
                    total_hours,
                    date,
                    volunteer_id,
                    report_description,
                    report_comments,
                    report_status,
                    admin_id
                }
            ])
            .select();

        if (error) {
            return _response.status(400).json({ error: error.message });
        }

        return _response.status(201).json({ 
            message: 'Report created successfully',
            data 
        });
    } catch (error) {
        return _response.status(500).json({ error: error.message });
    }
});

// Update report
VolunteerRouter.put('/:report_id', async (_request, _response) => {
    try {
        const { report_id } = _request.params;
        const updateData = _request.body;

        const { data, error } = await supabase
            .from('report')
            .update(updateData)
            .eq('report_id', report_id)
            .select();

        if (error) {
            return _response.status(400).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return _response.status(404).json({ error: 'Report not found' });
        }

        return _response.json({
            message: 'Report updated successfully',
            data
        });
    } catch (error) {
        return _response.status(500).json({ error: error.message });
    }
});

module.exports = VolunteerRouter;