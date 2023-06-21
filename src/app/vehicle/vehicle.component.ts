import { Component, OnInit } from '@angular/core';
import { VehicleService } from '.././vehicle.service';
import { MqttClient } from 'mqtt';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  private client: MqttClient | null = null;
  
  constructor(private vehicleService: VehicleService) {}

  //Get MqttClient
  ngOnInit() : void {
    this.client = this.vehicleService.connect();
  }

}
