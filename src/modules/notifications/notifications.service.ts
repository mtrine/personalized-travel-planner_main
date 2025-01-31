import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {

    constructor(
        @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
    ) { }

    async scheduleNotification(data: CreateNotificationDto) {
        console.log('Sending schedule_notification event with data:', data);
        return this.client.emit('schedule_notification', data);
    }
}
