import { Injectable } from '@nestjs/common';
import { PaginatedRequest, PaginatedType } from '../domain/reviews.types';
import { RatingCaptainMapper } from './rating-captain.mapper';
import { RatingCaptainPort } from './rating-captain.port';
import { ReviewEntity } from '../domain/reviews.entity';

@Injectable()
export class RatingCaptainAdapter implements RatingCaptainPort {

  constructor(
    private readonly mapper: RatingCaptainMapper
  ) {}

  async getReviews(paginated: PaginatedRequest):Promise<PaginatedType<ReviewEntity>> {
    const { page, per_page } = paginated;
    const data = [] // TODO: implement this, simulate paginated response from external API
    const reviews = [] //TODO: implement this, map data to domain, use mapper
    return reviews;
  }

  async count():Promise<number> {
    const response = 111 // TODO: implement this
    return response;
  }
}
