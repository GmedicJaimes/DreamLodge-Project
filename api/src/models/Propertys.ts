import { Schema, model, Document } from "mongoose";

interface Property extends Document {
    name: string;
    location: string;
    description: string;
    rooms: number;
    technologies: string;
    extraAmenities: string;
    specialServices: boolean;
    views: number;
    price: number;
    comment: string;
 
}

const propertySchema = new Schema <Property> ({
    name: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    rooms: {type: Number, required: true},
    technologies: {type: String, required: true},
    extraAmenities: {type: String, required: false},
    specialServices: {type: Boolean, required: false},
    views: {type: Number, required: true},
    price: {type: Number, required: true},
    comment: {type: String, required: false}
})

export default model<Property>('Property', propertySchema)