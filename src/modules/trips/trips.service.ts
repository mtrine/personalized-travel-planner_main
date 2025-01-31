import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripRepository } from './trip.repo';

@Injectable()
export class TripsService {
    constructor(
      private readonly tripRepository: TripRepository,
    ){}

    async createTrip(createTripDto: CreateTripDto) {
      return this.tripRepository.createTrip(createTripDto);
    }

    
}
