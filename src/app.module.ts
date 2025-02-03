import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TripsModule } from './modules/trips/trips.module';
import { KeyTokenModule } from './modules/key-token/key-token.module';
import { ResourceModule } from './modules/resource/resource.module';
import { RoleModule } from './modules/role/role.module';
import { PlacesModule } from './modules/places/places.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { OtpTokenModule } from './modules/otp-token/otp-token.module';
import { MailModule } from './modules/mail/mail.module';
import { DistanceService } from './modules/distance/distance.service';
import { DistanceModule } from './modules/distance/distance.module';




@Module({
  imports: [
    ConfigModule.forRoot(
      { isGlobal: true, }
    ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,
    //   host: process.env.REDIS_HOST,
    //   port: process.env.REDIS_PORT,
    //   ttl: 100,
    // }),
    UserModule,
    AuthModule,
    TripsModule,
    KeyTokenModule,
    ResourceModule,
    RoleModule,
    PlacesModule,
    NotificationsModule,
    OtpTokenModule,
    MailModule,
    DistanceModule,

  ],
  controllers: [AppController],
  providers: [AppService, DistanceService],
})
export class AppModule { }
