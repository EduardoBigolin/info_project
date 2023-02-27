import { Channel, connect, Connection, Message } from "amqplib";
import { sendEmail } from "./queues/send-email.queue";
export class RebbitmqServer {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.connection = await connect(this.uri);

    this.channel = await this.connection.createChannel();
  }
  async consumer(queue: string, callback: (message: Message) => void) {
    return this.channel?.consume(queue, (message) => {
      callback(message as Message);
      this.channel?.ack(message as Message);
    });
  }
  async publishInQueue(queue: string, message: string) {
    this.channel?.sendToQueue(queue, Buffer.from(message));
    await this.consumer(queue, (message) => {
      sendEmail(JSON.parse(message.content.toString()));
      console.log("send");
    });
  }
}
