import { IsDate, IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreatePlaceDto {
    @IsString()
    @IsNotEmpty()
    trip_id: string;

    @IsNotEmpty()
    @IsNumber()
    day: number;

    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    place_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    place_address: string;
}
