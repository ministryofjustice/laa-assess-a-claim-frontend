import type { Claim } from "#src/types/Claim.js";
import { formatClaimed } from "#src/helpers/index.js";
import type { SummaryListRow } from "./components/summaryList.js";
import { AssignmentStatusTagClass, FeeStatusTagClass } from "#src/viewmodels/components/status.js";
import { formatDateReadable, formatMinutes } from "#src/helpers/dataFormatters.js";
import type { Message } from "#src/viewmodels/components/message.js";
import { AssignmentStatus } from "#src/models/assignmentStatus.js";
import { FeeStatus } from "#src/models/feeStatus.js";

/**
 *
 */
export class ClaimViewModel {
  readonly title: string;
  readonly backLink: string = "/"; // todo make "javascript:history.back()" - CSP blocks this currently
  readonly assessLink: string;
  readonly assignmentStatus: AssignmentStatus;
  readonly feeStatus: FeeStatus;
  readonly summaryRows: SummaryListRow[];
  readonly costsAndAllocationsRows: SummaryListRow[];
  readonly providerRows: SummaryListRow[];
  readonly clientRows: SummaryListRow[];
  readonly caseRows: SummaryListRow[];
  readonly certificateScopeRows: SummaryListRow[];
  readonly proceedingsRows: SummaryListRow[];

  /**
   * Creates a view model containing the summary rows derived from the claim data
   * @param {Claim} claim Array of claims
   */
  constructor(claim: Claim) {
    this.title = "Fixed fee: Special Children Act (Care)";
    this.assessLink = `/claim/${claim.id}/assess`;
    // eslint-disable-next-line @typescript-eslint/prefer-destructuring -- temporary while we hardcode values
    this.assignmentStatus = AssignmentStatus.InProgress; // TODO - derive from claim
    this.feeStatus = claim.escaped === true ? FeeStatus.Escaped : FeeStatus.Fixed;

    this.summaryRows = ClaimViewModel.buildSummaryRows();
    this.costsAndAllocationsRows = ClaimViewModel.buildCostsAndAllocationsRows(this.feeStatus);
    this.providerRows = ClaimViewModel.buildProviderRows();
    this.clientRows = ClaimViewModel.buildClientRows();
    this.caseRows = ClaimViewModel.buildCaseRows();
    this.certificateScopeRows = ClaimViewModel.buildCertificateScopeRows();
    this.proceedingsRows = ClaimViewModel.buildProceedingsRows();
  }

  /**
   * Gets the assignment status text
   * @returns {string} the text value of the given assignment status
   */
  get assignmentStatusText(): Message {
    return { key: `pages.claim.assignmentStatus.${this.assignmentStatus}` };
  }

  /**
   * Gets the assignment status tag class
   * @returns {string} the tag class value for the given assignment status
   */
  get assignmentStatusTagClass(): string {
    return AssignmentStatusTagClass[this.assignmentStatus];
  }

  /**
   * Gets the text and href of the assignment button
   * @returns {string, string} the text and href for the assignment button
   */
  get assignmentButton(): { message: Message; href: string } {
    if (this.assignmentStatus === AssignmentStatus.NotAssigned) {
      return {
        message: {
          key: "pages.claim.assignment.add",
        },
        href: "#",
      };
    } else {
      return {
        message: {
          key: "pages.claim.assignment.remove",
        },
        href: "#",
      };
    }
  }

  private static buildSummaryRows(): SummaryListRow[] {
    return [
      {
        key: { key: "pages.claim.summary.totalClaimAmount" },
        value: { type: "text", value: formatClaimed(3480) },
      },
      {
        key: { key: "pages.claim.summary.dateReceived" },
        value: {
          type: "text",
          value: formatDateReadable(new Date("2026-02-27")),
        },
      },
      {
        key: { key: "pages.claim.summary.caseReferenceNumber" },
        value: { type: "text", value: "300001820960" },
      },
      {
        key: { key: "pages.claim.summary.laaReferenceNumber" },
        value: { type: "text", value: "LAA-90d26c" },
      },
      {
        key: { key: "pages.claim.summary.assignedTo" },
        value: { type: "text", value: "Caseworker name" },
      },
      {
        key: { key: "pages.claim.summary.providerRisk" },
        value: { type: "text", value: "Low" },
        action: { href: "#" },
      },
      {
        key: { key: "pages.claim.summary.claimTimeStandard" },
        value: { type: "text", value: formatMinutes(15) },
      },
    ];
  }

  private static buildCostsAndAllocationsRows(
    feeStatus: FeeStatus,
  ): SummaryListRow[] {
    if (feeStatus === FeeStatus.Escaped) {
      return [
        {
          key: { key: "pages.claim.costsAndAllocations.claimType" },
          value: { type: "text", value: "Solicitor final bill" },
        },
        {
          key: { key: "pages.claim.costsAndAllocations.totalClaimAmount" },
          value: {
            type: "tag",
            value: formatClaimed(9176.36),
            tag: {
              text: { key: `pages.claim.feeStatus.${feeStatus}` },
              classes: FeeStatusTagClass[feeStatus],
            },
          },
        },
        {
          key: { key: "pages.claim.costsAndAllocations.fixedFeeAmountGranted" },
          value: { type: "text", value: formatClaimed(3000) },
        },
        {
          key: { key: "pages.claim.costsAndAllocations.escapeThreshold" },
          value: { type: "text", value: formatClaimed(6000) },
        },
        {
          key: { key: "pages.claim.costsAndAllocations.assessmentBasis" },
          value: { type: "text", value: "Hourly rate, escaped" },
        },
        {
          key: {
            key: "pages.claim.costsAndAllocations.counselCostAndAllocation",
          },
          value: { type: "text", value: formatClaimed(2850) },
        },
        {
          key: { key: "pages.claim.costsAndAllocations.totalPaymentOnAccount" },
          value: { type: "text", value: formatClaimed(1200) },
        },
        {
          key: { key: "pages.claim.costsAndAllocations.totalPOA" },
          value: { type: "text", value: formatClaimed(1200) },
        },
        {
          key: { key: "pages.claim.costsAndAllocations.priorAuthority" },
          value: {
            type: "text",
            value: {
              key: "common.granted",
              args: { amount: formatClaimed(3200) },
            },
          },
        },
        {
          key: { key: "pages.claim.costsAndAllocations.availableCostLimit" },
          value: {
            type: "text",
            value: {
              key: "common.available",
              args: {
                amount: formatClaimed(18500),
                available: formatClaimed(25000),
              },
            },
          },
        },
      ];
    } else {
      return [
        {
          key: { key: "pages.claim.costsAndAllocations.claimType" },
          value: { type: "text", value: "Solicitor final bill" },
        },
        {
          key: { key: "pages.claim.costsAndAllocations.totalClaimAmount" },
          value: { type: "text", value: formatClaimed(3480) },
        },
        {
          key: { key: "pages.claim.costsAndAllocations.assessmentBasis" },
          value: { type: "text", value: "Fixed fee applies" },
        },
        {
          key: {
            key: "pages.claim.costsAndAllocations.counselCostAndAllocation",
          },
          value: { type: "text", value: formatClaimed(900) },
        },
        {
          key: { key: "pages.claim.costsAndAllocations.availableCostLimit" },
          value: {
            type: "text",
            value: {
              key: "common.available",
              args: {
                amount: formatClaimed(24100),
                available: formatClaimed(25000),
              },
            },
          },
        },
      ];
    }
  }

  private static buildProviderRows(): SummaryListRow[] {
    return [
      {
        key: { key: "pages.claim.providers.solicitorName" },
        value: { type: "text", value: "Smith & Co Solicitors" },
      },
      {
        key: { key: "pages.claim.providers.solicitorRegion" },
        value: { type: "text", value: "North West" },
      },
      {
        key: { key: "pages.claim.providers.numberOfSolicitors" },
        value: { type: "text", value: "1" },
      },
      {
        key: { key: "pages.claim.providers.counselInvolved" },
        value: { type: "text", value: "Yes" },
      },
      {
        key: { key: "pages.claim.providers.counselPayment" },
        value: { type: "text", value: "Paid and reconciled" },
      },
    ];
  }

  private static buildClientRows(): SummaryListRow[] {
    return [
      {
        key: { key: "pages.claim.client.name" },
        value: { type: "text", value: "Liam Oldfield" },
      },
      {
        key: { key: "pages.claim.client.dateOfBirth" },
        value: {
          type: "text",
          value: formatDateReadable(new Date("1996-03-27")),
        },
      },
      {
        key: { key: "pages.claim.client.location" },
        value: { type: "text", value: "Manchester" },
      },
      {
        key: { key: "pages.claim.client.status" },
        value: { type: "text", value: "Parent" },
      },
    ];
  }

  private static buildCaseRows(): SummaryListRow[] {
    return [
      {
        key: { key: "pages.case.summary.matterType" },
        value: { type: "text", value: "Special Children Act" },
      },
      {
        key: { key: "pages.case.summary.leadProceeding" },
        value: { type: "text", value: "Care order" },
      },
      {
        key: { key: "pages.case.summary.linkedCases" },
        value: { type: "link", value: { text: "1 linked case", href: "#" } },
      },
      {
        key: { key: "pages.case.summary.outcome" },
        value: { type: "text", value: "Final hearing completed" },
      },
    ];
  }

  private static buildCertificateScopeRows(): SummaryListRow[] {
    return [
      {
        key: { key: "pages.case.certificateScope.type" },
        value: { type: "text", value: "Substantive Certificate" },
      },
      {
        key: { key: "pages.case.certificateScope.description" },
        value: {
          type: "text",
          value: "To be represented on an application for Care Order",
        },
      },
      {
        key: { key: "pages.case.certificateScope.limitation" },
        value: {
          type: "text",
          value:
            "All steps up to and including final hearing, limited to family help",
        },
      },
      {
        key: { key: "pages.case.certificateScope.issueDate" },
        value: {
          type: "text",
          value: formatDateReadable(new Date("2026-02-27")),
        },
      },
      {
        key: { key: "pages.case.certificateScope.status" },
        value: {
          type: "text",
          value: {
            key: "common.discharged",
            args: { date: formatDateReadable(new Date("2026-02-28")) },
          },
        },
      },
      {
        key: { key: "pages.case.certificateScope.levelOfService" },
        value: { type: "text", value: "Full representation" },
      },
    ];
  }

  private static buildProceedingsRows(): SummaryListRow[] {
    return [
      {
        key: { key: "pages.case.proceedings.careOrder" },
        value: {
          type: "texts",
          values: [
            {
              key: "common.startDate",
              args: { date: formatDateReadable(new Date("2026-02-25")) },
            },
            "Final hearing completed (PB0057)",
          ],
        },
      },
      {
        key: { key: "pages.case.proceedings.supervisionOrder" },
        value: {
          type: "texts",
          values: [
            formatDateReadable(new Date("2025-11-12")),
            "Withdrawn (PB0142)",
          ],
        },
      },
    ];
  }
}