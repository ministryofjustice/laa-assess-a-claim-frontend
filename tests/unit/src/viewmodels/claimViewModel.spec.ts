import { ClaimViewModel } from "#src/viewmodels/claimViewModel.js";
import type { Claim } from "#src/types/Claim.js";
import { getClaimsSuccessResponseData } from "#tests/assets/getClaimsResponseData.js";
import { expect } from "chai";

describe("ClaimViewModel constructor()", () => {
  it("builds the title, back link and summary rows", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);

    expect(vm.title).to.equal("Fixed fee: Special Children Act (Care)");
    expect(vm.backLink).to.equal("/");

    expect(vm.summary[0].key.key).to.equal("pages.claim.summary.totalClaimAmount");
    expect(vm.summary[0].value).to.deep.equal({ type: "text", value: "£3,480" });
    expect(vm.summary[0].action).to.be.undefined;

    expect(vm.summary[1].key.key).to.equal("pages.claim.summary.dateReceived");
    expect(vm.summary[1].value).to.deep.equal({ type: "text", value: "27 February 2026" });
    expect(vm.summary[1].action).to.be.undefined;

    expect(vm.summary[2].key.key).to.equal("pages.claim.summary.caseReferenceNumber");
    expect(vm.summary[2].value).to.deep.equal({type: "text", value: "300001820960"});
    expect(vm.summary[2].action).to.be.undefined;

    expect(vm.summary[3].key.key).to.equal("pages.claim.summary.laaReferenceNumber");
    expect(vm.summary[3].value).to.deep.equal({type: "text", value: "LAA-90d26c"});
    expect(vm.summary[3].action).to.be.undefined;

    expect(vm.summary[4].key.key).to.equal("pages.claim.summary.assignedTo");
    expect(vm.summary[4].value).to.deep.equal({type: "text", value: "Caseworker name"});
    expect(vm.summary[4].action).to.be.undefined;

    expect(vm.summary[5].key.key).to.equal("pages.claim.summary.providerRisk");
    expect(vm.summary[5].value).to.deep.equal({type: "text", value: "Low"});
    expect(vm.summary[5].action?.href).to.equal("#");

    expect(vm.summary[6].key.key).to.equal("pages.claim.summary.claimTimeStandard");
    expect(vm.summary[6].value).to.deep.equal({ type: "text", value: { key: "common.minutes", args: { "minutes": 15} } });
    expect(vm.summary[6].action).to.be.undefined;

    expect(vm.costsAndAllocationsRows[0].key.key).to.equal("pages.claim.costsAndAllocations.claimType");
    expect(vm.costsAndAllocationsRows[0].value).to.deep.equal({type: "text", value: "Solicitor final bill"});
    expect(vm.costsAndAllocationsRows[0].action).to.be.undefined;

    expect(vm.costsAndAllocationsRows[1].key.key).to.equal("pages.claim.costsAndAllocations.totalClaimAmount");
    expect(vm.costsAndAllocationsRows[1].value).to.deep.equal({ type: "tag", value: "£9,176.36", tag: { value: { key: "pages.claim.feeStatus.escaped"}, classes: "govuk-tag--blue" }});

    expect(vm.costsAndAllocationsRows[2].key.key).to.equal("pages.claim.costsAndAllocations.fixedFeeAmountGranted");
    expect(vm.costsAndAllocationsRows[2].value).to.deep.equal({type: "text", value: "£3,000"});
    expect(vm.costsAndAllocationsRows[2].action).to.be.undefined;

    expect(vm.costsAndAllocationsRows[3].key.key).to.equal("pages.claim.costsAndAllocations.escapeThreshold");
    expect(vm.costsAndAllocationsRows[3].value).to.deep.equal({type: "text", value: "£6,000"});
    expect(vm.costsAndAllocationsRows[3].action).to.be.undefined;

    expect(vm.costsAndAllocationsRows[4].key.key).to.equal("pages.claim.costsAndAllocations.assessmentBasis");
    expect(vm.costsAndAllocationsRows[4].value).to.deep.equal({type: "text", value: "Hourly rate, escaped"});
    expect(vm.costsAndAllocationsRows[4].action).to.be.undefined;

    expect(vm.costsAndAllocationsRows[5].key.key).to.equal("pages.claim.costsAndAllocations.counselCostAndAllocation");
    expect(vm.costsAndAllocationsRows[5].value).to.deep.equal({type: "text", value: "£2,850"});
    expect(vm.costsAndAllocationsRows[5].action).to.be.undefined;

    expect(vm.costsAndAllocationsRows[6].key.key).to.equal("pages.claim.costsAndAllocations.totalPaymentOnAccount");
    expect(vm.costsAndAllocationsRows[6].value).to.deep.equal({type: "text", value: "£1,200"});
    expect(vm.costsAndAllocationsRows[6].action).to.be.undefined;

    expect(vm.costsAndAllocationsRows[7].key.key).to.equal("pages.claim.costsAndAllocations.totalPOA");
    expect(vm.costsAndAllocationsRows[7].value).to.deep.equal({type: "text", value: "£1,200"});
    expect(vm.costsAndAllocationsRows[7].action).to.be.undefined;

    expect(vm.costsAndAllocationsRows[8].key.key).to.equal("pages.claim.costsAndAllocations.priorAuthority");
    expect(vm.costsAndAllocationsRows[8].value).to.deep.equal({ type: "text", value: { key: "common.granted", args: { "amount": "£3,200"} } });
    expect(vm.costsAndAllocationsRows[8].action).to.be.undefined;

    expect(vm.costsAndAllocationsRows[9].key.key).to.equal("pages.claim.costsAndAllocations.availableCostLimit");
    expect(vm.costsAndAllocationsRows[9].value).to.deep.equal({ type: "text", value: { key: "common.available", args:{ "amount": "£18,500", "available": "£25,000"} } });
    expect(vm.costsAndAllocationsRows[9].action).to.be.undefined;

    expect(vm.caseSummaryRows[0].key.key).to.equal("pages.case.summary.matterType");
    expect(vm.caseSummaryRows[0].value).to.deep.equal({type: "text", value: "Special Children Act"});
    expect(vm.caseSummaryRows[0].action).to.be.undefined;

    expect(vm.caseSummaryRows[1].key.key).to.equal("pages.case.summary.leadProceeding");
    expect(vm.caseSummaryRows[1].value).to.deep.equal({type: "text", value: "Care order"});
    expect(vm.caseSummaryRows[1].action).to.be.undefined;

    expect(vm.caseSummaryRows[2].key.key).to.equal("pages.case.summary.linkedCases");
    expect(vm.caseSummaryRows[2].value).to.deep.equal({ type: "link", value: "1 linked case", href: "#" });
    expect(vm.caseSummaryRows[2].action).to.be.undefined;

    expect(vm.caseSummaryRows[3].key.key).to.equal("pages.case.summary.outcome");
    expect(vm.caseSummaryRows[3].value).to.deep.equal({type: "text", value: "Final hearing completed"});
    expect(vm.caseSummaryRows[3].action).to.be.undefined;

      expect(vm.certificateScopeSummaryRows[0].key.key).to.equal("pages.case.certificateScope.type");
      expect(vm.certificateScopeSummaryRows[0].value).to.deep.equal({type: "text", value: "Substantive Certificate"});
      expect(vm.certificateScopeSummaryRows[0].action).to.be.undefined;

      expect(vm.certificateScopeSummaryRows[1].key.key).to.equal("pages.case.certificateScope.description");
      expect(vm.certificateScopeSummaryRows[1].value).to.deep.equal({type: "text", value: "To be represented on an application for Care Order"});
      expect(vm.certificateScopeSummaryRows[1].action).to.be.undefined;

      expect(vm.certificateScopeSummaryRows[2].key.key).to.equal("pages.case.certificateScope.limitation");
      expect(vm.certificateScopeSummaryRows[2].value).to.deep.equal({type: "text", value: "All steps up to and inlcuding final hearing, limited to family help"});
      expect(vm.certificateScopeSummaryRows[2].action).to.be.undefined;

      expect(vm.certificateScopeSummaryRows[3].key.key).to.equal("pages.case.certificateScope.issueDate");
      expect(vm.certificateScopeSummaryRows[3].value).to.deep.equal({type: "text", value: "27 February 2026"});
      expect(vm.certificateScopeSummaryRows[3].action).to.be.undefined;

      expect(vm.certificateScopeSummaryRows[4].key.key).to.equal("pages.case.certificateScope.status");
      expect(vm.certificateScopeSummaryRows[4].value).to.deep.equal({ type:"text", value: { key: "common.discharged", args: { date: "28 February 2026" }}});
      expect(vm.certificateScopeSummaryRows[4].action).to.be.undefined;

      expect(vm.certificateScopeSummaryRows[5].key.key).to.equal("pages.case.certificateScope.levelOfService");
      expect(vm.certificateScopeSummaryRows[5].value).to.deep.equal({type: "text", value: "Full representation"});
      expect(vm.certificateScopeSummaryRows[5].action).to.be.undefined;

      expect(vm.proceedingsSummaryRows[0].key.key).to.equal("pages.case.proceedings.careOrder");
      expect(vm.proceedingsSummaryRows[0].value).to.deep.equal({ type: "texts", values: [{key: "common.startDate", args: { date: "25 February 2026" }}, "Final hearing completed (PB0057)"] });
      expect(vm.proceedingsSummaryRows[0].action).to.be.undefined;

      expect(vm.proceedingsSummaryRows[1].key.key).to.equal("pages.case.proceedings.supervisionOrder");
      expect(vm.proceedingsSummaryRows[1].value).to.deep.equal({ type: "texts", values: ["12 November 2025", "Withdrawn (PB0142)"] });
      expect(vm.proceedingsSummaryRows[1].action).to.be.undefined;
  });
});
