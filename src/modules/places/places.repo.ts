import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Place } from "./schemas/place.schema";
import { Model } from "mongoose";
import { CreatePlaceDto } from "./dto/create-place.dto";
import { UtilsService } from "src/utils/utils.service";

@Injectable()
export class PlacesRepository {
    constructor(
        @InjectModel(Place.name) private placeModel: Model<Place>
    ) {
    }

    async createPlace(dto: CreatePlaceDto) {
        const place = new this.placeModel({
            trip_id: dto.trip_id,
            place_name: dto.place_name,
            day: dto.day,
            date: dto.date,
            place_address: dto.place_address,
        });
        return place.save();
    }

    async queryPlacesByQuery(query: object, limit: number, page: number, unselect: Array<string>) {
        const skip = limit * (page - 1);
        return this.placeModel.find(query).
            select(UtilsService.unGetSelectData(unselect)).
            limit(limit).
            skip(skip).
            lean();
    }

    async getPlaceByTripId(trip_id: string) {
        return this.placeModel.aggregate([
            { $match: { trip_id } }, // Lọc theo trip_id
            { $sort: { day: 1 } }, // Sắp xếp theo day
            {
                $group: {
                    _id: "$day", // Nhóm theo field "day"
                    places: { $push: "$$ROOT" }, // Đưa toàn bộ document vào mảng "places"
                },
            },
            { $sort: { _id: 1 } }, // Sắp xếp các nhóm theo thứ tự day
            {
                $project: {
                    day: "$_id", // Đổi tên _id thành day
                    places: 1,   // Giữ lại mảng places
                    _id: 0,      // Loại bỏ _id
                },
            },
        ]);
    }

}