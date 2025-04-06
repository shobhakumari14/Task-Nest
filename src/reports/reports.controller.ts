import {
    Controller,
    Post,
    Get,
    Body,
    UseGuards,
    Patch,
    Param,
    Query,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator'
import { UserEntity } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveReportDto} from '../reports/dtos/approve-report.dto'
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@ApiTags('Reports')
@Controller('reports')

export class ReportsController {
    constructor(private reportService: ReportsService) { }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
        return this.reportService.create(body, user);
    }

    @Patch(':id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto){
     return this.reportService.changeApproval(id, body.approved);
    }

    @Get('estimatedprice')
    getEstimatedPrice(@Query() query: GetEstimateDto){
        return this.reportService.createEstimatedPrice(query);
    }
}



