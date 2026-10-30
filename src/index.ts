import { config } from './config';
import app from './app';
import './database';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
