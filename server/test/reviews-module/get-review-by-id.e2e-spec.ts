import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('GetReviewById (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return a review by ID if it exists', async () => {
    const query = `
      query GetReviewById($id: Int!) {
        getReviewById(params: { id: $id }) {
          id
          email
          name
          description
          rating
          rate_date
          product
          createdAt
          updatedAt
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({ query, variables: { id: 1 } })
      .expect(200);

    const result = response.body.data.getReviewById;

    expect(result).not.toBeNull();
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('rating');
    expect(result).toHaveProperty('rate_date');
    expect(result).toHaveProperty('product');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');

    expect(typeof result.id).toBe('number');
    expect(typeof result.email).toBe('string');
    expect(typeof result.name).toBe('string');
    expect(typeof result.description).toBe('string');
    expect(typeof result.rating).toBe('number');
    expect(typeof result.rate_date).toBe('string');
    expect(result.product).toBeNull();
    expect(typeof result.createdAt).toBe('string');
    expect(typeof result.updatedAt).toBe('string');
  });

  it('should return null for an out-of-range ID', async () => {
    const query = `
      query GetReviewById($id: Int!) {
        getReviewById(params: { id: $id }) {
          id
          email
          name
          description
          rating
          rate_date
          product
          createdAt
          updatedAt
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({ query, variables: { id: 99 } })
      .expect(200);

    const result = response.body.data.getReviewById;

    expect(result).toBeNull();
  });

  afterAll(async () => {
    await app.close();
  });
});
