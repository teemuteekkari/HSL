import { Injectable } from '@angular/core';
import { connect, MqttClient } from 'mqtt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private client: MqttClient | null = null;

  constructor() {}

  connect() :  MqttClient {
    const options = {
      clientId: environment.mqtt.clientId,
      hostname: environment.mqtt.server,
      port: environment.mqtt.port,
      protocolId: 'mqtts',
      protocol: 'mqtts' as 'mqtts',
    };

    this.client = connect(options);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.subscribeToVehicleMovements();
    });
    this.client.on('error', (error) => {
      console.error('MQTT error:', error);
    });
    return this.client;
  }

  private subscribeToVehicleMovements() {
    // A situational overview
    const topic = '/hfp/v2/journey/ongoing/vp/+/+/+/+/+/+/+/+/0/#';

    if (this.client) {
      this.client.subscribe(topic, (err) => {
        if (err) {
          console.error('Error subscribing to MQTT topic:', err);
        }
      });

      this.client.on('message', (topic, message) => {
        const payload = message.toString();
        //TODO: Process the received payload data here
        console.log(payload);
      });
    }
  }
}