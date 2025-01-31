import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNotificationDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    message:string  
   
    @IsString()
    @IsNotEmpty()
    scheduledAt: Date;

    @IsOptional()
    options: Object
}


