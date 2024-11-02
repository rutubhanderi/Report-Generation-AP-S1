const express = require('express');
const supabase = require('../db/db');
const AdminRouter = express.Router();

// Get all volunteers
AdminRouter.get('/volunteerlist', async (_request, _response) => {
  try {
    const { data, error } = await supabase.from('volunteer').select('*');
    
    if (error) {
      return _response.status(500).json({ error: error.message });
    }
    
    return _response.json({ data });
  } catch (e) {
    return _response.status(500).json({ error: e.message });
  }
});

// Get specific volunteer
AdminRouter.get('/volunteerlist/:id', async (_request, _response) => {
  const { id } = _request.params;
  try {
    const { data, error } = await supabase
      .from('volunteer')
      .select('*')
      .eq('volunteer_id', id);
    
    if (error) {
      return _response.status(500).json({ error: error.message });
    }
    return _response.json({ data });
  } catch (e) {
    return _response.status(500).json({ error: e.message });
  }
});

// Delete volunteer
AdminRouter.delete('/volunteerlist', async (_request, _response) => {
  const body = _request.body;
  
  try {
    const { error } = await supabase
      .from('volunteer')
      .delete()
      .match({ volunteer_id: body.volunteer_id });
    
    if (error) {
      return _response.status(500).json({ error: error.message });
    }
    
    return _response.json({ message: "Volunteer deleted successfully" });
  } catch (e) {
    return _response.status(500).json({ error: e.message });
  }
});

// Add new volunteer
AdminRouter.post('/volunteerlist', async (_request, _response) => {
  const body = _request.body;
  
  try {
    const { data, error } = await supabase.from('volunteer').insert({
      volunteer_id: body.volunteer_id,
      volunteer_name: body.volunteer_name,
      volunteer_email: body.volunteer_email,
      volunteer_password: body.volunteer_password,
      volunteer_phone: body.volunteer_phone,
      volunteer_address: body.volunteer_address,
      date_of_joining: body.date_of_joining
    });
    
    if (error) {
      return _response.status(500).json({ error: error.message });
    }
    
    return _response.json({
      message: "Volunteer added successfully",
      data
    });
  } catch (e) {
    return _response.status(500).json({ error: e.message });
  }
});

// Delete admin
AdminRouter.delete('/', async (_request, _response) => {
  const body = _request.body;
  
  try {
    const { error } = await supabase
      .from('admin')
      .delete()
      .match({ admin_id: body.admin_id });
    
    if (error) {
      return _response.status(500).json({ error: error.message });
    }
    
    return _response.json({ message: "Admin deleted successfully" });
  } catch (e) {
    return _response.status(500).json({ error: e.message });
  }
});

// Get all admins
AdminRouter.get('/', async (_request, _response) => {
  try {
    const { data, error } = await supabase.from('admin').select('*');
    
    if (error) {
      return _response.status(500).json({ error: error.message });
    }
    
    return _response.json({ data });
  } catch (e) {
    return _response.status(500).json({ error: e.message });
  }
});

// Get specific admin
AdminRouter.get('/:id', async (_request, _response) => {
  const { id } = _request.params;
  try {
    const { data, error } = await supabase
      .from('admin')
      .select('*')
      .eq('admin_id', id);
    
    if (error) return _response.status(500).json({ error: error.message });
    return _response.json({ data });
  } catch (e) {
    return _response.status(500).json({ error: e.message });
  }
});

// Add new admin
AdminRouter.post('/', async (_request, _response) => {
  const body = _request.body;
  
  try {
    const { data, error } = await supabase.from('admin').insert({
      admin_id: body.admin_id,
      admin_name: body.admin_name,
      admin_email: body.admin_email,
      admin_password: body.admin_password,
      admin_phone: body.admin_phone,
      admin_address: body.admin_address,
      date_of_joining: body.date_of_joining
    });
    
    if (error) {
      return _response.status(500).json({ error: error.message });
    }
    
    return _response.json({
      message: "Admin added successfully",
      data
    });
  } catch (e) {
    return _response.status(500).json({ error: e.message });
  }
});

module.exports = AdminRouter;