import { ClaimViewModel } from "#src/viewmodels/claimViewModel.js";
import type { Claim } from "#src/types/Claim.js";
import { getClaimsSuccessResponseData } from "#tests/assets/getClaimsResponseData.js";
import { expect } from "chai";

describe("ClaimViewModel constructor()", () => {
  it("builds the title", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);

    expect(vm.title).to.equal("Fixed fee: Special Children Act (Care)");
  });

  it("builds the summary rows", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);

    expect(vm.summaryRows[0].key.key).to.equal("pages.claim.summary.totalClaimAmount");
    expect(vm.summaryRows[0].value).to.deep.equal({ type: "text", value: "£3,480" });
    expect(vm.summaryRows[0].action).to.be.undefined;

    expect(vm.summaryRows[1].key.key).to.equal("pages.claim.summary.dateReceived");
    expect(vm.summaryRows[1].value).to.deep.equal({ type: "text", value: "27 February 2026" });
    expect(vm.summaryRows[1].action).to.be.undefined;

    expect(vm.summaryRows[2].key.key).to.equal("pages.claim.summary.caseReferenceNumber");
    expect(vm.summaryRows[2].value).to.deep.equal({type: "text", value: "300001820960"});
    expect(vm.summaryRows[2].action).to.be.undefined;

    expect(vm.summaryRows[3].key.key).to.equal("pages.claim.summary.laaReferenceNumber");
    expect(vm.summaryRows[3].value).to.deep.equal({type: "text", value: "LAA-90d26c"});
    expect(vm.summaryRows[3].action).to.be.undefined;

    expect(vm.summaryRows[4].key.key).to.equal("pages.claim.summary.assignedTo");
    expect(vm.summaryRows[4].value).to.deep.equal({type: "text", value: "Caseworker name"});
    expect(vm.summaryRows[4].action).to.be.undefined;

    expect(vm.summaryRows[5].key.key).to.equal("pages.claim.summary.providerRisk");
    expect(vm.summaryRows[5].value).to.deep.equal({type: "text", value: "Low"});
    expect(vm.summaryRows[5].action?.href).to.equal("#");

    expect(vm.summaryRows[6].key.key).to.equal("pages.claim.summary.claimTimeStandard");
    expect(vm.summaryRows[6].value).to.deep.equal({ type: "text", value: { key: "common.minutes", args: { "minutes": 15} } });
    expect(vm.summaryRows[6].action).to.be.undefined;
  });

  it("builds the costs and allocations rows when escaped", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);

    expect(vm.costsAndAllocationsRows[0].key.key).to.equal("pages.claim.costsAndAllocations.claimType");
    expect(vm.costsAndAllocationsRows[0].value).to.deep.equal({type: "text", value: "Solicitor final bill"});
    expect(vm.costsAndAllocationsRows[0].action).to.be.undefined;

    expect(vm.costsAndAllocationsRows[1].key.key).to.equal("pages.claim.costsAndAllocations.totalClaimAmount");
    expect(vm.costsAndAllocationsRows[1].value).to.deep.equal({ type: "tag", value: "£9,176.36", tag: { text: { key: "pages.claim.feeStatus.escaped"}, classes: "govuk-tag--blue" }});

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
  });

  it("builds the costs and allocations rows when fixed", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![1]!;
    const vm = new ClaimViewModel(claim);

    expect(vm.costsAndAllocationsRows[0].key.key).to.equal("pages.claim.costsAndAllocations.claimType");
    expect(vm.costsAndAllocationsRows[0].value).to.deep.equal({type: "text", value: "Solicitor final bill"});
    expect(vm.costsAndAllocationsRows[0].action).to.be.undefined;

    expect(vm.costsAndAllocationsRows[1].key.key).to.equal("pages.claim.costsAndAllocations.totalClaimAmount");
    expect(vm.costsAndAllocationsRows[1].value).to.deep.equal({ type: "text", value: "£3,480"});

    expect(vm.costsAndAllocationsRows[2].key.key).to.equal("pages.claim.costsAndAllocations.assessmentBasis");
    expect(vm.costsAndAllocationsRows[2].value).to.deep.equal({type: "text", value: "Fixed fee applies"});
    expect(vm.costsAndAllocationsRows[2].action).to.be.undefined;

    expect(vm.costsAndAllocationsRows[3].key.key).to.equal("pages.claim.costsAndAllocations.counselCostAndAllocation");
    expect(vm.costsAndAllocationsRows[3].value).to.deep.equal({type: "text", value: "£900"});
    expect(vm.costsAndAllocationsRows[3].action).to.be.undefined;

    expect(vm.costsAndAllocationsRows[4].key.key).to.equal("pages.claim.costsAndAllocations.availableCostLimit");
    expect(vm.costsAndAllocationsRows[4].value).to.deep.equal({ type: "text", value: { key: "common.available", args:{ "amount": "£24,100", "available": "£25,000"} } });
    expect(vm.costsAndAllocationsRows[4].action).to.be.undefined;
  });

  it("builds the provider rows", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);

    expect(vm.providerRows[0].key.key).to.equal("pages.claim.providers.solicitorName");
    expect(vm.providerRows[0].value).to.deep.equal({type: "text", value: "Smith & Co Solicitors"});
    expect(vm.providerRows[0].action).to.be.undefined;

    expect(vm.providerRows[1].key.key).to.equal("pages.claim.providers.solicitorRegion");
    expect(vm.providerRows[1].value).to.deep.equal({type: "text", value: "North West"});
    expect(vm.providerRows[1].action).to.be.undefined;

    expect(vm.providerRows[2].key.key).to.equal("pages.claim.providers.numberOfSolicitors");
    expect(vm.providerRows[2].value).to.deep.equal({type: "text", value: "1"});
    expect(vm.providerRows[2].action).to.be.undefined;

    expect(vm.providerRows[3].key.key).to.equal("pages.claim.providers.counselInvolved");
    expect(vm.providerRows[3].value).to.deep.equal({type: "text", value: "Yes"});
    expect(vm.providerRows[3].action).to.be.undefined;

    expect(vm.providerRows[4].key.key).to.equal("pages.claim.providers.counselPayment");
    expect(vm.providerRows[4].value).to.deep.equal({type: "text", value: "Paid and reconciled"});
    expect(vm.providerRows[4].action).to.be.undefined;
  });

  it("builds the client rows", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);

    expect(vm.clientRows[0].key.key).to.equal("pages.claim.client.name");
    expect(vm.clientRows[0].value).to.deep.equal({type: "text", value: "Liam Oldfield"});
    expect(vm.clientRows[0].action).to.be.undefined;

    expect(vm.clientRows[1].key.key).to.equal("pages.claim.client.dateOfBirth");
    expect(vm.clientRows[1].value).to.deep.equal({type: "text", value: "27 March 1996"});
    expect(vm.clientRows[1].action).to.be.undefined;

    expect(vm.clientRows[2].key.key).to.equal("pages.claim.client.location");
    expect(vm.clientRows[2].value).to.deep.equal({type: "text", value: "Manchester"});
    expect(vm.clientRows[2].action).to.be.undefined;

    expect(vm.clientRows[3].key.key).to.equal("pages.claim.client.status");
    expect(vm.clientRows[3].value).to.deep.equal({type: "text", value: "Parent"});
    expect(vm.clientRows[3].action).to.be.undefined;
  });

  it("builds the case rows", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);

    expect(vm.caseRows[0].key.key).to.equal("pages.case.summary.matterType");
    expect(vm.caseRows[0].value).to.deep.equal({type: "text", value: "Special Children Act"});
    expect(vm.caseRows[0].action).to.be.undefined;

    expect(vm.caseRows[1].key.key).to.equal("pages.case.summary.leadProceeding");
    expect(vm.caseRows[1].value).to.deep.equal({type: "text", value: "Care order"});
    expect(vm.caseRows[1].action).to.be.undefined;

    expect(vm.caseRows[2].key.key).to.equal("pages.case.summary.linkedCases");
    expect(vm.caseRows[2].value).to.deep.equal({ type: "link", value: { text: "1 linked case", href: "#" }});
    expect(vm.caseRows[2].action).to.be.undefined;

    expect(vm.caseRows[3].key.key).to.equal("pages.case.summary.outcome");
    expect(vm.caseRows[3].value).to.deep.equal({type: "text", value: "Final hearing completed"});
    expect(vm.caseRows[3].action).to.be.undefined;
  });

  it("builds the certificate scope rows", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);

    expect(vm.certificateScopeRows[0].key.key).to.equal("pages.case.certificateScope.type");
    expect(vm.certificateScopeRows[0].value).to.deep.equal({type: "text", value: "Substantive Certificate"});
    expect(vm.certificateScopeRows[0].action).to.be.undefined;

    expect(vm.certificateScopeRows[1].key.key).to.equal("pages.case.certificateScope.description");
    expect(vm.certificateScopeRows[1].value).to.deep.equal({type: "text", value: "To be represented on an application for Care Order"});
    expect(vm.certificateScopeRows[1].action).to.be.undefined;

    expect(vm.certificateScopeRows[2].key.key).to.equal("pages.case.certificateScope.limitation");
    expect(vm.certificateScopeRows[2].value).to.deep.equal({type: "text", value: "All steps up to and including final hearing, limited to family help"});
    expect(vm.certificateScopeRows[2].action).to.be.undefined;

    expect(vm.certificateScopeRows[3].key.key).to.equal("pages.case.certificateScope.issueDate");
    expect(vm.certificateScopeRows[3].value).to.deep.equal({type: "text", value: "27 February 2026"});
    expect(vm.certificateScopeRows[3].action).to.be.undefined;

    expect(vm.certificateScopeRows[4].key.key).to.equal("pages.case.certificateScope.status");
    expect(vm.certificateScopeRows[4].value).to.deep.equal({ type:"text", value: { key: "common.discharged", args: { date: "28 February 2026" }}});
    expect(vm.certificateScopeRows[4].action).to.be.undefined;

    expect(vm.certificateScopeRows[5].key.key).to.equal("pages.case.certificateScope.levelOfService");
    expect(vm.certificateScopeRows[5].value).to.deep.equal({type: "text", value: "Full representation"});
    expect(vm.certificateScopeRows[5].action).to.be.undefined;
  });

  it("builds the proceedings rows", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);

    expect(vm.proceedingsRows[0].key.key).to.equal("pages.case.proceedings.careOrder");
    expect(vm.proceedingsRows[0].value).to.deep.equal({ type: "texts", values: [{key: "common.startDate", args: { date: "25 February 2026" }}, "Final hearing completed (PB0057)"] });
    expect(vm.proceedingsRows[0].action).to.be.undefined;

    expect(vm.proceedingsRows[1].key.key).to.equal("pages.case.proceedings.supervisionOrder");
    expect(vm.proceedingsRows[1].value).to.deep.equal({ type: "texts", values: ["12 November 2025", "Withdrawn (PB0142)"] });
    expect(vm.proceedingsRows[1].action).to.be.undefined;
  });
});
