import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }

    async signup(role: string, name: string, email: string, password: string) {

        //1.To See That email is in use or not?
        const users = await this.userService.findByEmail(email);
        if (users.length) {
            throw new BadRequestException('email already in use');
        }

        //2.hash the Users password
        //2.1 Generate a Salt
        const salt = randomBytes(8).toString('hex');

        //2.2 Hash the salt and password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        //2.3 Join Hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');

        //3.Create a new User and save it
        const user = await this.userService.create(role, name, email, result);

        //4.Return the user
        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.userService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User Not Found');
        }
        const [salt, storedhash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32) ) as Buffer;

        if(storedhash!==hash.toString('hex')){
            throw  new BadRequestException('Bad Password');;
        }
        return user;

    }
}
