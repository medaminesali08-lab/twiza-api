import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { ListingsService } from '../services/listings.service';
import jwt from 'jsonwebtoken';

function authUser(authorization?: string): string | null {
  try {
    if (!authorization) return null;
    const token = authorization.replace('Bearer ', '');
    const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    return payload.sub as string;
  } catch { return null; }
}

@Controller('listings')
export class ListingsController {
  constructor(private svc: ListingsService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.svc.findOne(id); }

  @Post()
  create(@Body() dto: any, @Headers('authorization') auth?: string) {
    const userId = authUser(auth);
    if (!userId) return { ok:false, error:'Unauthorized' };
    return this.svc.create({ ...dto, sellerId: userId });
  }
}
