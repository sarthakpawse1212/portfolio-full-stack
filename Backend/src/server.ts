import http from 'http';
import app from './express-app';
import {connection} from '../src/database/mongo.connection';

const PORT = process.env.PORT || 3000;
const HOST: any = '0.0.0.0';

async function init() {

    await connection(); // connect to database
    const server = http.createServer(app);

    server.listen(PORT, HOST, () => {
        console.log(`Server is running on http://${HOST}:${PORT}`);
    });
}

init();