import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Place {

    @Prop({
        required: true,
        ref:"Trip"
    })
    trip_id: string;

    @Prop({
        required: true,
    })
    day: number;

    @Prop({
        required: true,
    })
    date: Date;

    @Prop({
        required: true
    })
    place_name: string;

    @Prop({
        required: true
    })
    place_address: string;

}

export const PlaceSchema = SchemaFactory.createForClass(Place);
