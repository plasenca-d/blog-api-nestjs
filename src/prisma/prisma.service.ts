import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

class CustomPrismaClient extends PrismaClient {
  static instance: CustomPrismaClient;

  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });

    if (!CustomPrismaClient.instance) {
      CustomPrismaClient.instance = this;
    }

    return CustomPrismaClient.instance;
  }
}

@Injectable()
export class PrismaService extends CustomPrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
