import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { UserEntity } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';


@Injectable()
export class ReportsService {

    constructor(
        @InjectRepository(ReportEntity)
        private reportRepo: Repository<ReportEntity>) { }

    create(reportDto: CreateReportDto, users: UserEntity) {
        const report = this.reportRepo.create(reportDto);
        report.user = users;
    
        return this.reportRepo.save(report);
    }


    async changeApproval(id: string, approved: boolean) {
        const report = await this.reportRepo.findOne({ where: { id: parseInt(id) } });
        if (!report) {
            throw new NotFoundException('Report Not Found');
        }
        report.approved = approved;
        return this.reportRepo.save(report);
    }

    createEstimatedPrice(getEstimateDto: GetEstimateDto){
        return this.reportRepo.createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('maker = :maker', {maker: getEstimateDto.maker})
        .andWhere('model = :model', {model:getEstimateDto.model})
        .andWhere('latitude - :latitude BETWEEN -5 AND 5' , {latitude:getEstimateDto.latitude})
        .andWhere('longitude - :longitude BETWEEN -5 AND 5', {longitude:getEstimateDto.longitude})
        .andWhere('mfgyear - :mfgyear BETWEEN -3 AND 3', {mfgyear:getEstimateDto.mfgyear})
        .andWhere('approved IS TRUE')
        .orderBy('mileage - :mileage', 'DESC')
        .setParameters({mileage: getEstimateDto.mileage})
        .limit(3)
        .getRawOne();  
    }
}
