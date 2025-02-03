import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {

    constructor(
        @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
    ) { }

    async scheduleNotification(data: CreateNotificationDto) {
        return this.client.emit('schedule_notification', data);
    }
}
