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
    expect(vm.summaryRows[0].actions).to.be.undefined;

    expect(vm.summaryRows[1].key.key).to.equal("pages.claim.summary.dateReceived");
    expect(vm.summaryRows[1].value).to.deep.equal({ type: "text", value: "27 February 2026" });
    expect(vm.summaryRows[1].actions).to.be.undefined;

    expect(vm.summaryRows[2].key.key).to.equal("pages.claim.summary.caseReferenceNumber");
    expect(vm.summaryRows[2].value).to.deep.equal({type: "text", value: "300001820960"});
    expect(vm.summaryRows[2].actions).to.be.undefined;

    expect(vm.summaryRows[3].key.key).to.equal("pages.claim.summary.laaReferenceNumber");
    expect(vm.summaryRows[3].value).to.deep.equal({type: "text", value: "LAA-90d26c"});
    expect(vm.summaryRows[3].actions).to.be.undefined;

    expect(vm.summaryRows[4].key.key).to.equal("pages.claim.summary.assignedTo");
    expect(vm.summaryRows[4].value).to.deep.equal({type: "text", value: "Caseworker name"});
    expect(vm.summaryRows[4].actions).to.be.undefined;

    expect(vm.summaryRows[5].key.key).to.equal("pages.claim.summary.providerRisk");
    expect(vm.summaryRows[5].value).to.deep.equal({type: "text", value: "Low"});
    expect(vm.summaryRows[5].actions?.items[0].href).to.equal("#");
    expect(vm.summaryRows[5].actions?.items[0].text).to.deep.equal({ key: "common.change" });
    expect(vm.summaryRows[5].actions?.items[0].visuallyHiddenText.key).to.equal("pages.claim.summary.providerRisk");

    expect(vm.summaryRows[6].key.key).to.equal("pages.claim.summary.claimTimeStandard");
    expect(vm.summaryRows[6].value).to.deep.equal({ type: "text", value: { key: "common.minutes", args: { "minutes": 15} } });
    expect(vm.summaryRows[6].actions).to.be.undefined;
  });

  it("builds the costs and allocations rows when escaped", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);
    const summaryList = vm.costsAndAllocationsSummaryList;
    const summaryListCard = summaryList.card;
    const rows = summaryList.rows;

    expect(summaryListCard?.title.text).to.deep.equal({ key: "pages.claim.costsAndAllocations.title" });
    expect(summaryListCard?.attributes.id).to.equal("costs-and-allocations");
    expect(summaryListCard?.actions).to.exist;

    expect(summaryList.attributes.id).to.equal("costs-and-allocations-rows");

    expect(rows.length).to.equal(10);
    
    expect(rows[0].key.key).to.equal("pages.claim.costsAndAllocations.claimType");
    expect(rows[0].value).to.deep.equal({type: "text", value: "Solicitor final bill"});
    expect(rows[0].actions).to.be.undefined;

    expect(rows[1].key.key).to.equal("pages.claim.costsAndAllocations.totalClaimAmount");
    expect(rows[1].value).to.deep.equal({ type: "tag", value: "£9,176.36", tag: { text: { key: "pages.claim.feeStatus.escaped"}, classes: "govuk-tag--blue" }});

    expect(rows[2].key.key).to.equal("pages.claim.costsAndAllocations.fixedFeeAmountGranted");
    expect(rows[2].value).to.deep.equal({type: "text", value: "£3,000"});
    expect(rows[2].actions).to.be.undefined;

    expect(rows[3].key.key).to.equal("pages.claim.costsAndAllocations.escapeThreshold");
    expect(rows[3].value).to.deep.equal({type: "text", value: "£6,000"});
    expect(rows[3].actions).to.be.undefined;

    expect(rows[4].key.key).to.equal("pages.claim.costsAndAllocations.assessmentBasis");
    expect(rows[4].value).to.deep.equal({type: "text", value: "Hourly rate, escaped"});
    expect(rows[4].actions).to.be.undefined;

    expect(rows[5].key.key).to.equal("pages.claim.costsAndAllocations.counselCostAndAllocation");
    expect(rows[5].value).to.deep.equal({type: "text", value: "£2,850"});
    expect(rows[5].actions).to.be.undefined;

    expect(rows[6].key.key).to.equal("pages.claim.costsAndAllocations.totalPaymentOnAccount");
    expect(rows[6].value).to.deep.equal({type: "text", value: "£1,200"});
    expect(rows[6].actions).to.be.undefined;

    expect(rows[7].key.key).to.equal("pages.claim.costsAndAllocations.totalPOA");
    expect(rows[7].value).to.deep.equal({type: "text", value: "£1,200"});
    expect(rows[7].actions).to.be.undefined;

    expect(rows[8].key.key).to.equal("pages.claim.costsAndAllocations.priorAuthority");
    expect(rows[8].value).to.deep.equal({ type: "text", value: { key: "common.granted", args: { "amount": "£3,200"} } });
    expect(rows[8].actions).to.be.undefined;

    expect(rows[9].key.key).to.equal("pages.claim.costsAndAllocations.availableCostLimit");
    expect(rows[9].value).to.deep.equal({ type: "text", value: { key: "common.available", args:{ "amount": "£18,500", "available": "£25,000"} } });
    expect(rows[9].actions).to.be.undefined;
  });

  it("builds the costs and allocations rows when fixed", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![1]!;
    const vm = new ClaimViewModel(claim);
    const summaryList = vm.costsAndAllocationsSummaryList;
    const summaryListCard = summaryList.card;
    const rows = summaryList.rows;

    expect(summaryListCard?.title.text).to.deep.equal({ key: "pages.claim.costsAndAllocations.title" });
    expect(summaryListCard?.attributes.id).to.equal("costs-and-allocations");
    expect(summaryListCard?.actions).to.exist;
    expect(summaryListCard?.actions?.items).to.have.length(1);
    expect(summaryListCard?.actions?.items[0].href).to.equal("#");
    expect(summaryListCard?.actions?.items[0].text).to.deep.equal({ key: "pages.claim.costsAndAllocations.action" });
    expect(summaryListCard?.actions?.items[0].visuallyHiddenText).to.deep.equal({ key: "pages.claim.costsAndAllocations.title" });

    expect(summaryList.attributes.id).to.equal("costs-and-allocations-rows");

    expect(rows.length).to.equal(5);
    
    expect(rows[0].key.key).to.equal("pages.claim.costsAndAllocations.claimType");
    expect(rows[0].value).to.deep.equal({type: "text", value: "Solicitor final bill"});
    expect(rows[0].actions).to.be.undefined;

    expect(rows[1].key.key).to.equal("pages.claim.costsAndAllocations.totalClaimAmount");
    expect(rows[1].value).to.deep.equal({ type: "text", value: "£3,480"});

    expect(rows[2].key.key).to.equal("pages.claim.costsAndAllocations.assessmentBasis");
    expect(rows[2].value).to.deep.equal({type: "text", value: "Fixed fee applies"});
    expect(rows[2].actions).to.be.undefined;

    expect(rows[3].key.key).to.equal("pages.claim.costsAndAllocations.counselCostAndAllocation");
    expect(rows[3].value).to.deep.equal({type: "text", value: "£900"});
    expect(rows[3].actions).to.be.undefined;

    expect(rows[4].key.key).to.equal("pages.claim.costsAndAllocations.availableCostLimit");
    expect(rows[4].value).to.deep.equal({ type: "text", value: { key: "common.available", args:{ "amount": "£24,100", "available": "£25,000"} } });
    expect(rows[4].actions).to.be.undefined;
  });

  it("builds the provider rows when counsel payment is defined", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);
    const summaryList = vm.providersSummaryList;
    const summaryListCard = summaryList.card;
    const rows = summaryList.rows;

    expect(summaryListCard?.title.text).to.deep.equal({ key: "pages.claim.providers.title" });
    expect(summaryListCard?.attributes.id).to.equal("providers");
    expect(summaryListCard?.actions).to.not.exist;

    expect(summaryList.attributes.id).to.equal("providers-rows");

    expect(rows.length).to.equal(5);

    expect(rows[0].key.key).to.equal("pages.claim.providers.solicitorName");
    expect(rows[0].value).to.deep.equal({type: "text", value: "Smith & Co Solicitors"});
    expect(rows[0].actions).to.be.undefined;

    expect(rows[1].key.key).to.equal("pages.claim.providers.solicitorRegion");
    expect(rows[1].value).to.deep.equal({type: "text", value: "North West"});
    expect(rows[1].actions).to.be.undefined;

    expect(rows[2].key.key).to.equal("pages.claim.providers.numberOfSolicitors");
    expect(rows[2].value).to.deep.equal({type: "text", value: "1"});
    expect(rows[2].actions).to.be.undefined;

    expect(rows[3].key.key).to.equal("pages.claim.providers.counselInvolved");
    expect(rows[3].value).to.deep.equal({type: "text", value: { key: "common.yes" }});
    expect(rows[3].actions).to.be.undefined;

    expect(rows[4].key.key).to.equal("pages.claim.providers.counselPayment");
    expect(rows[4].value).to.deep.equal({type: "text", value: "Paid and reconciled"});
    expect(rows[4].actions).to.be.undefined;
  });

  it("builds the provider rows when counsel payment is undefined", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![1]!;
    const vm = new ClaimViewModel(claim);
    const summaryList = vm.providersSummaryList;
    const summaryListCard = summaryList.card;
    const rows = summaryList.rows;

    expect(summaryListCard?.title.text).to.deep.equal({ key: "pages.claim.providers.title" });
    expect(summaryListCard?.attributes.id).to.equal("providers");
    expect(summaryListCard?.actions).to.not.exist;

    expect(summaryList.attributes.id).to.equal("providers-rows");

    expect(rows.length).to.equal(4);

    expect(rows[0].key.key).to.equal("pages.claim.providers.solicitorName");
    expect(rows[0].value).to.deep.equal({type: "text", value: "Smith & Co Solicitors"});
    expect(rows[0].actions).to.be.undefined;

    expect(rows[1].key.key).to.equal("pages.claim.providers.solicitorRegion");
    expect(rows[1].value).to.deep.equal({type: "text", value: "North West"});
    expect(rows[1].actions).to.be.undefined;

    expect(rows[2].key.key).to.equal("pages.claim.providers.numberOfSolicitors");
    expect(rows[2].value).to.deep.equal({type: "text", value: "1"});
    expect(rows[2].actions).to.be.undefined;

    expect(rows[3].key.key).to.equal("pages.claim.providers.counselInvolved");
    expect(rows[3].value).to.deep.equal({type: "text", value: { key: "common.no" }});
    expect(rows[3].actions).to.be.undefined;
  });

  it("builds the client rows", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);
    const summaryList = vm.clientSummaryList;
    const summaryListCard = summaryList.card;
    const rows = summaryList.rows;

    expect(summaryListCard?.title.text).to.deep.equal({ key: "pages.claim.client.title" });
    expect(summaryListCard?.attributes.id).to.equal("client");
    expect(summaryListCard?.actions).to.not.exist;

    expect(summaryList.attributes.id).to.equal("client-rows");

    expect(rows.length).to.equal(4);

    expect(rows[0].key.key).to.equal("pages.claim.client.name");
    expect(rows[0].value).to.deep.equal({type: "text", value: "Liam Oldfield"});
    expect(rows[0].actions).to.be.undefined;

    expect(rows[1].key.key).to.equal("pages.claim.client.dateOfBirth");
    expect(rows[1].value).to.deep.equal({type: "text", value: "27 March 1996"});
    expect(rows[1].actions).to.be.undefined;

    expect(rows[2].key.key).to.equal("pages.claim.client.location");
    expect(rows[2].value).to.deep.equal({type: "text", value: "Manchester"});
    expect(rows[2].actions).to.be.undefined;

    expect(rows[3].key.key).to.equal("pages.claim.client.status");
    expect(rows[3].value).to.deep.equal({type: "text", value: "Parent"});
    expect(rows[3].actions).to.be.undefined;
  });

  it("builds the case rows", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);
    const summaryList = vm.caseSummaryList;
    const summaryListCard = summaryList.card;
    const rows = summaryList.rows;

    expect(summaryListCard?.title.text).to.deep.equal({ key: "pages.case.summary.title" });
    expect(summaryListCard?.attributes.id).to.equal("case");
    expect(summaryListCard?.actions).to.not.exist;

    expect(summaryList.attributes.id).to.equal("case-rows");

    expect(rows.length).to.equal(4);

    expect(rows[0].key.key).to.equal("pages.case.summary.matterType");
    expect(rows[0].value).to.deep.equal({type: "text", value: "Special Children Act"});
    expect(rows[0].actions).to.be.undefined;

    expect(rows[1].key.key).to.equal("pages.case.summary.leadProceeding");
    expect(rows[1].value).to.deep.equal({type: "text", value: "Care order"});
    expect(rows[1].actions).to.be.undefined;

    expect(rows[2].key.key).to.equal("pages.case.summary.linkedCases");
    expect(rows[2].value).to.deep.equal({ type: "link", value: { text: "1 linked case", href: "#" }});
    expect(rows[2].actions).to.be.undefined;

    expect(rows[3].key.key).to.equal("pages.case.summary.outcome");
    expect(rows[3].value).to.deep.equal({type: "text", value: "Final hearing completed"});
    expect(rows[3].actions).to.be.undefined;
  });

  it("builds the certificate scope rows", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);
    const summaryList = vm.certificateScopeSummaryList;
    const summaryListCard = summaryList.card;
    const rows = summaryList.rows;

    expect(summaryListCard?.title.text).to.deep.equal({ key: "pages.case.certificateScope.title" });
    expect(summaryListCard?.attributes.id).to.equal("certificate");
    expect(summaryListCard?.actions).to.not.exist;

    expect(summaryList.attributes.id).to.equal("certificate-rows");

    expect(rows.length).to.equal(6);

    expect(rows[0].key.key).to.equal("pages.case.certificateScope.type");
    expect(rows[0].value).to.deep.equal({type: "text", value: "Substantive Certificate"});
    expect(rows[0].actions).to.be.undefined;

    expect(rows[1].key.key).to.equal("pages.case.certificateScope.description");
    expect(rows[1].value).to.deep.equal({type: "text", value: "To be represented on an application for Care Order"});
    expect(rows[1].actions).to.be.undefined;

    expect(rows[2].key.key).to.equal("pages.case.certificateScope.limitation");
    expect(rows[2].value).to.deep.equal({type: "text", value: "All steps up to and including final hearing, limited to family help"});
    expect(rows[2].actions).to.be.undefined;

    expect(rows[3].key.key).to.equal("pages.case.certificateScope.issueDate");
    expect(rows[3].value).to.deep.equal({type: "text", value: "27 February 2026"});
    expect(rows[3].actions).to.be.undefined;

    expect(rows[4].key.key).to.equal("pages.case.certificateScope.status");
    expect(rows[4].value).to.deep.equal({ type:"text", value: { key: "common.discharged", args: { date: "28 February 2026" }}});
    expect(rows[4].actions).to.be.undefined;

    expect(rows[5].key.key).to.equal("pages.case.certificateScope.levelOfService");
    expect(rows[5].value).to.deep.equal({type: "text", value: "Full representation"});
    expect(rows[5].actions).to.be.undefined;
  });

  it("builds the proceedings rows", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);
    const summaryList = vm.proceedingsSummaryList;
    const summaryListCard = summaryList.card;
    const rows = summaryList.rows;

    expect(summaryListCard?.title.text).to.deep.equal({ key: "pages.case.proceedings.title" });
    expect(summaryListCard?.attributes.id).to.equal("proceedings");
    expect(summaryListCard?.actions).to.not.exist;

    expect(summaryList.attributes.id).to.equal("proceedings-rows");

    expect(rows.length).to.equal(2);

    expect(rows[0].key.key).to.equal("pages.case.proceedings.careOrder");
    expect(rows[0].value).to.deep.equal({ type: "texts", values: [{key: "common.startDate", args: { date: "25 February 2026" }}, "Final hearing completed (PB0057)"] });
    expect(rows[0].actions).to.be.undefined;

    expect(rows[1].key.key).to.equal("pages.case.proceedings.supervisionOrder");
    expect(rows[1].value).to.deep.equal({ type: "texts", values: ["12 November 2025", "Withdrawn (PB0142)"] });
    expect(rows[1].actions).to.be.undefined;
  });
});
