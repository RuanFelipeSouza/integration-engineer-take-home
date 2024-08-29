import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  constructor(private readonly configService: ConfigService) {}
  async callLambda() {
    AWS.config.update({
      region: this.configService.get<string>('AWS_REGION'),
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    });
    const lambda = new AWS.Lambda();
    const params = {
      FunctionName: 'helloWorld',
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({}),
    };

    try {
      const result = await lambda.invoke(params).promise();
      return result;
    } catch (err) {
      throw err;
    }
  }
}
