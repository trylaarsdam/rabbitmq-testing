import "dart:io";
import 'package:dart_amqp/dart_amqp.dart';

void main(List<String> arguments) async {
  //print('Hello world: ${cli.calculate()}!');
  var connectionSettings = ConnectionSettings(
      host: "trek.thewcl.com",
      port: 5672,
      virtualHost: "/",
      authProvider: const PlainAuthenticator('testing', 'password'));
  // ignore: omit_local_variable_types
  Client client = Client(settings: connectionSettings);

  ProcessSignal.sigint.watch().listen((_) async {
    await client.close();
    exit(0);
  });

  var channel = await client.channel();
  var exchange = await channel.exchange("logs", ExchangeType.FANOUT);
  exchange.publish("Test message from dart", null);
  await channel.close();
  await client.close();
  exit(1);
}
