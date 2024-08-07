import { Injectable } from '@nestjs/common';
import {
  ExternalPaginatedType,
  PaginatedType,
  ReviewExternalRecord,
} from '../domain/reviews.types';
import { ReviewEntity } from '../domain/reviews.entity';

@Injectable()
export class RatingCaptainMapper {
  reviewsToDomain(
    reviews: ExternalPaginatedType<ReviewExternalRecord>
  ): PaginatedType<ReviewEntity> {
    //TODO: implement this, map external reviews to domain
    const { data, total, current_page, per_page } = reviews;
    const domainReviews: ReviewEntity[] = data.map((externalReview) => {
      return new ReviewEntity({
        id: externalReview.id,
        email: externalReview.email,
        name: externalReview.name,
        description: externalReview.description,
        rating: externalReview.rate,
        rate_date: new Date(externalReview.rate_date),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    return {
      data: domainReviews,
      total,
      page: current_page,
      per_page,
    };
    // return [];
  }

  reviewByIdToDomain(externalReview: ReviewExternalRecord): ReviewEntity {
    return new ReviewEntity({
      id: externalReview.id,
      email: externalReview.email,
      name: externalReview.name,
      description: externalReview.description,
      rating: externalReview.rate,
      rate_date: new Date(externalReview.rate_date),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
