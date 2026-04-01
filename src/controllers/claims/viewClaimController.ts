import { createProcessedError } from "#src/helpers/errorHandler.js";
import { claimService } from "#src/services/claimService.js";
import type { Request, Response, NextFunction } from "express";
import { ClaimViewModel } from "#src/viewmodels/claimViewModel.js";
import { getClaim } from "#src/generated-api/sdk.gen.js";
import config from "#config.js";
import { createClient } from "#src/generated-api/client/client.gen.js";

const NOT_FOUND = 404;

/**
 * Handle claim view with API data
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 * @returns {Promise<void>} Page to be returned
 */
export async function viewClaimPage(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const claimId = Number(req.params.claimId);

    //this could become something like createRequestApiClient(req)
    const apiClient = createClient({
      baseURL: config.api.baseUrl,
      axios: req.axiosMiddleware.axiosInstance,
    });

    const response2 = await getClaim({
      path: { claimId },
      client: apiClient,
    });

    console.log(response2.data);
    /*
    {
      id: 1,
      ufn: '121120/467',
      providerUserId: '123e4567-e89b-12d3-a456-426614174000',
      client: 'Giordano',
      category: 'Family',
      concluded: '2025-03-18',
      feeType: 'Escape',
      claimed: 234.56,
      submissionId: '550e8400-e29b-41d4-a716-446655440000'
      }

      matches except for concluded Date not string

      export const ClaimSchema = z.object({
        id: z.number(),
        ufn: z.string().optional(),
        providerUserId: z.string().optional(),
        client: z.string().optional(),
        category: z.string().optional(),
        concluded: z.string().optional().transform(val => (val == null ?  undefined : new Date(val))),
        feeType: z.string().optional(),
        claimed: z.number().optional(),
        submissionId: z.string().optional()
      });
    */

    const response = await claimService.getClaim(req.axiosMiddleware, claimId);


    if (response.status === "success") {
      const { body: claim } = response
      const vm = new ClaimViewModel(claim);

      res.render("main/claims/view.njk", {vm});
    } else {
      res.status(NOT_FOUND).render("main/error.njk", {
        status: "404",
        error: response.message,
      });
    }
  } catch (error) {
    const processedError = createProcessedError(error, `fetching claim details for user`);
    next(processedError);
  }
}
