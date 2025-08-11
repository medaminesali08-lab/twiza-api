import * as express from 'express';

export function mountStatic(app: any){
  const server = app.getHttpAdapter().getInstance() as express.Express;
  server.use('/static', express.static(process.env.UPLOAD_DIR || './uploads'));
}
