require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const supabase = require('./db/db');
import path from 'path';

const AdminRouter = require('./routes/admin.js');
const VolunteerRouter = require('./routes/volunteer.js');

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', async (_request, _response) => {

  // const data = await supabase.from('volunteer')
  // .select('*')
  // .eq('volunteer_id',1);

  return _response.json({
    'message': "welcome to the route",
    // data:data
  });

});

app.use('/admin', AdminRouter);
app.use('/volunteer', VolunteerRouter);
// app.use('/admin/volunteerlist', AdminRouter);

app.use(express.static(path.join(__dirname, 'client/dev')));
app.get('*', (_request, response) => {
  response.sendFile(path.join(__dirname, 'client/dev', 'index.html'));
});

app.listen(PORT, ()=> {
  console.log(`listening at port ${PORT}`);
});
