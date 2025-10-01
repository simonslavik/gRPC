const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'greeter.proto');   

const packageDefinition = protoLoader.loadSync(PROTO_PATH);

const proto = grpc.loadPackageDefinition(packageDefinition).greeter;

function sayHello(call, callback) {
  const reply = {message: 'Hello ' + call.request.name};
  callback(null, reply);
}

function getNumbers(call){
    const count = call.request.count;
    let current = 100;
    const interval = setInterval(()=> {
        if(current > count) {
            clearInterval(interval);
            call.end();
            return;
        }
        call.write({
            order: current, number: current * 100
        });
        current++;
    }, 1000);
}


function main() {
  const server = new grpc.Server();
  server.addService(proto.Greeter.service, {SayHello: sayHello, GetNumbers: getNumbers });
  server.bindAsync('0.0.0.0:5050', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error('Error starting gRPC server:', error);
      return;
    }
    console.log(`gRPC server running on port ${port}`);
  });
}

main();
