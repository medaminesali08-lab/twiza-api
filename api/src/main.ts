import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import * as cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { mountStatic } from './static';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error','warn','log'] });
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(cors());
  app.use(rateLimit({ windowMs: 60_000, max: 120 })); // 120 req/min
  await app.listen(3001);
  mountStatic(app);
  console.log('API running on http://localhost:3001');
}
bootstrap();
