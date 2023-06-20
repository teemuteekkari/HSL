import { Injectable } from '@angular/core';
import { connect, MqttClient } from 'mqtt';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private client: MqttClient | null = null;

  constructor() {}

  connect() {
    const options = {
      hostname: 'mqtt.hsl.fi',
      port: 1883,
      username: 'your-username',
      password: 'your-password',
    };

    this.client = connect(options);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.subscribeToVehicleMovements();
    });
  }

  private subscribeToVehicleMovements() {
    const topic = 'vehicle/movements';

    if (this.client) {
      this.client.subscribe(topic, (err) => {
        if (err) {
          console.error('Error subscribing to MQTT topic:', err);
        }
      });

      this.client.on('message', (topic, message) => {
        const payload = message.toString();
        // Process the received payload data here
        console.log(payload);
      });
    }
  }
}