import { Field, ObjectType, Int} from '@nestjs/graphql';

@ObjectType()
export class ReviewDTO {
    
    @Field(() => Int)
    id: number;

    @Field({ nullable: true})
    email: string;

    @Field()
    name: string;

    @Field({ nullable: true})
    description: string;

    @Field(() => Int)
    rating: number;

    @Field()
    rate_date: Date;

    @Field({nullable: true})
    product: string;

    @Field()
    createdAt: Date;
    
    @Field()
    updatedAt: Date;
}