const express = require('express');
const supabase = require('../db/db');

const VolunteerRouter = express.Router();


VolunteerRouter.get('/', async (_request, _response) => {
  const { data, error } = await supabase
    .from('report')
    .select(`
      report_id,
      report_name,
      report_status
    `)
    .order('report_id', { ascending: true });

  if (error) {
    return _response.status(500).json({ error: error.message });
  }

  return _response.json({
    data
  });
});

module.exports = VolunteerRouter;