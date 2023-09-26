import { Model } from 'mongoose';
import { UsersModel } from './users.model';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UsersModel>);
    create(user: UsersModel): Promise<UsersModel>;
    findOne(username: string): Promise<UsersModel | null>;
}
