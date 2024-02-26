import { httpServer } from './http_server/index';
import { wsServerStart } from './ws_server';

const HTTP_PORT = 8181;
const WS_PORT = 3000;

console.log(`Start static HTTP server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

wsServerStart(WS_PORT);
