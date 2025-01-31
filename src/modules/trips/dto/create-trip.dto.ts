import { IsString, IsArray, IsDateString, IsNotEmpty, ValidateNested, IsUUID, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTripDto {
    @IsOptional()
    user_id: string;

    @IsString() 
    @IsNotEmpty()
    name: string;

    @IsDateString() 
    start_date: string;

    @IsDateString() 
    end_date: string;

    // @IsArray()
    // @ValidateNested({ each: true }) 
    // @Type(() => Object) 
    // days: Array<{
    //     day: number;
    //     date: string;
    // }>;
}
