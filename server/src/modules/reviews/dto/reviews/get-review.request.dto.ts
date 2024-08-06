import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
@InputType()
export class GetReviewRequestDto {
  @IsInt()
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  id: number;
}
