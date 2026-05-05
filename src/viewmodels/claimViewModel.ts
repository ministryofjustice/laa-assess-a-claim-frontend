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
  readonly summary: SummaryListRow[];
  readonly costsAndAllocationsRows: SummaryListRow[];
  readonly title: string;
  readonly backLink: string = "/"; // todo make "javascript:history.back()" - CSP blocks this currently
  readonly caseSummaryRows: SummaryListRow[];
  readonly certificateScopeSummaryRows: SummaryListRow[];
  readonly proceedingsSummaryRows: SummaryListRow[];
  readonly assessLink: string;
  readonly assignmentStatus: AssignmentStatus;
  readonly feeStatus: FeeStatus;
  readonly providerRows;
  readonly clientRows;

  /**
   * Creates a view model containing the summary rows derived from the claim data
   * @param {Claim} claim Array of claims
   */
  constructor(claim: Claim) {
    this.title = "Fixed fee: Special Children Act (Care)"
    this.assessLink = `/claim/${claim.id}/assess`
    // eslint-disable-next-line @typescript-eslint/prefer-destructuring -- temporary while we hardcode values
    this.assignmentStatus = AssignmentStatus.InProgress; // TODO - derive from claim
    // eslint-disable-next-line @typescript-eslint/prefer-destructuring -- temporary while we hardcode values
    this.feeStatus = FeeStatus.Escaped; // TODO - derive from claim

    const summary: SummaryListRow[] = [];
    // TODO - default to 'No data available' if 'total claim amount' is undefined
    summary.push({ key: { key: "pages.claim.summary.totalClaimAmount" }, value: { type: "text", value: formatClaimed(3480) } });
    summary.push({ key: { key: "pages.claim.summary.dateReceived" }, value: { type: "text", value: formatDateReadable(new Date("2026-02-27")) } });
    // TODO - default to 'No data available' if 'case reference number' is undefined
    summary.push({ key: { key: "pages.claim.summary.caseReferenceNumber" }, value: { type: "text", value: "300001820960" } });
    // TODO - default to 'No data available' if 'LAA reference number' is undefined
    summary.push({ key: { key: "pages.claim.summary.laaReferenceNumber" }, value: { type: "text", value: "LAA-90d26c" } });
    // TODO - default to 'Not yet assigned' if 'assigned to' is undefined
    summary.push({ key: { key: "pages.claim.summary.assignedTo" }, value: { type: "text", value: "Caseworker name" } } );
    // TODO - default to 'Low' if 'provider risk' is undefined
    summary.push({ key: { key: "pages.claim.summary.providerRisk" }, value: { type: "text", value: "Low" }, action: { href: "#" } } );
    summary.push({ key: { key: "pages.claim.summary.claimTimeStandard" }, value: { type: "text", value: formatMinutes(15) } } );
    this.summary = summary;

    const costsAndAllocationsRows: SummaryListRow[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- temporary while we hardcode values
    if (this.feeStatus === FeeStatus.Escaped) {
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.claimType" }, value: { type: "text", value: "Solicitor final bill" } } );
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.totalClaimAmount" }, value: { type: "tag", text: formatClaimed(9176.36), tag: this.feeStatusText, classes: this.feeStatusTagClass } } );
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.fixedFeeAmountGranted" }, value: { type: "text", value: formatClaimed(3000) } } );
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.escapeThreshold" }, value: { type: "text", value: formatClaimed(6000) } } );
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.assessmentBasis" }, value: { type: "text", value: "Hourly rate, escaped" } } );
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.counselCostAndAllocation" }, value: { type: "text", value: formatClaimed(2850) } } );
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.totalPaymentOnAccount" }, value: { type: "text", value: formatClaimed(1200) } } );
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.totalPOA" }, value: { type: "text", value: formatClaimed(1200) } } );
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.priorAuthority" }, value: { type: "text", value: { key: "common.granted", args: { amount: formatClaimed(3200) } } } } );
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.availableCostLimit" }, value: { type: "text", value: { key: "common.available", args: { amount: formatClaimed(18500), available: formatClaimed(25000) } } } } );
    } else {
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.claimType" }, value: { type: "text", value: "Solicitor final bill" } } );
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.totalClaimAmount" }, value: { type: "text", value: formatClaimed(3480) } } );
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.assessmentBasis" }, value: { type: "text", value: "Fixed fee applies" } } );
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.counselCostAndAllocation" }, value: { type: "text", value: formatClaimed(900) } } );
      costsAndAllocationsRows.push({ key: { key: "pages.claim.costsAndAllocations.availableCostLimit" }, value: { type: "text", value: { key: "common.available", args: { amount: formatClaimed(24100), available: formatClaimed(25000) } } } } );
    }
    this.costsAndAllocationsRows = costsAndAllocationsRows;

    const caseSummaryRows: SummaryListRow[] = [];
    caseSummaryRows.push({ key: { key: "pages.case.summary.matterType" }, value: { type: "text", value: "Special Children Act" } });
    caseSummaryRows.push({ key: { key: "pages.case.summary.leadProceeding" }, value: { type: "text", value: "Care order" } });
    caseSummaryRows.push({ key: { key: "pages.case.summary.linkedCases" }, value: { type: "link", text: "1 linked case", href: "#" } } );
    caseSummaryRows.push({ key: { key: "pages.case.summary.outcome" }, value: { type: "text", value: "Final hearing completed" } });
    this.caseSummaryRows = caseSummaryRows;

    const certificateScopeSummaryRows: SummaryListRow[] = [];
    certificateScopeSummaryRows.push({ key: { key: "pages.case.certificateScope.type" }, value: { type: "text", value: "Substantive Certificate" } });
    certificateScopeSummaryRows.push({ key: { key: "pages.case.certificateScope.description" }, value: { type: "text", value: "To be represented on an application for Care Order" } });
    certificateScopeSummaryRows.push({ key: { key: "pages.case.certificateScope.limitation" }, value: { type: "text", value: "All steps up to and inlcuding final hearing, limited to family help" } });
    certificateScopeSummaryRows.push({ key: { key: "pages.case.certificateScope.issueDate" }, value: { type: "text", value: formatDateReadable(new Date("2026-02-27")) } });
    certificateScopeSummaryRows.push({ key: { key: "pages.case.certificateScope.status" }, value: { type: "text", value: { key: "common.discharged", args: { date: formatDateReadable(new Date("2026-02-28")) } } } });
    certificateScopeSummaryRows.push({ key: { key: "pages.case.certificateScope.levelOfService" }, value: { type: "text", value: "Full representation" } });
    this.certificateScopeSummaryRows = certificateScopeSummaryRows;

    const proceedingsSummaryRows: SummaryListRow[] = [];
    proceedingsSummaryRows.push({ key: { key: "pages.case.proceedings.careOrder" }, value: { type: "texts", values: [{ key: "common.startDate", args: {date: formatDateReadable(new Date("2026-02-25"))} }, "Final hearing completed (PB0057)"] } });
    proceedingsSummaryRows.push({ key: { key: "pages.case.proceedings.supervisionOrder" }, value: { type: "texts", values: [formatDateReadable(new Date("2025-11-12")), "Withdrawn (PB0142)"] } });
    this.proceedingsSummaryRows = proceedingsSummaryRows;

    const providerRows: SummaryListRow[] = [];
    providerRows.push({ key: { key: "pages.claim.providers.solicitorName" }, value: { type: "text", value: "Smith & Co Solicitors" } });
    providerRows.push({ key: { key: "pages.claim.providers.solicitorRegion" }, value: { type: "text", value: "North West" } });
    providerRows.push({ key: { key: "pages.claim.providers.numberOfSolicitors" }, value: { type: "text", value: "1" } });
    // TODO - Logic for hiding next line if 'no'
    providerRows.push({ key: { key: "pages.claim.providers.counselInvolved" }, value: { type: "text", value: "Yes" } });
    providerRows.push({ key: { key: "pages.claim.providers.counselPayment" }, value: { type: "text", value: "Paid and reconciled" } });
    this.providerRows = providerRows;

    const clientRows: SummaryListRow[] = [];
    clientRows.push({ key: { key: "pages.claim.client.name" }, value: { type: "text", value: "Liam Oldfield" } });
    clientRows.push({ key: { key: "pages.claim.client.dateOfBirth" }, value: { type: "text", value: formatDateReadable(new Date("1996-03-27")) } });
    clientRows.push({ key: { key: "pages.claim.client.location" }, value: { type: "text", value: "Manchester" } });
    clientRows.push({ key: { key: "pages.claim.client.status" }, value: { type: "text", value: "Parent" } });
    this.clientRows = clientRows;
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
   * Gets the fee status text
   * @returns {string} the text value of the given fee status
   */
  get feeStatusText(): Message {
    return { key: `pages.claim.feeStatus.${this.feeStatus}` };
  }

  /**
   * Gets the fee status tag class
   * @returns {string} the tag class value for the given fee status
   */
  get feeStatusTagClass(): string {
    return FeeStatusTagClass[this.feeStatus];
  }

  /**
   * Gets the text and href of the assignment button
   * @returns {string, string} the text and href for the assignment button
   */
  get assignmentButton(): { message: Message; href: string } {
    if (this.assignmentStatus === AssignmentStatus.NotAssigned) {
      return {
        message: {
          key: "pages.claim.assignment.add"
        },
        href: "#"
      };
    } else {
      return {
        message: {
          key: "pages.claim.assignment.remove"
        },
        href: "#"
      };
    }
  }
}
