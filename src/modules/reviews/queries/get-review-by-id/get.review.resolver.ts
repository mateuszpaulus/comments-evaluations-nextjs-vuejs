import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { GetReviewRequestDto } from '../../dto/reviews/get-review.request.dto';
import { GetReviewByIdQuery } from './get.review.handler';
import { ReviewDTO } from '../../dto/reviews/get-review.response.dto';

@Resolver()
export class GetReviewByIdResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => ReviewDTO, { nullable: true })
  async getReviewById(
    @Args('params', { type: () => GetReviewRequestDto })
    params: GetReviewRequestDto
  ): Promise<ReviewDTO | null> {
    const { id } = params;
    const query = new GetReviewByIdQuery(id);
    const data = await this.queryBus.execute(query);
    return data;
  }
}
