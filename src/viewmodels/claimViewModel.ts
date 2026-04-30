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
  readonly title: string;
  readonly backLink: string = "/"; // todo make "javascript:history.back()" - CSP blocks this currently
  readonly assessLink: string;
  readonly status: Status;
  readonly unassigned: boolean;
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

    const providerRows = [];
    // TODO - By default the key text does not automatically call t()
    providerRows.push({ key: { text: "pages.claim.providers.solicitorName" }, value: { text: "Smith & Co Solicitors" } });
    providerRows.push({ key: { text: "pages.claim.providers.solicitorRegion" }, value: { text: "North West" } });
    providerRows.push({ key: { text: "pages.claim.providers.numberOfSolicitors" }, value: { text: "1" } });
    // TODO - Logic for hiding next line if 'no'
    providerRows.push({ key: { text: "pages.claim.providers.counselInvolved" }, value: { text: "Yes" } });
    providerRows.push({ key: { text: "pages.claim.providers.counselPayment" }, value: { text: "Paid and reconciled" } });
    
    this.providerRows = providerRows;

    const clientRows = [];
    clientRows.push({ key: { text: "pages.claim.client.name" }, value: { text: "Liam Oldfield" } });
    clientRows.push({ key: { text: "pages.claim.client.dateOfBirth" }, value: { text: formatDateReadable(new Date("1996-03-27")) } });
    clientRows.push({ key: { text: "pages.claim.client.location" }, value: { text: "Manchester" } });
    clientRows.push({ key: { text: "pages.claim.client.status" }, value: { text: "Parent" } });
    
    this.clientRows = clientRows;

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
