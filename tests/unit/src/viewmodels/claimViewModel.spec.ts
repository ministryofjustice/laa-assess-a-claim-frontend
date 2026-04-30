import { ClaimViewModel } from "#src/viewmodels/claimViewModel.js";
import type { Claim } from "#src/types/Claim.js";
import { getClaimsSuccessResponseData } from "#tests/assets/getClaimsResponseData.js";
import { expect } from "chai";
import { formatClaimId, formatDate, formatClaimed } from "#src/helpers/index.js";

describe("ClaimViewModel constructor()", () => {
  it("builds the title, back link and summary rows", () => {
    const claim: Claim = getClaimsSuccessResponseData.body!.data![0]!;
    const vm = new ClaimViewModel(claim);

    expect(vm.title).to.equal("Fixed fee: Special Children Act (Care)");
    expect(vm.backLink).to.equal("/");

    expect(vm.summary[0].key.message?.key).to.equal("pages.claim.summary.totalClaimAmount");
    expect(vm.summary[0].value.text).to.equal("£3,480.00");
    expect(vm.summary[0].action).to.be.undefined;

    expect(vm.summary[1].key.message?.key).to.equal("pages.claim.summary.dateReceived");
    expect(vm.summary[1].value.text).to.equal("27 February 2026");
    expect(vm.summary[1].action).to.be.undefined;

    expect(vm.summary[2].key.message?.key).to.equal("pages.claim.summary.caseReferenceNumber");
    expect(vm.summary[2].value.text).to.equal("300001820960");
    expect(vm.summary[2].action).to.be.undefined;

    expect(vm.summary[3].key.message?.key).to.equal("pages.claim.summary.laaReferenceNumber");
    expect(vm.summary[3].value.text).to.equal("LAA-90d26c");
    expect(vm.summary[3].action).to.be.undefined;

    expect(vm.summary[4].key.message?.key).to.equal("pages.claim.summary.assignedTo");
    expect(vm.summary[4].value.text).to.equal("Caseworker name");
    expect(vm.summary[4].action).to.be.undefined;

    expect(vm.summary[5].key.message?.key).to.equal("pages.claim.summary.providerRisk");
    expect(vm.summary[5].value.text).to.equal("Low");
    expect(vm.summary[5].action?.href).to.equal("#");

    expect(vm.summary[6].key.message?.key).to.equal("pages.claim.summary.claimTimeStandard");
    expect(vm.summary[6].value.message?.key).to.equal("common.minutes");
    expect(vm.summary[6].value.message?.args).to.deep.equal({ "minutes": 15});
    expect(vm.summary[6].action).to.be.undefined;

    const byKey = Object.fromEntries(
      vm.rows.map(r => [r.key.text, r.value.text ?? r.value.html])
    );

    expect(byKey["Claim ID"]).to.equal(String(claim.id));
    if (claim.client) expect(byKey["Client"]).to.equal(claim.client);
    if (claim.category) expect(byKey["Category"]).to.equal(claim.category);
    if (claim.concluded) expect(byKey["Concluded"]).to.equal(formatDate(claim.concluded));
    if (claim.feeType) expect(byKey["Fee type"]).to.equal(claim.feeType);
    if (claim.claimed != null) expect(byKey["Claimed"]).to.equal(formatClaimed(claim.claimed));

    // Optional: Submission row is a link (if present)
    if (claim.submissionId && byKey["Submission"]) {
      expect(byKey["Submission"]).to.contain(`/submissions/${encodeURIComponent(claim.submissionId)}`);
    }
  });
});
