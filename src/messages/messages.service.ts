// import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';


export class MessagesService {
    messagesRepo: MessagesRepository;

    constructor() {
        //service is creating its own dependencies inside the constructor
        // dont do this in real apps because it is voilating IOC Principle
        this.messagesRepo = new MessagesRepository();
    }


    findOne(id: string) {
        return this.messagesRepo.findOne(id);
    }


    findAll(): any {
        return this.messagesRepo.findAll();
    }


    create(content: string) {
        console.log(content)
        return this.messagesRepo.create(content);
    }
}
