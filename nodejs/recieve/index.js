const amqp = require('amqplib');

amqp.connect("amqp://testing:password@trek.thewcl.com:5672").then(function(connection){
    process.once('SIGINT', function() {
        connection.close();
    });
    return connection.createChannel().then(function(channel){
        var exchangeName = 'logs';
        var exchange = channel.assertExchange(exchangeName, 'fanout', {durable: false});

        exchange = exchange.then(function() {
            return channel.assertQueue('', {exclusive: true, autoDelete: true});
        });
        exchange = exchange.then(function(queue) {
            return channel.bindQueue(queue.queue, 'logs', '').then(function() {
                return queue.queue;
            });
        });
        exchange = exchange.then(function(queue) {
            return channel.consume(queue, logMessage);
        });
        return exchange.then(function() {
            console.log("Waiting for messages from queue");
        });

        function logMessage (msg){
            console.log(msg.content.toString());
        }
    });
}).catch(console.warn);


//testing = username, password=password. percent encoded. amqp:// protocol specification required