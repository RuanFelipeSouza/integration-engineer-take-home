import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('(e2e) TasksController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (POST)', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Test Task', description: 'Description of the test task' })
      .expect(201)
      .expect((res) => {
        expect(res.body.title).toBe('Test Task');
        expect(res.body.description).toBe('Description of the test task');
      });
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/tasks/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/tasks/1')
      .send({ title: 'Updated Task', description: 'Updated description' })
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe('Updated Task');
        expect(res.body.description).toBe('Updated description');
      });
  });

  it('/tasks/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/tasks/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
