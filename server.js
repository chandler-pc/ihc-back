import {app} from "./src/app.js";
import db from './src/models/index.js';

const PORT = process.env.PORT || 9000;


(async () => {
  try {
      await db.sequelize.sync();
      console.log('Database synchronized');
  } catch (error) {
      console.error('Error synchronizing the database:', error);
  }
})();


app.listen(PORT,async () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('exit', async () => {
  console.log('Closing server');
  await db.sequelize.close();
  console.log('Server closed');
});
