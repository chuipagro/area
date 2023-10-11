import { Schema, model } from 'mongoose';

export interface IArea {
  title: string;
  active: boolean;
  createdBy: string;
  action: {
    type: number;
    service: number;
  }
  reaction: {
    type: number;
    service: number;
  }
}

export const AreaSchema = new Schema<IArea>({
  title: { type: String, required: true},
  active: { type: Boolean},
  createdBy: { type: String, required: true},
  action: {
    type: { type: Number, required: true},
    service: { type: Number, required: true},
  },
  reaction: {
    type: { type: Number, required: true},
    service: { type: Number, required: true},
  }
});

export const AreaModel = model<IArea>('Area', AreaSchema);