import { Injectable } from '@nestjs/common';
import { ExternalPaginatedType, ReviewExternalRecord, PaginatedType } from '../domain/reviews.types';
import { ReviewEntity } from '../domain/reviews.entity';

@Injectable()
export class RatingCaptainMapper {

  constructor(){}

  reviewsToDomain(reviews: ExternalPaginatedType<ReviewExternalRecord>): PaginatedType<ReviewEntity> {
    //TODO: implement this, map external reviews to domain
}
