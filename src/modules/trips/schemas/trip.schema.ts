import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Trip extends Document {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  trip_name: string;

  @Prop({ required: true })
  trip_start_date: string;

  @Prop({ required: true })
  trip_end_date: string;

//   @Prop({
//     type: [
//       {
//         day: { type: Number, required: true },
//         date: { type: String, required: true },
//       },
//     ],
//     required: true,
//   })
//   trip_days: Array<{
//     day: number;
//     date: string;
//   }>;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
