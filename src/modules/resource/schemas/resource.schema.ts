import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})
export class Resource {
    @Prop({
        required: true
    })
    resource_name: string;

    @Prop({
        required: true,
    })
    resource_slug: string;

    @Prop({
        required: true,
        default: '',
    })
    resource_description: string;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);