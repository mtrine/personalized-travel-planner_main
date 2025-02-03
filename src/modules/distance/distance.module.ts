import { Module } from '@nestjs/common';
import { DistanceService } from './distance.service';

@Module({

  controllers: [],
  providers: [DistanceService],
  exports: [DistanceService],
})
export class DistanceModule {}
