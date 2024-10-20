const express = require('express');
const supabase = require('../db/db');
const AdminRouter = express.Router();

AdminRouter.delete('/', async (_request, _response) => {
  const body = _request.body;

  try{
    const record = await supabase.from('admin').delete().match({admin_id: body.admin_id});
    return _response.json({
      message: "data deleted successfully"
    });
  } catch(e){
    return _response.json({
      e
    });
  }
});

AdminRouter.post('/', async (_request, _response) => {
  const body = _request.body;

  try{

  const data = await supabase.from('admin').insert({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    role: body.role,
    password: body.password
  });

  return _response.json({
    message: "data inserted successfully"
  });

  } catch(e){

    return _response.json({
      e
    });

  }
});



module.exports = AdminRouter;