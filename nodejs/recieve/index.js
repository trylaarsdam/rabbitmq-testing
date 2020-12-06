const amqp = require('amqplib');

amqp.connect("amqp://testing:password@trek.thewcl.com:5672").then(function(connection){
    return connection.createChannel().then(function(channel){
        var exchangeName = 'logs';
        var exchange = channel.assertExchange(exchangeName, 'fanout', {durable: false});

        return exchange.then(function() {
            channel.publish(exchangeName, '', Buffer.from("Test message from nodejs"));
            return channel.close();
        });
    }).finally(function(){
        connection.close();
    });
}).catch(console.warn);


//testing = username, password=password. percent encoded. amqp:// protocol specification required