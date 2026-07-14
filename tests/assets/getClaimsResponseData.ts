import type { ApiResponse, Paginated } from "#src/types/api-types.js";
import type { Claim } from "#src/types/Claim.js";

export const getClaimSuccessResponseData: ApiResponse<Claim> = {
  body: {
    id: "019f5b7d-e090-7097-8a74-aa5a23a5a03a",
    client: "Giordano",
    category: "Family",
    concluded: new Date("2025-03-18"),
    feeType: "Escape",
    claimed: 234.56,
    escaped: true
  },
  status: "success",
}

export const getClaimsSuccessResponseData: ApiResponse<Paginated<Claim>> = {
  body: {
    meta: {
      total: 1,
      page: 0,
      limit: 20,
      totalPages: undefined,
    },
    data: [
      {
        id: "019f5b7d-e090-7097-8a74-aa5a23a5a03a",
        client: "Giordano",
        category: "Family",
        concluded: new Date("2025-03-18"),
        feeType: "Escape",
        claimed: 234.56,
        escaped: true,
        counselPayment: "Paid and reconciled"
      },
      {
        id: "019f5b81-71d9-7fb3-a19b-b078d9c4ab91",
        client: "Amoto",
        category: "Immigration and Asylum",
        concluded: new Date("2025-03-14"),
        feeType: "Fixed",
        claimed: 56,
        escaped: false
      },
      {
        id: "019f5b81-8c5c-70aa-80e9-2d028a2587e3",
        client: "DeMello",
        category: "Immigration and Asylum",
        concluded: new Date("2025-03-13"),
        feeType: "Hourly",
        claimed: 456.01,
        escaped: true
      },
      {
        id: "019f5b81-a5d1-7b4c-a818-ee174f5b3301",
        client: "Omar",
        category: "Immigration and Asylum",
        concluded: new Date("2025-03-12"),
        feeType: "Hourly",
        claimed: 456.01,
        escaped: false
      },
      {
        id: "019f5b81-bc3d-7d3a-b80f-a55bfe0db7d8",
        client: "Abdelazim",
        category: "Family",
        concluded: new Date("2025-03-11"),
        feeType: "Hourly",
        claimed: 234.56,
        escaped: true
      },
      {
        id: "019f5b81-d0a7-75b4-b2c3-cccc1e7b5e45",
        client: "Simpson",
        category: "Family",
        concluded: undefined,
        feeType: "Fixed",
        claimed: 234.56,
        escaped: false
      },
      {
        id: "019f5b81-e626-749c-93a6-ebb874adf856",
        client: "Gruffalo",
        category: "Immigration and Asylum",
        concluded: new Date("2025-03-02"),
        feeType: "Hourly",
        claimed: 456.01,
        escaped: true
      },
      {
        id: "019f5b81-faee-7c47-ab8c-43093c752527",
        client: "O'Connor",
        category: "Family",
        concluded: new Date("2025-03-01"),
        feeType: "Fixed",
        claimed: 234.56,
        escaped: false
      },
      {
        id: "019f5b82-108f-7540-8d3d-2baabae8d048",
        client: "Tony",
        category: "Immigration and Asylum",
        concluded: new Date("2025-03-01"),
        feeType: "Fixed",
        claimed: 56,
        escaped: false
      },
      {
        id: "019f5b82-2463-7015-a96f-ac38f95fe11a",
        client: "Bianchi",
        category: "Immigration and Asylum",
        concluded: new Date("2025-03-01"),
        feeType: "Fixed",
        claimed: 56,
        escaped: false
      },
      {
        id: "019f5b82-4277-7470-9bc9-7762d41e6ba7",
        client: "McKenna",
        category: "Immigration and Asylum",
        concluded: undefined,
        feeType: "Fixed",
        claimed: 56,
        escaped: false
      },
    ],
  },
  status: "success",
};
