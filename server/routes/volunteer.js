const express = require('express');
const supabase = require('../db/db');

const VolunteerRouter = express.Router();


VolunteerRouter.get('/', async (_request, _response) => {

  const body = _request.body;

  const { data, error } = await supabase
    .from('report')
    .select('*')
    .order('report_id', { ascending: true });

  if (error) {
    return _response.status(500).json({ error: error.message });
  }

  return _response.json({
    data
  });
});

// VolunteerRouter.get('/:id', async (_request, _response) => {
//   const body= _request.body;

//   const { data, error } = await supabase
//     .from('volunteer')
//     .select('*')
//     .eq('volunteer_id',id);
//   if(error) {
//     return _response.status(500).json({error: error.message });
//   }

//   return _response.json({
//     data: data
//   });
// });

module.exports = VolunteerRouter;