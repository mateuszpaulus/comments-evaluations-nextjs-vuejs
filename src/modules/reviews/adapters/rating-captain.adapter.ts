import { Injectable } from '@nestjs/common';
import {
  PaginatedRequest,
  PaginatedType,
  ReviewExternalRecord,
} from '../domain/reviews.types';

import { RatingCaptainMapper } from './rating-captain.mapper';
import { RatingCaptainPort } from './rating-captain.port';
import { ReviewEntity } from '../domain/reviews.entity';
import * as fs from 'fs';
import * as path from 'node:path';

@Injectable()
export class RatingCaptainAdapter implements RatingCaptainPort {
  constructor(private readonly mapper: RatingCaptainMapper) {}

  async getReviews(
    paginated: PaginatedRequest
  ): Promise<PaginatedType<ReviewEntity>> {
    // const { page, per_page } = paginated;
    // const data = []; // TODO: implement this, simulate paginated response from external API
    // const reviews = []; //TODO: implement this, map data to domain, use mapper
    // return reviews;

    const { page, per_page } = paginated;

    const filePath = path.join(
      process.cwd(),
      `src/modules/reviews/adapters/external_reviews_data_example.json`
    );

    const fileData = fs.readFileSync(filePath, 'utf-8');
    const allExternalReviews: ReviewExternalRecord[] = JSON.parse(fileData);

    const total = allExternalReviews.length;

    const startIndex = (page - 1) * per_page;
    const endIndex = startIndex + per_page;
    const paginatedReviews = allExternalReviews.slice(startIndex, endIndex);

    const reviews = this.mapper.reviewsToDomain({
      data: paginatedReviews,
    });
    return {
      data: reviews.data,
      total,
      page,
      per_page,
    };
  }

  async count(): Promise<number> {
    // const response = 111; // TODO: implement this
    // return response;

    const filePath = path.join(
      process.cwd(),
      `src/modules/reviews/adapters/external_reviews_data_example.json`
    );
    const fileData = fs.readFileSync(filePath, 'utf-8');

    const allExternalReviews: ReviewExternalRecord[] = JSON.parse(fileData);

    return allExternalReviews.length;
  }
}
