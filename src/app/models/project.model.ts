import {Category} from "./category.model";
import {User} from "./user.model";
import * as _ from 'lodash';

export class Project {
    public id: number;
    public title: string;
    public content: string;
    public votes: number;
    public activeInvolvment: boolean;
    public shortDescription: string;
    public createdAt: Date;
    public updatedAt: Date;
    public userId: number;
    public categoryId: number;
    public statusId: number;
    public category?: Category;
    public comments?: Comment[];
    public users?: User[];

    constructor(project: any) {
        this.id = project.id || 0;
        this.title = project.title || '';
        this.activeInvolvment = project.activeInvolvment || '' ;
        this.categoryId = project.categoryId || 1;
        this.content =  project.content || '';
        this.createdAt = project.createdAt || new Date();
        this.updatedAt = project.updatedAt || new Date();
        this.shortDescription = project.shortDescription || '';
        this.statusId = project.statusId || 1;
        this.votes = project.votes || 0;
        this.userId = this.userId || 1;
        this.comments = project.comments || null;
        this.users = project.users || null;
        this.category = project.category || null;
        return this;
    }


}
