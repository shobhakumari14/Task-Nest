import { Injectable, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';
import * as bcrypt from 'bcrypt';
import { Logger } from 'bs-logger';
// import { PriviledgeLevel, PriviledgeObjectOwner, PriviledgeActionType } from '../../interface/permissions-types.enum';
// import { LinkGenEntities } from '../../../iam/enums/link-generate-entities.enum';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';
// import { IdTokenSignupUser } from '../../../iam/interfaces/id-token-signup-user.interface';
import { LoggerService } from '../services/logger';
@Injectable()
export class UtilService 
{
    static emailRegex = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])');
    static nameRegex = new RegExp('[a-zA-Z0-9\\s_]');
    static sanitizeStringRegex = new RegExp(/[^a-zA-z0-9]\\s_/g);
    static linkRegex = new RegExp('[a-zA-Z0-9_\-]');
    static urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    static validUrlRegex = new RegExp(/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
    static fullDayMilliseconds = 86400000;
    private logger: Logger;
    constructor(logger: LoggerService, private config: ConfigService) 
    {
        this.logger = logger.getLogger('UtilService');
    }


    public getUserDataFromToken(token: string)
    {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const buff = Buffer.from(base64, 'base64');
        const payloadinit = buff.toString('ascii');
        const payload = JSON.parse(payloadinit);
        return payload;
    }

    public async validateEmail(email: string): Promise<boolean> 
    {
        const schema = {
            email: Joi.string().regex(UtilService.emailRegex)
        };
        try
        {
            const validationResult = <Joi.ValidationResult>await Joi.object(schema).validateAsync({ email });
            return !validationResult.error;
        }
        catch (e)
        {
            return false;
        }
    }
    public async validateName(name: string): Promise<boolean> 
    {
        const schema = {
            name: Joi.string().regex(UtilService.nameRegex)
        };
        try
        {
            const validationResult = <Joi.ValidationResult>await Joi.object(schema).validateAsync({ name });
            return !validationResult.error;
        }
        catch (e)
        {
            return false;
        }
    }

    public async isUrlValid(url:string):Promise<boolean>
    {
        const schema = {
            url: Joi.string().regex(UtilService.validUrlRegex)
        };
        try
        {
            const validationResult = <Joi.ValidationResult>await Joi.object(schema).validateAsync({ url });
            return !validationResult.error;
        }
        catch (e)
        {
            return false;
        }     
    }

    public validateUrl(url:string): boolean
    {
        return UtilService.urlRegex.test(url);
    }

    public combineName(firstName?: string, lastName?: string): string
    {
        return firstName && lastName ? firstName + ' ' + lastName : firstName ? firstName : lastName;
    }
    public async validateLink(link: string): Promise<boolean> 
    {
        const schema = {
            link: Joi.string().regex(UtilService.linkRegex).max(255)
        };
        try
        {
            const validationResult = <Joi.ValidationResult>await Joi.object(schema).validateAsync({ link });
            return !validationResult.error;
        }
        catch (e)
        {
            return false;
        }
    }
    public generateLink(orgName: string): string 
    {
        return orgName.toLowerCase();
    }
    public sanitizeString(str: string): string 
    {
        return str.replace(UtilService.sanitizeStringRegex, '');
    }
    public async hashString(str: string): Promise<string> 
    {
        const salt = await bcrypt.genSalt(10);
        str = await bcrypt.hash(str, salt);
        return str;
    }
    public async validateHash(str: string, hash: string): Promise<boolean> 
    {
        return await bcrypt.compare(str, hash);
    }
    // public hasPermission(level: PriviledgeLevel, actionOn: PriviledgeObjectOwner, actionType: PriviledgeActionType): boolean 
    // {
    //     if (level === PriviledgeLevel.ADMIN || level === PriviledgeLevel.OWNER || actionOn === PriviledgeObjectOwner.SELF) 
    //     {
    //         return true;
    //     }
    //     if (actionOn === PriviledgeObjectOwner.TEAM && (actionType === PriviledgeActionType.VIEW || actionType === PriviledgeActionType.CREATE)) 
    //     {
    //         return true;
    //     }

    //     return false;
    // }
    public generateMailConfig(options: ISendMailOptions): ISendMailOptions 
    {
        // if(this.config.get<string>('NODE_ENV')==='development')
        // {
        //     const from  = options.from;
        //     const to = options.to.toString();
        //     options.to = from;
        //     options.from = to;
        // }
        return options;
    }

    public changeBigIntToString<T>(obj: T): T 
    {
        const keys = Object.keys(obj);
        for (const k of keys)
        {
            if (typeof obj[k] === 'bigint')
            {
                obj[k] = obj[k].toString();
            }
        }
        return obj;
    }
    public changeBigIntArrayToString(obj: bigint[]): string[] 
    {
        const keys = Object.keys(obj);
        const arr: string[] = [];
        for (const k of keys)
        {
            if (typeof obj[k] === 'bigint')
            {
                arr.push(obj[k].toString());
            }
        }
        return arr;
    }
    public parseBigIntForRequest(x: any, paramName: string): bigint 
    {
        try
        {
            return BigInt(x);
        }
        catch (e)
        {
            throw new BadRequestException(`Malformed ${paramName}`);
        }
    }
    public parseIntForRequest(x: any, paramName: string): number 
    {
        try
        {
            return parseInt(x);
        }
        catch (e)
        {
            throw new BadRequestException(`Malformed ${paramName}`);
        }
    }
    public matchValueWithEnumForRequest<T, U>(key: U, obj: T, type: string, paramName: string): U 
    {
        if (type === 'number')
        {
            try
            {
                key = (parseInt(key.toString()) as unknown as U);
            }
            catch (e)
            {
                throw new BadRequestException(`Malformed ${paramName}`);
            }
        }
        if (!Object.values(obj).includes(key))
        {
            throw new BadRequestException(`Wrong ${paramName}`);
        }
        return key;
    }

    public parseDateForRequest(x: any, paramName: string): Date 
    {
        let date = new Date(x);
        const numDate = parseInt(x);
        if(!isNaN(numDate))
        {
            date = new Date(numDate);
        }
        if (date.toString() === 'Invalid Date')
        {
            throw new BadRequestException(`Malformed ${paramName}`);
        }
        return date;
    }

    public isNonEmptyArray(x: any): boolean 
    {
        return x instanceof Array && x.length !== 0;
    }

    public parseBigIntArrayForRequest<T>(arr: Array<T>, paramName: string, throwErr = true): bigint[] 
    {
        if(!arr && !throwErr)
        {
            return null;
        }

        try
        {
            return arr.map(e => { return BigInt(e.toString()); });
        }
        catch (e)
        {
            if(throwErr)
            {
                throw new BadRequestException(`MALFORMED ${paramName}`);
            }
        }
    }

    public removeUndefinedKeys(obj: any): any 
    {
        const keys = Object.keys(obj);
        for(const k of keys)
        {
            if(typeof obj[k] === 'undefined')
            {
                delete obj[k];
            }
        }
        return obj;
    }

    public parseBooleanForRequest(x: any): boolean 
    {
        if(x === 'true' || x === true)
        {
            return true;
        }
        else if(x === 'false' || x === false)
        {
            return false;
        }
        else
        {
            throw new BadRequestException('INVALID VALUE FOR BOOLEAN');
        }
    }

    public manyToManyMapping(arrayX: Array<any>, arrayY: Array<any>, mapping: Function): Array<any>
    {
        let data = [];
        arrayX.forEach((x) => 
        {
            const newData =  arrayY.map((y) =>
            {
                return mapping(x,y);
            });
            data = [...data, ...newData];
        }); 
        return data; 
    }

    public ifNotReturnNull<T>(x: T): T | null
    {
        return x? x: null;
    }

    public buildResponseCookie(): CookieOptions
    {
        const cookieOptions: CookieOptions = {
            httpOnly: true,
            maxAge: this.config.get<number>('IAM_JWT_EXPIRY'),
            signed: true
        };
        if(this.config.get<string>('COOKIE_SECURE') === 'true')
        {
            cookieOptions.secure = true;
            cookieOptions.sameSite = 'none';
        }
        if(this.config.get<string>('COOKIE_DOMAIN') !== '127.0.0.1' || process.env.NODE_ENV === 'test')
        {
            cookieOptions.domain = this.config.get<string>('COOKIE_DOMAIN');
        }
        else
        {
            cookieOptions.sameSite = 'none';
            cookieOptions.secure = true;
        }
        return cookieOptions;
    }
}
