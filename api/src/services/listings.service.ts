import { Injectable } from '@nestjs/common';
import { prisma } from './db';

@Injectable()
export class ListingsService {
  findAll() {
    return prisma.listing.findMany({ include: { photos: true }, orderBy: { createdAt: 'desc' } });
  }
  findOne(id: string) {
    return prisma.listing.findUnique({ where: { id }, include: { photos: true } });
  }
  create(dto: any) {
    return prisma.listing.create({
      data: {
        sellerId: dto.sellerId,
        title: dto.title,
        description: dto.description ?? '',
        priceCents: Number(dto.priceCents || 0),
        currency: 'MAD',
        condition: dto.condition || 'good',
        size: dto.size || null,
        category: dto.category || 'Divers',
        photos: { create: (dto.photos || []).map((url: string, i: number)=>({ url, order: i })) }
      }
    });
  }
}
