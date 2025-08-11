import { Controller, Get } from '@nestjs/common';
import { prisma } from '../services/db';

@Controller()
export class HealthController {
  @Get('/health')
  async health() {
    const now = await prisma.$queryRaw`SELECT NOW()`;
    return { ok: true, now };
  }
}
