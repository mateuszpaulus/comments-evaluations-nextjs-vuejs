import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RatingCaptainAdapter } from '../../adapters/rating-captain.adapter';
import { ReviewEntity } from '../../domain/reviews.entity';

export class GetReviewByIdQuery {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}

@QueryHandler(GetReviewByIdQuery)
export class GetReviewByIdHandler implements IQueryHandler<GetReviewByIdQuery> {
  constructor(private readonly adapter: RatingCaptainAdapter) {}

  async execute(query: GetReviewByIdQuery): Promise<ReviewEntity | null> {
    const { id } = query;
    const reviewById = await this.adapter.getReviewById(id);
    const review: ReviewEntity = reviewById;
    return review;
  }
}
