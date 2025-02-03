import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlacesRepository } from './places.repo';
import { DistanceService } from '../distance/distance.service';

@Injectable()
export class PlacesService {
  constructor(
    private placesRepository: PlacesRepository,
    private distanceService: DistanceService,
  ) {}
  async createPlace(dto: CreatePlaceDto) {
    return await this.placesRepository.createPlace(dto);
  }

  async getPlacesWithDistanceByTripId(trip_id: string) {
    const placesByDay = await this.placesRepository.getPlaceByTripId(trip_id);
    console.log("places:", JSON.stringify(placesByDay));

    if (!placesByDay.length) return [];

    // Duyệt qua từng ngày và tạo danh sách địa chỉ
    let locations: string[] = [];
    placesByDay.forEach((dayGroup) => {
        dayGroup.places.forEach((place) => {
            locations.push(place.place_address);
        });
    });

    console.log("locations:", locations);

    // Nếu chỉ có 1 điểm thì không cần tính khoảng cách
    if (locations.length < 2) {
        return placesByDay;
    }

    // Gọi Distance Matrix API để lấy khoảng cách giữa các điểm
    const distances = await this.distanceService.getDistances(locations);
    console.log("distances:", distances);

    // Gắn khoảng cách vào dữ liệu theo từng ngày
    let distanceIndex = 0;
    placesByDay.forEach((dayGroup) => {
        dayGroup.places.forEach((place, i) => {
            if (i > 0) {
                place.distance_from_previous = distances[distanceIndex]?.distance || "N/A";
                place.duration_from_previous = distances[distanceIndex]?.duration || "N/A";
                distanceIndex++;
            } else {
                place.distance_from_previous = null;
                place.duration_from_previous = null;
            }
        });
    });

    return placesByDay;
}


  
}
