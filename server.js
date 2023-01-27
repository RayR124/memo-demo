const express = require("express");

const app = express();
const port = process.env.port || 3306;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/api')(app);
require('./routes/html')(app);

app.listen(port, () => {
    console.log(`Server is listening (quietly) on PORT ${port}`);
});