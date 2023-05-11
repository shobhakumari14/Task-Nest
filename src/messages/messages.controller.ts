import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { ApiTags, ApiCreatedResponse, ApiOperation, ApiParam, ApiParamOptions } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('messages')
// Controller is a class-decorator & Get, Post are Method-decorators and Body And Param reffered as a argument-decorators.
export class MessagesController {
  messagesService: MessagesService;

  constructor() {
    //DONT DO THIS ON REAL APP RATHER USE DEPENDENCY INJECTION
    this.messagesService = new MessagesService();
  }

  //Adding three different request handlers
  //To create new message
  @Post()
  @ApiOperation({description:'create new message'})
  @ApiCreatedResponse({
    description: 'Add New Messages',
    type: CreateMessageDto,
  })
  createMessage(@Body() body: CreateMessageDto) {
    console.log('inside controller');
    return this.messagesService.create(body.content);
  }

  //To List the all stored message
  @Get()
  listAllMessage() {
    return this.messagesService.findAll();
  }

  //To list a message of perticular id
  @Get(':id')
//   @ApiParamOptions({id: number})
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found');
    }

    return message;
  }
}
