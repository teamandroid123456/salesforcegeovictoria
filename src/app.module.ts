import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarritoabandonadoModule } from './carritoabandonado/carritoabandonado.module';
import { GeovictoriaModule } from './geovictoria/geovictoria.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CarritoabandonadoModule,
    GeovictoriaModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '172.16.1.20',
      username: 'development',
      password: '1q2w3e4r.*',
      database: 'bd_passarela',
      logging: true,
      extra: {
        trustServerCertificate: true,
      },
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}