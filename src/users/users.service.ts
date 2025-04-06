import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>) { }

    create(
        role: string,
        name: string,
        email: string,
        password: string
    ) {
        const user = this.userRepo.create({ role, name, email, password });

        return this.userRepo.save(user);
    }

    findOneById(id: number) {
        if (!id) {
            return null;
        }
        return this.userRepo.findOneBy({ id });
    }

    findByEmail(email: string) {
        return this.userRepo.find({ where: { email } });
    }

    async updateById(id: number, attributes: Partial<UserEntity>) {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('User Not Found');
        }
        Object.assign(user, attributes);
        return this.userRepo.save(user);
    }

    async removeById(id: number) {
        const user = await this.userRepo.findOneBy({ id })
        if (!user) {
            throw new NotFoundException("User Does Not Exist")
        }
        return this.userRepo.remove(user);
    }
}