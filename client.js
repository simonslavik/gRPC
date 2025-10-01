const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'greeter.proto');   

const packageDefinition = protoLoader.loadSync(PROTO_PATH);

const proto = grpc.loadPackageDefinition(packageDefinition).greeter;


function main() {
  const client = new proto.Greeter('localhost:5050', grpc.credentials.createInsecure());
    // Call the SayHello RPC method on the Greeter service
    /*
        // Sends a request with the name "Valid" to the server
        client.SayHello({name: "Valid"}, (error, response) => {
            if (error) {
                // Log any error that occurs during the RPC call
                console.error('Error calling SayHello:', error);
                return;
            }
            // Log the greeting message received from the server
            console.log('Greeting:', response.message);
        });
    */
   client.GetNumbers({count: 5});
   call.on('data', (numberResponse) => {
       console.log(`Order: ${numberResponse.order}, Number: ${numberResponse.number}`);
   });
   call.on('end', () => {
       console.log('Stream ended');
   });
   call.on('error', (error) => {
       console.error('Error in stream:', error);
   });
}

main();