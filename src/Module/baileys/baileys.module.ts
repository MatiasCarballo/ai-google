import { Module } from '@nestjs/common';
import { BaileysService } from './baileys.service';
import { BaileysGateway } from './baileys.gateway';

@Module({
  providers: [BaileysService, BaileysGateway],
  exports: [BaileysService], // Exportar el servicio si otros módulos lo necesitan
})
export class BaileysModule {}
