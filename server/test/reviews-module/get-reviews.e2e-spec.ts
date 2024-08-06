import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('GetAllReviews (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return all reviews with correct types', async () => {
    const query = `
      query GetAllReviews($page: Int!, $per_page: Int!) {
        getAllReviews(params: { page: $page, per_page: $per_page }) {
          page
          per_page
          total
          data {
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
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query,
        variables: {
          page: 1,
          per_page: 1,
        },
      })
      .expect(200);

    const result = response.body.data.getAllReviews;

    expect(result).toHaveProperty('page');
    expect(result).toHaveProperty('per_page');
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('data');

    expect(typeof result.page).toBe('number');
    expect(typeof result.per_page).toBe('number');
    expect(typeof result.total).toBe('number');

    expect(Array.isArray(result.data)).toBe(true);

    if (result.data.length > 0) {
      const firstItem = result.data[0];

      expect(firstItem).toHaveProperty('id');
      expect(firstItem).toHaveProperty('email');
      expect(firstItem).toHaveProperty('name');
      expect(firstItem).toHaveProperty('description');
      expect(firstItem).toHaveProperty('rating');
      expect(firstItem).toHaveProperty('rate_date');
      expect(firstItem).toHaveProperty('product');
      expect(firstItem).toHaveProperty('createdAt');
      expect(firstItem).toHaveProperty('updatedAt');

      expect(typeof firstItem.id).toBe('number');
      expect(typeof firstItem.email).toBe('string');
      expect(typeof firstItem.name).toBe('string');
      expect(typeof firstItem.description).toBe('string');
      expect(typeof firstItem.rating).toBe('number');
      expect(typeof firstItem.rate_date).toBe('string');
      expect(firstItem.product).toBeNull();
      expect(typeof firstItem.createdAt).toBe('string');
      expect(typeof firstItem.updatedAt).toBe('string');
    } else {
      expect(result.data).toEqual([]);
    }
  });

  it('should return an empty array for large pagination values', async () => {
    const query = `
      query GetAllReviews($page: Int!, $per_page: Int!) {
        getAllReviews(params: { page: $page, per_page: $per_page }) {
          page
          per_page
          total
          data {
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
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query,
        variables: {
          page: 99,
          per_page: 1,
        },
      })
      .expect(200);

    const result = response.body.data.getAllReviews;

    expect(result).toHaveProperty('page');
    expect(result).toHaveProperty('per_page');
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('data');

    expect(Array.isArray(result.data)).toBe(true);

    expect(result.data).toEqual([]);
  });

  afterAll(async () => {
    await app.close();
  });
});
