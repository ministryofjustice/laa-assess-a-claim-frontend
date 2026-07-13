import { http, HttpResponse } from 'msw';
import { UUID } from "uuidv7";

export const claim1Id = UUID.parse("019f5ba6-1dfc-7caf-b276-75ac6373525a");
export const claim2Id = UUID.parse("019f5ba6-4c9f-7b54-9f44-a625db7adeab");
export const claim3Id = UUID.parse("019f5ba6-6849-7214-9436-af6269d2d0fd");

/**
 * create a stub claim helper method
 * @param { number } id id of the claim to create
 * @param { object } overrides any overrides to be 
 * @returns { object } object for stubbed API response
 */
export function makeFakeClaim(id: UUID, overrides = {}): object {
  return {
    id,
    client: "Giordano",
    category: "Family",
    concluded: "2025-03-18",
    feeType: "Escape",
    claimed: 234.56,
    escaped: true,
    ...overrides
  }
}

/**
 * API handlers that intercept outbound requests from the Express app
 */
export const apiHandlers = [
  // match any host or protocol
  http.get('/api/v1/claims', ({ request }) => {
    const url = new URL(request.url, 'http://localhost:8080');
    const page = Number(url.searchParams.get('page'));
    const limit = Number(url.searchParams.get('limit'));

    console.log('🧩 MSW matched: GET /api/v1/claims');

    const claims = [
      makeFakeClaim(claim1Id),
      makeFakeClaim(claim2Id),
      makeFakeClaim(claim3Id)
    ];

    return HttpResponse.json({
      claims,
      page,
      limit,
      total: 3,
      totalPages: 1,
    });
  }),

  http.get('/api/v1/claims/:id', ({ params }) => {
    const { id } = params;
    if (typeof id !== 'string') {
      throw new Error('URL missing a valid string id param.');
    }
    console.log('🧩 MSW matched: GET /api/v1/claims/%s', id);
    if (id === claim2Id.toString()) {
      return HttpResponse.error();
    } else {
      const claim = makeFakeClaim(UUID.parse(id));
      return HttpResponse.json(claim);
    }
  }),
];
