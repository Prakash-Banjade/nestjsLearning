import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import envConfig from './env.config';

const configService: TypeOrmModuleOptions = {
    type: 'postgres',
    url: envConfig.DATABASE_URL,

    entities: [join(__dirname, '**', '*.entity.{ts,js}')],

    migrationsTableName: 'migration',

    migrations: ['src/migration/*.ts'],

    autoLoadEntities: true,
    synchronize: true,
};

export { configService };