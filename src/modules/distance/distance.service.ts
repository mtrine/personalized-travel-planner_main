import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class DistanceService {
    constructor(
        private configService: ConfigService,
    ) {}

    async getDistances(locations: string[]) {
        if (locations.length < 2) {
          return [];
        }
    
        const origins = locations.slice(0, -1).join('|');
        const destinations = locations.slice(1).join('|');
    
        console.log('origins:', origins);
        console.log('destinations:', destinations);

        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origins)}
        &destinations=${encodeURIComponent(destinations)}
        &mode=driving
        &language=vi
        &key=${this.configService.get<string>('GG_API_KEY')}`;
    
        const response = await axios.get(url);
        const data = response.data;
        console.log('data:', data);
    
        if (data.status !== 'OK') {
          throw new Error('Error fetching distance data');
        }
    
        return data.rows.map((row) => row.elements.map((element) => ({
          distance: element.distance.text,
          duration: element.duration.text,
        }))).flat();
      }
}
