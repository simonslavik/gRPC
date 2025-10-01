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
/*
    // Initiates a server streaming RPC call to GetNumbers with a count of 5
    const call = client.GetNumbers({count: 5});

    // Handles each data event received from the stream
    call.on('data', (numberResponse) => {
         // Logs the order and number received from the server
         console.log(`Order: ${numberResponse.order}, Number: ${numberResponse.number}`);
    });

    // Handles the end event when the server has finished sending data
    call.on('end', () => {
         console.log('Stream ended');
    });

    // Handles any errors that occur during the streaming RPC
    call.on('error', (error) => {
         console.error('Error in stream:', error);
    });
*/
    client.SumNumbers((err, response) => {
        if(err) return console.error(err);
        console.log("Sum: ", response.sum);
    });
    call.write({number: 10});
    call.write({number: 20});
    call.write({number: 30});
    call.end();
}

main();