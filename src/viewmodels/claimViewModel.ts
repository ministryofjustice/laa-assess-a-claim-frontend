import type { Claim } from "#src/types/Claim.js";
import { formatClaimed, formatDate, formatOptionalString } from "#src/helpers/index.js";
import type { SummaryListRow } from "./components/summaryList.js";
import { Status, StatusTagClass } from "#src/viewmodels/components/status.js";
import {
  formatDateReadable,
  formatMinutes,
} from "#src/helpers/dataFormatters.js";
import type { Message } from "#src/viewmodels/components/message.js";

/**
 *
 */
export class ClaimViewModel {
  readonly summary: SummaryListRow[];
  readonly costsAndAllocationsRows: SummaryListRow[];
  readonly rows: SummaryListRow[];
  readonly title: string;
  readonly backLink: string = "/"; // todo make "javascript:history.back()" - CSP blocks this currently
  readonly assessLink: string;
  readonly status: Status;
  readonly unassigned: boolean;

  /**
   * Creates a view model containing the summary rows derived from the claim data
   * @param {Claim} claim Array of claims
   */
  constructor(claim: Claim) {
    this.title = "Fixed fee: Special Children Act (Care)"
    this.assessLink = `/claim/${claim.id}/assess`
    // eslint-disable-next-line @typescript-eslint/prefer-destructuring -- temporary while we hardcode values
    this.status = Status.InProgress;
    this.unassigned = false; // TODO - derive from claim

    const summary: SummaryListRow[] = [];
    // TODO - default to 'No data available' if 'total claim amount' is undefined
    summary.push({ key: { message: { key: "pages.claim.summary.totalClaimAmount" } }, value: { text: formatClaimed(3480) } });
    summary.push({ key: { message: { key: "pages.claim.summary.dateReceived" } }, value: { text: formatDateReadable(new Date("2026-02-27")) } });
    // TODO - default to 'No data available' if 'case reference number' is undefined
    summary.push({ key: { message: { key: "pages.claim.summary.caseReferenceNumber" } }, value: { text: "300001820960" } });
    // TODO - default to 'No data available' if 'LAA reference number' is undefined
    summary.push({ key: { message: { key: "pages.claim.summary.laaReferenceNumber" } }, value: { text: "LAA-90d26c" } });
    // TODO - default to 'Not yet assigned' if 'assigned to' is undefined
    summary.push({ key: { message: { key: "pages.claim.summary.assignedTo" } }, value: { text: "Caseworker name" } } );
    // TODO - default to 'Low' if 'provider risk' is undefined
    summary.push({ key: { message: { key: "pages.claim.summary.providerRisk" } }, value: { text: "Low" }, action: { href: "#" } } );
    summary.push({ key: { message: { key: "pages.claim.summary.claimTimeStandard" } }, value: { message: formatMinutes(15) } } );
    this.summary = summary;

    const costsAndAllocationsRows: SummaryListRow[] = [];
    costsAndAllocationsRows.push({ key: { message: { key: "pages.claim.costsAndAllocations.claimType" } }, value: { text: "Solicitor final bill" } } );
    costsAndAllocationsRows.push({ key: { message: { key: "pages.claim.costsAndAllocations.totalClaimAmount" } }, value: { text: formatClaimed(9176.36) }, action: { tag: { text: "Escaped", classes: "govuk-tag--blue" } } } );
    this.costsAndAllocationsRows = costsAndAllocationsRows;

    const rows: SummaryListRow[] = [];

    rows.push({ key: { text: "Claim ID" }, value: { text: String(claim.id) } });

    if (claim.ufn !== undefined && claim.ufn !== '') {
      rows.push({ key: { text: "UFN" }, value: { text: claim.ufn } });
    }

    if (claim.client !== undefined) {
      rows.push({ key: { text: "Client" }, value: { text: formatOptionalString(claim.client) } });
    }

    if (claim.category !== undefined) {
      rows.push({ key: { text: "Category" }, value: { text: formatOptionalString(claim.category) } });
    }

    if (claim.concluded !== undefined) {
      rows.push({ key: { text: "Concluded" }, value: { text: formatDate(new Date(claim.concluded)) } });
    }

    if (claim.feeType !== undefined) {
      rows.push({ key: { text: "Fee type" }, value: { text: claim.feeType } });
    }

    if (claim.claimed !== undefined) {
      rows.push({ key: { text: "Claimed" }, value: { text: formatClaimed(claim.claimed) } });
    }

    if (claim.submissionId !== undefined) {
      const href = `/submissions/${encodeURIComponent(claim.submissionId)}`;
      rows.push({
        key: { text: "Submission" },
        value: {
          html:
            `<a class="govuk-link" href="${href}">` +
            `View submission<span class="govuk-visually-hidden"> for claim ${this.title}</span>` +
            `</a>`
        }
      });
    }

    this.rows = rows;
  }

  /**
   * Gets the status text
   * @returns {string} the text value of the given status
   */
  get statusText(): string {
    return `pages.claim.status.${this.status}`;
  }

  /**
   * Gets the status tag class
   * @returns {string} the tag class value for the given status
   */
  get statusTagClass(): string {
    return StatusTagClass[this.status];
  }

  /**
   * Gets the text and href of the assignment button
   * @returns {string, string} the text and href for the assignment button
   */
  get assignmentButton(): { message: Message; href: string } {
    if (this.unassigned) {
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
