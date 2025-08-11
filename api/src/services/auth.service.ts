import { Injectable } from '@nestjs/common';
import { prisma } from './db';
import jwt from 'jsonwebtoken';

function randomCode(len = 6){
  const digits = '0123456789';
  return Array.from({length:len}, ()=> digits[Math.floor(Math.random()*10)]).join('');
}

@Injectable()
export class AuthService {
  async requestOtp(email: string){
    const code = randomCode(6);
    const expiresAt = new Date(Date.now() + 10*60*1000);
    await prisma.otpCode.create({ data: { email, code, expiresAt } });
    console.log(`[DEV] OTP for ${email}: ${code}`);
    return { ok: true };
  }

  async verifyOtp(email: string, code: string){
    const rec = await prisma.otpCode.findFirst({ where: { email, code, used:false }, orderBy:{ createdAt: 'desc' } });
    if (!rec) return { ok:false, error:'Invalid code' };
    if (rec.expiresAt < new Date()) return { ok:false, error:'Code expired' };
    await prisma.otpCode.update({ where: { id: rec.id }, data: { used:true } });
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) user = await prisma.user.create({ data: { email } });
    const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '30d' });
    return { ok:true, token, user };
  }
}
