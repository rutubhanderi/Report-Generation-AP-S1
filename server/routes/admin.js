const express = require('express');
const supabase = require('../db/db');
const AdminRouter = express.Router();

AdminRouter.delete('/', async (_request, _response) => {
  const body = _request.body;

  try {
    const { error } = await supabase.from('admin').delete().match({ admin_id: body.admin_id });

    if (error) {
      return _response.status(500).json({ error: error.message });
    }

    return _response.json({ message: "data deleted successfully" });
  } catch (e) {
    return _response.status(500).json({ error: e.message });
  }
});


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

AdminRouter.get('/:id', async (_request, _response) => {
  const { id } = _request.params;
  try {
    const { data, error } = await supabase.from('admin').select('*').eq('admin_id', id);
    if (error) return _response.status(500).json({ error: error.message });
    return _response.json({ data });
  } catch (e) {
    return _response.status(500).json({ error: e.message });
  }
});

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
      admin_date_of_joining: body.admin_date_of_joining
    });

    if (error) {
      return _response.status(500).json({ error: error.message });
    }

    return _response.json({
      message: "data inserted successfully",
      data
    });

  } catch (e) {
    return _response.status(500).json({ error: e.message });
  }
});

// AdminRouter.get('/volunteerlist', async (_request, _response) => {
//   try {
//     const { data, error } = await supabase.from('volunteer').select('*');

//     if (error) {
//       return _response.status(500).json({ error: error.message });
//     }

//     return _response.json({ data });

//   } catch (e) {
//     return _response.status(500).json({ error: e.message });
//   }
// });

// AdminRouter.get('/volunteerlist/:id', async (_request, _response) => {
//   const { id } = _request.params;
//   try {
//     const { data, error } = await supabase.from('volunteer').select('*').eq('volunteer_id', id);
//     if (error) return _response.status(500).json({ error: error.message });
//     return _response.json({ data });
//   } catch (e) {
//     return _response.status(500).json({ error: e.message });
//   }
// });

module.exports = AdminRouter;