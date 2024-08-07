<template>
  <div class="p-6 h-full flex flex-col items-center justify-center">
    <div class="mb-12 w-full max-w-[765px] flex justify-start mt-[85px] sm:mt-[172px]">
      <div
          class="flex items-center border border-solid border-[#cbcbcb] rounded-[28px] h-[45px] max-w-[300px] w-full"
      >
        <input
            v-model.number="searchId"
            :style="{ border: 'none' }"
            class="px-[29px] py-3 rounded-[28px] outline-none bg-transparent flex-grow"
            placeholder="Wprowadź id"
            type="number"
            @keyup.enter="searchReview"
        >
        <button
            class="h-[45px] w-[45px] flex items-center justify-center bg-primary rounded-[30px]"
            @click="searchReview"
        >
          <img alt="search-icon" class="w-[16px] h-[16px] !fill-white" src="/magnifying-glass-solid.png"/>
        </button>
      </div>
    </div>

    <div v-if="searchResult"
         class="border border-solid px-[22px] py-[17px] rounded-[15px] shadow-custom w-full max-w-[765px]">
      <div class="flex flex-col sm:flex-row sm:items-center mb-4">
        <div class="flex flex-col">
          <div
              class="flex items-center justify-center border border-solid border-primary px-[29px] py-2 rounded-t-[10px]">
            <p class="text-black text-[26px] font-normal">{{ searchResult.rating }} / 5</p>
          </div>
          <div class="bg-primary rounded-b-[10px] py-[6px] px-[6px] flex gap-[7px] justify-center">

            <img v-for="n in Math.floor(searchResult.rating)"
                 :key="'full-' + n" alt="star-icon" src="/star.png"/>
          </div>
        </div>
        <div class="flex flex-grow mt-6 sm:mt-0">
          <p class="font-normal text-[30px] text-black sm:ml-[50px] mr-auto">{{ searchResult.name }}</p>
          <div class="flex items-center gap-2">
            <p class="text-[20px] text-secondary font-normal">id:</p>
            <p class="font-normal text-[30px] text-black">{{ searchResult.id }}</p>
          </div>
        </div>
      </div>
      <p class="mt-[24px] mb-[31px] text-black font-normal text-[30px]">{{ searchResult.description }}</p>
      <p class="text-[20px] text-[#A7A7A7] font-normal">
        {{ searchResult?.rate_date?.split('T')[0] }}
      </p>
    </div>
  </div>
</template>


<script lang="ts" setup>

const getReviewByIdQuery = gql`
  query GetReviewById($id: Int!) {
    getReviewById(params: { id: $id }) {
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
`;

interface Review {
  id: string;
  email: string;
  name: string;
  description: string;
  rating: number;
  rate_date: string;
  product: string;
  createdAt: string;
  updatedAt: string;
}


const searchId = ref<number | null>(null);
const searchResult = ref<Review | null>(null);

const searchReview = async () => {
  if (searchId.value && searchId.value !== null) {
    const {refetch} = useQuery(
        getReviewByIdQuery,
        {id: searchId.value},
    );
    const data = await refetch({id: searchId.value});
    searchResult.value = data?.data?.getReviewById;
  } else {
    searchResult.value = null;
  }
};

interface Review {
  id: string;
  email: string;
  name: string;
  description: string;
  rating: number;
  rate_date: string;
  product: string;
  createdAt: string;
  updatedAt: string;
}
</script>

<style scoped>

</style>