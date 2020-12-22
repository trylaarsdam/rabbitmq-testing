import pika
import time
import random

credentials = pika.PlainCredentials('testing2', 'password')
connection = pika.BlockingConnection(pika.ConnectionParameters('trekdev.thewcl.com', 5672, '/', credentials))
channel = connection.channel()
message = 'testmessage'

channel.exchange_declare(exchange='logs', exchange_type='fanout')

result = channel.queue_declare(queue='', exclusive=True)

channel.queue_bind(exchange='logs', queue=result.method.queue)
queue_name = result.method.queue

print('Starting log service')

def callback(channel, method, properties, body):
    print("%r" % body)

channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

channel.start_consuming()

