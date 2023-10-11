import { Schema, model } from 'mongoose';

export interface IAction {
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

export const ActionSchema = new Schema<IAction>({
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

export const ActionModel = model<IAction>('Action', ActionSchema);