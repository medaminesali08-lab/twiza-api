import { Module } from '@nestjs/common';
import { ListingsController } from './routes/listings.controller';
import { ListingsService } from './services/listings.service';
import { AuthController } from './routes/auth.controller';
import { AuthService } from './services/auth.service';
import { UploadsController } from './routes/uploads.controller';
import { HealthController } from './routes/health.controller';

@Module({
  controllers: [ListingsController, AuthController, UploadsController, HealthController],
  providers: [ListingsService, AuthService]
})
export class AppModule {}
