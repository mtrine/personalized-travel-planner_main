import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlacesRepository } from './places.repo';

@Injectable()
export class PlacesService {
  constructor(
    private placesRepository: PlacesRepository
  ) {}
  async createPlace(dto: CreatePlaceDto) {
    return await this.placesRepository.createPlace(dto);
  }

  async getPlaceByTripId(trip_id: string) {
    return await this.placesRepository.getPlaceByTripId(trip_id);
  }

  
}
