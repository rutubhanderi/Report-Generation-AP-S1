const express = require('express');
const supabase = require('../db/db');

const VolunteerRouter = express.Router();

VolunteerRouter.delete('/', async(_request, _response) => {
  const body =  _request.body;
  try{
    const records = await supabase.from('volunteer').delete().match({volunteer_id: body.volunteer_id});
    return _response.json({
      message: "data deleted successfully"
    });
  } catch(e){
    return _response.json({
      e
    });
  }
})


VolunteerRouter.post('/', async (_request, _response) => {
  const body = _request.body;

  try{


  const data = await supabase.from('volunteer').insert({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email ,
    phone_number: body.phone_number,
    role: body.role,
    join_date: body.join_date

  });

  return _response.json({
    message: "data inserted successfully"
  });

  } catch(e) {
    return _response.json({
      e
    });
  }
  
});


VolunteerRouter.get('/', async (_request, _response) => {

  const body = _request.body;
  console.log(body); 

  const data = await supabase.from('volunteer').select('*').eq('volunteer_id', parseInt(body.volunteer_id));
  const hours = await supabase.from('volunteer_task').select('hours_spent').eq('volunteer_id', parseInt(body.volunteer_id));
  const projects = await supabase.from('volunteer_task').select('*').eq('volunteer_id', parseInt(body.volunteer_id));

  let totalHours = 0;
  let totalProjects = 0;
  hours.data.map(hour => totalHours+=hour)
  projects.data.map(project => totalProjects++) 
  
  console.log(totalProjects);

  return _response.json({
    data: data.data,
    hours: totalHours,
    projects: totalProjects 
  });

});

VolunteerRouter.get('/report', async (_request, _response) => {

  const body = _request.body;

  const { data, error } = await supabase
  .from('report')
  .select(`*`).eq('volunteer_id', parseInt(body.volunteer_id))
  .order('report_id', { ascending: true });

  if (error) {
    throw error;
  }

  return _response.json({
     data 
  });

});

VolunteerRouter.get('/logs', async (_request, _response) => {

  const body = _request.body;

  const {data, error} = await supabase
  .from('volunteer_task')
  .select('task_id, hours_spent').eq('volunteer_id', parseInt(body.volunteer_id));

  const extractedIds = []
  data.map(dataItem => extractedIds.push(dataItem.task_id));
  const tasks  = await supabase.from('task').select('task_id, task_name');
  const filtered_tasks = tasks.filter(singleTask => extractedIds.includes(singleTask.id))

  return _response.json({
    tasks: filtered_tasks,
    data: data
  });
})


module.exports = VolunteerRouter;