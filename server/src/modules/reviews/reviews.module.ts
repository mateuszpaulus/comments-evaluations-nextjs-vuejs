import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetReviewsResolver } from './queries/get-reviews/get.reviews.resolver';
import { GetReviewByIdResolver } from './queries/get-review-by-id/get.review.resolver';
import { RatingCaptainAdapter } from './adapters/rating-captain.adapter';
import { RatingCaptainMapper } from './adapters/rating-captain.mapper';
import { LoggerService } from './services/logger.service';
import { ScheduleModule } from '@nestjs/schedule';
import { GetAllReviews } from './queries/get-reviews/get.reviews.handler';
import { GetReviewByIdHandler } from './queries/get-review-by-id/get.review.handler';

const resolvers: Provider[] = [GetReviewsResolver, GetReviewByIdResolver];

const adapters: Provider[] = [RatingCaptainAdapter];

const commandsHandlers: Provider[] = [];

const appServices: Provider[] = [LoggerService];

const mappers: Provider[] = [RatingCaptainMapper];

const repositories: Provider[] = [];

const queriesHandlers: Provider[] = [GetAllReviews, GetReviewByIdHandler];

@Module({
  imports: [ScheduleModule.forRoot(), CqrsModule],
  providers: [
    ...adapters,
    ...resolvers,
    ...commandsHandlers,
    ...appServices,
    ...mappers,
    ...repositories,
    ...queriesHandlers,
  ],
})
export class ReviewsModule {}
