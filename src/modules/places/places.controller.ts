import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.createPlace(createPlaceDto);
  }

  @Get(':trip_id/distances')
  async getPlacesWithDistance(@Param('trip_id') trip_id: string) {
    return this.placesService.getPlacesWithDistanceByTripId(trip_id);
  }
}
