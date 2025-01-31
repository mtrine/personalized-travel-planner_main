import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { User } from 'src/decorators/user-infor.decorator';
import { IUser } from '../user/user.interface';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@User() user:IUser, @Body() createTripDto: CreateTripDto) {
    createTripDto.user_id = user._id;
    return this.tripsService.createTrip(createTripDto);
  }

  // @Get()
  // findAll() {
  //   return this.tripsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tripsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
  //   return this.tripsService.update(+id, updateTripDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tripsService.remove(+id);
  // }
}
