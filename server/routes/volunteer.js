const express = require('express');
const supabase = require('../db/db');

const VolunteerRouter = express.Router();


// VolunteerRouter.get('/', async (_request, _response) => {

//   const body = _request.body;

//   const { data, error } = await supabase
//     .from('report')
//     .select(`
//       report_id,
//       report_name,
//       report_status
//       volunteer: volunteer_id (volunteer_name)
//     `)
//     .order('report_id', { ascending: true });

//   if (error) {
//     return _response.status(500).json({ error: error.message });
//   }

//   return _response.json({
//     data
//   });
// });

VolunteerRouter.get('/', async (_request, _response) => {
  const body= _request.body;

  const { data, error } = await supabase
    .from('volunteer')
    .select('*')
    .eq('volunteer_id',1);
  if(error) {
    return _response.status(500).json({error: error.message });
  }

  return _response.json({
    data: data
  });
});

module.exports = VolunteerRouter;