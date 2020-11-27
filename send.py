import pika
import time
import random

credentials = pika.PlainCredentials('testing', 'password')
connection = pika.BlockingConnection(pika.ConnectionParameters('trekdev.thewcl.com', 5672, '/', credentials))
channel = connection.channel()
message = 'testmessage'

channel.exchange_declare(exchange='logs', exchange_type='fanout')

channel.basic_publish(exchange='logs', routing_key='', body=message)