const express = require('express');
const supabase = require('../db/db');

const MemberRouter = express.Router();

MemberRouter.post('/', async (_request, _response) => {
  const body = _request.body;

  try{
  
  const data = await supabase.from('member').insert({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    role: body.role,
    password: body.password
  });

  return _response.json({
    message: "succesfully data added to the database"
  });

  } catch(e){
    return _response.json({
      e
    });
  }
});


MemberRouter.delete('/', async (_request, _response) => {
  const body = _request.body;
  
  try{
    const records = await supabase.from('member').delete().match({member_id: body.member_id});
    return _response.json({
      message: "deleted successfully",
      records 
    });
  } catch(e){
    return _response.json({
      e
    });
  }

});


module.exports = MemberRouter;