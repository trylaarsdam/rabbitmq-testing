import pika
import time

credentials = pika.PlainCredentials('testing', 'password')
connection = pika.BlockingConnection(pika.ConnectionParameters('trekdev.thewcl.com', 5672, '/', credentials))
channel = connection.channel()

channel.queue_declare(queue='testQueue')

channel.basic_publish(exchange='',routing_key='testQueue',body='Test Message from Python')
print("Sent message to queue testQueue")

while(1):
    time.sleep(1)