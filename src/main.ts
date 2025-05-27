import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { NestExpressApplication } from '@nestjs/platform-express';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('/api');
  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });
  await app.listen(PORT);
}
bootstrap().then(() => {
  console.log(`app started at port: ${PORT}`);
});
