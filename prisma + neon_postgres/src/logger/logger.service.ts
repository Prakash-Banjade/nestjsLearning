import * as path from "path";
import { promises as fsPromises } from 'fs'
import * as fs from 'fs';
import { format } from "date-fns";
import { ConsoleLogger, Injectable } from "@nestjs/common";

@Injectable()
export class LoggerService extends ConsoleLogger {

    async logToFile(entry: string) {
        const logData = `${format(new Date(), 'yyMMdd\tHH:mm:ss')}\t${entry}`
        try {
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
            await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'reqLogs.txt'), logData);
        } catch (e) {
            if (e instanceof Error) console.log(e)
        }
    }

    log(message: any, context?: string) {
        const entry = `${context}\t${message}`
        this.logToFile(entry)
        super.log(message, context)
    }

    error(message: any, stackOrContext?: string) {
        const entry = `${message}\t$${stackOrContext}`
        this.logToFile(entry)
        super.error(message, stackOrContext)
    }
}