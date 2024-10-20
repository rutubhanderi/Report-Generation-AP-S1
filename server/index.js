const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const supabase = require('./db/db');

const AdminRouter = require('./routes/admin');
const MemberRouter = require('./routes/member');
const VolunteerRouter = require('./routes/volunteer');
const TaskRouter = require('./routes/task');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', async (_request, _response) => {

  const data = await supabase.from('volunteer').select('*');

  return _response.json({
    'message': "welcome to the route",
    data:data
  });

});

app.use('/admin', AdminRouter);
app.use('/member', MemberRouter);
app.use('/volunteer', VolunteerRouter);
app.use('/task', TaskRouter);

app.listen(PORT, ()=> {
  console.log(`listening at port ${PORT}`);
});


