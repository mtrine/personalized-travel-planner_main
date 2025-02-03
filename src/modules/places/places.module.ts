import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceSchema } from './schemas/place.schema';
import { PlacesRepository } from './places.repo';
import { DistanceModule } from '../distance/distance.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:Place.name,
        schema: PlaceSchema,
      }
    ]),
    DistanceModule
  ],
  controllers: [PlacesController],
  providers: [PlacesService,PlacesRepository],
})
export class PlacesModule {}
