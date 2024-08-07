<template>
  <div class="p-6 flex items-center justify-center gap-8">
    <div class="flex flex-col lg:flex-row items-center justify-center gap-8 mt-[85px] sm:mt-[172px] flex-grow">
      <div class="flex flex-col items-center">
        <h1 class="font-normal text-[26px] text-black text-nowrap">
          Średnia ocen
        </h1>
        <div class="flex flex-row items-center">
          <h1 class="text-primary font-normal text-[60px]">5</h1>
          <h1 class="text-primary font-normal text-[45px]">/5</h1>
        </div>
        <div class="flex flex-row items-center">
          <img
              v-for="n in 5" :key="'full-' + n"
              alt="star-icon" class="h-[25px] w-[25px] bg-cover"
              src="/star-primary.png"
          />
        </div>
      </div>
      <div class="max-w-[655px] flex flex-col flex-grow">
        <div class="flex flex-col gap-[15px] items-center">
          <h1 class="text-[30px]">Wasze opinie </h1>
          <div class="flex gap-[1px]">
            <img
                v-for="n in 5" :key="'full-' + n"
                alt="star-icon" class="h-[18px] w-[18px] bg-cover"
                src="/star-primary.png"
            />
            <p class="pl-5 text-[#ABA8A8] text-[12px]">
              ({{ data?.total }} opinii)
            </p>
          </div>
        </div>
        <ul
            v-if="currentPageData?.length"
            class="border border-solid px-5 rounded-[15px] shadow-custom mt-11"
        >
          <li
              v-for="(review, index) in currentPageData" :key="review.id"
              :class="{'border-b border-[#C7C7C7] border-solid': index < currentPageData?.length - 1}"
              class="flex flex-col md:flex-row gap-[31px] items-start px-[29px] py-5"
          >
            <div class="flex flex-col md:max-w-[100px] w-full md:w-fit">
              <div
                  class="flex items-center justify-center border border-solid border-primary px-[29px] py-2 rounded-t-[10px]"
              >
                <p class="text-black text-[26px] font-normal text-nowrap">{{ review.rating }} / 5</p>
              </div>
              <div class="bg-primary rounded-b-[10px] py-[6px] px-[6px] flex gap-[7px] justify-center">
                <img
                    v-for="n in Math.floor(review.rating)"
                    :key="'full-' + n" alt="star-icon" src="/star.png"
                />
              </div>
            </div>
            <div class="flex flex-col">
              <p class="text-[18px] font-normal text-black">{{ review.description }}</p>
              <p class="text-[15px] text-[#A7A7A7] font-normal mt-[25px]">
                ~ {{ review.name }} {{ review?.rate_date?.split('T')[0] }}
              </p>
            </div>
          </li>
        </ul>
        <div v-else class="mx-auto mt-10"> Nie ma takiej strony</div>
        <div v-if="data" class="mt-[39px] flex md:gap-0 gap-5 flex-col md:flex-row md:justify-between items-center">
          <button
              :disabled="page === 1 || !currentPageData?.length"
              class="flex w-full justify-center md:w-fit items-center gap-5 px-[19px] py-2 bg-primary text-white rounded-[20px] disabled:opacity-50 disabled:cursor-not-allowed"
              @click="fetchPage(page - 1)"
          >
            <img
                alt="arrow-left" src="/arrow-left.png"
            />
            poprzednia strona
          </button>
          <div class="flex font-normal text-black text-[16px]">
            <input
                v-model.number="pageInput"
                class="w-[88px] border border-solid border-[#F3F3F3] rounded-[35px] shadow-custom pl-9 mr-[14px]"
                type="number"
                @change="handleEnter"
                @keyup.enter="handleEnter"
            >
            z
            <p class="ml-2">
              {{ totalPages }}
            </p>
          </div>
          <button
              :disabled="page === totalPages || !currentPageData?.length"
              class="flex w-full md:w-fit justify-center items-center gap-5 px-[19px] py-2 bg-primary text-white rounded-[20px] disabled:opacity-50 disabled:cursor-not-allowed"
              @click="fetchPage(page + 1)"
          >
            nastepna strona
            <img
                alt="arrow-right" src="/arrow-right.png"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const query = gql`
  query GetAllReviews($page: Int!, $perPage: Int!) {
    getAllReviews(params: { page: $page, per_page: $perPage }) {
      page
      per_page
      total
      data {
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

const currentPageData = computed(() => {
  const start = (page.value - 1) * perPage;
  return data?.value?.data?.slice(start, start + perPage);
});


const perPage = 3;
const page = ref(1);
const pageInput = ref(page.value);

const {result, fetchMore} = useQuery(query, {page: page.value, perPage});

const data = computed(() => result.value?.getAllReviews);
const totalPages = computed(() => Math.ceil((data?.value?.total || 0) / perPage));

const fetchPage = async (newPage: number) => {
  if (newPage < 1 || newPage > totalPages.value) return;
  page.value = newPage;
  pageInput.value = page.value
  await fetchMore({
    variables: {page: newPage},
    updateQuery: (previousResult, {fetchMoreResult}) => {
      if (!fetchMoreResult) return previousResult;

      const previousReviews = previousResult.getAllReviews.data as Review[];
      const fetchMoreReviews = fetchMoreResult.getAllReviews.data as Review[];


      const existingReviewsMap = new Map(previousReviews.map(review => [review.id, review]));
      const newData = fetchMoreReviews.filter(review => !existingReviewsMap.has(review.id));

      const updatedData = [...previousResult.getAllReviews.data, ...newData];

      return {
        getAllReviews: {
          ...fetchMoreResult.getAllReviews,
          data: updatedData,
        },
      };
    },
  });
};
const handleEnter = () => {
  if (pageInput.value !== page.value) {
    page.value = pageInput.value;
    fetchPage(page.value);
  }
};
</script>

