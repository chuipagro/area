import { Body, Get, Injectable } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ServicesModel } from '../models/servicesModel';

@Injectable()
export class AboutService
{
    getCurrentTime(): number {
        return Math.round((Date.now() / 1000))
    }

    async getAllServices(): Promise<any> {
        const servicesDoc = await ServicesModel.findOne();

        if (!servicesDoc) {
            return [];
        }

        const servicesList = [];
        const servicesObj = servicesDoc.toObject();

        for (const serviceName in servicesObj) {
            // @ts-ignore
            const service = servicesObj[serviceName];
            const actions = [];
            const reactions = [];

            for (const actionName in service.actions) {
                const action = service.actions[actionName];
                actions.push({
                    name: actionName,
                    description: action.description,
                });
            }

            for (const reactionName in service.reactions) {
                const reaction = service.reactions[reactionName];
                reactions.push({
                    name: reactionName,
                    description: reaction.description,
                });
            }

            servicesList.push({
                name: serviceName,
                actions: actions,
                reactions: reactions,
            });
        }
        return servicesList;
    }
}
