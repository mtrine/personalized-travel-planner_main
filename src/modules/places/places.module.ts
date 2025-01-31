import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceSchema } from './schemas/place.schema';
import { PlacesRepository } from './places.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:Place.name,
        schema: PlaceSchema,
      }
    ])
  ],
  controllers: [PlacesController],
  providers: [PlacesService,PlacesRepository],
})
export class PlacesModule {}
