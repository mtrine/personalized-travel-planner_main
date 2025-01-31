import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './schemas/trip.schema';
import { TripRepository } from './trip.repo';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    NotificationsModule,
    MongooseModule.forFeature([
      {
        name:Trip.name,
        schema: TripSchema,
      }
    ])
  ],
  controllers: [TripsController],
  providers: [TripsService,TripRepository],
})
export class TripsModule {}
