import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Trip } from "./schemas/trip.schema";
import { Model } from "mongoose";
import { CreateTripDto } from "./dto/create-trip.dto";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class TripRepository {
    constructor(
        @InjectModel(Trip.name) private readonly tripModel: Model<Trip>,
        private notificationService: NotificationsService,
    ) {

    }

    async createTrip(dto: CreateTripDto) {
        const trip = new this.tripModel({
            user_id: dto.user_id,
            trip_name: dto.name,
            trip_start_date: dto.start_date,
            trip_end_date: dto.end_date,
        });

        if (trip) {
            const scheduledAt = new Date(dto.start_date);
            scheduledAt.setDate(scheduledAt.getDate() - 1); // Lùi lại 1 ngày

            await this.notificationService.scheduleNotification({
                userId: dto.user_id,
                message: `Your trip "${dto.name}" starts soon! Get ready!`,
                options: {
                    tripId: trip._id,
                },
                scheduledAt, // Thời gian gửi thông báo
            });
        }

        return trip.save();
    }


}