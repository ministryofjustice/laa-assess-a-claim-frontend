import { Claim } from "#src/types/Claim.js";
import { ClaimViewModel } from "#src/viewmodels/claimViewModel.js";
import { getClaimsSuccessResponseData } from "#tests/assets/getClaimsResponseData.js";
import { config as chaiConfig, expect } from "chai";
import { CheerioAPI, load } from "cheerio";

// Show full strings in diffs if something fails
chaiConfig.truncateThreshold = 0;

describe("views/main/claims/view.njk", () => {
  let $: CheerioAPI;

  const claim: Claim = getClaimsSuccessResponseData.body?.data![0]!;

  const viewModel = new ClaimViewModel(claim);

  beforeEach(async () => {
    // Import the JS helper at runtime to avoid TS/ESLint project faff
    const { setupNunjucksForGovUk } = await import(
      "../../../../support/nunjucks-govuk.js"
    );
    const env = setupNunjucksForGovUk();

    const html = env.render("main/claims/view.njk", { vm: viewModel });
    $ = load(html);
  });

  it("renders the title in the main H1", () => {
    const h1 = $("h1.govuk-heading-xl");
    expect(h1).to.have.length(1);
    expect(h1.text().trim()).to.equal(viewModel.title);
  });

  it("renders a Back link to the list", () => {
    const back = $("a.govuk-back-link");
    expect(back).to.have.length(1);
    expect(back.attr("href")).to.equal(viewModel.backLink ?? "/claims");
  });

  it("renders an assignment status tag", () => {
    const tag = $(`.govuk-tag.${viewModel.assignmentStatusTagClass}`);
    expect(tag).to.have.length(1);
    expect(tag.text().trim()).to.equal(viewModel.assignmentStatusText.key);
  });

  it("renders a summary list", () => {
    const sl = $("#summary");
    expect(sl).to.have.length(1);
  });

  it("shows expected summary list rows", () => {
    const rows = $("#summary p");
    expect(rows).to.have.length(7);

    function assertSummaryRow(row: any, expected: any) {
      const { key, value, action } = expected;

      expect(row.find("strong").text()).to.equal(`${key}:`);
      expect(row.text()).to.contain(value);

      const link = row.find("a.govuk-link");

      if (action) {
        expect(link).to.have.length(1);
        expect(link.text().trim()).to.contain("common.change");
        expect(link.text().trim()).to.contain(key);
        expect(link.attr("href")).to.equal(action);
      } else {
        expect(link).to.have.length(0);
      }
    }

    assertSummaryRow(rows.eq(0), {
      key: "pages.claim.summary.totalClaimAmount",
      value: "£3,480",
    });

    assertSummaryRow(rows.eq(1), {
      key: "pages.claim.summary.dateReceived",
      value: "27 February 2026",
    });

    assertSummaryRow(rows.eq(2), {
      key: "pages.claim.summary.caseReferenceNumber",
      value: "300001820960",
    });

    assertSummaryRow(rows.eq(3), {
      key: "pages.claim.summary.laaReferenceNumber",
      value: "LAA-90d26c",
    });

    assertSummaryRow(rows.eq(4), {
      key: "pages.claim.summary.assignedTo",
      value: "Caseworker name",
    });

    assertSummaryRow(rows.eq(5), {
      key: "pages.claim.summary.providerRisk",
      value: "Low",
      action: "#",
    });

    assertSummaryRow(rows.eq(6), {
      key: "pages.claim.summary.claimTimeStandard",
      value: "common.minutes",
    });
  });

  it("renders a sub-navigation", () => {
    const sn = $(".moj-sub-navigation");
    expect(sn).to.have.length(1);
  });

  it("renders a costs and allocations summary list", () => {
    const sl = $("#costs-and-allocations");
    expect(sl).to.have.length(1);
  });

  it("shows expected costs and allocations summary list rows", () => {
    const rows = $("#costs-and-allocations-rows .govuk-summary-list__row");
    expect(rows).to.have.length(10);

    assertSummaryRow(rows.eq(0), {
      key: "pages.claim.costsAndAllocations.claimType",
      value: "Solicitor final bill",
    });

    const totalClaimAmountRow = rows.eq(1);
    assertSummaryRow(totalClaimAmountRow, {
      key: "pages.claim.costsAndAllocations.totalClaimAmount",
      value: "£9,176.36 pages.claim.feeStatus.escaped",
    });
    const totalClaimAmountRightValue = totalClaimAmountRow.find(".govuk-summary-list__value .govuk-summary-list__value-split-right");
    expect(totalClaimAmountRightValue).to.have.length(1);
    expect(totalClaimAmountRightValue.find(`.govuk-tag.${viewModel.feeStatusTagClass}`).text().trim()).to.equal(viewModel.feeStatusText.key);

    assertSummaryRow(rows.eq(2), {
      key: "pages.claim.costsAndAllocations.fixedFeeAmountGranted",
      value: "£3,000",
    });

    assertSummaryRow(rows.eq(3), {
      key: "pages.claim.costsAndAllocations.escapeThreshold",
      value: "£6,000",
    });

    assertSummaryRow(rows.eq(4), {
      key: "pages.claim.costsAndAllocations.assessmentBasis",
      value: "Hourly rate, escaped",
    });

    assertSummaryRow(rows.eq(5), {
      key: "pages.claim.costsAndAllocations.counselCostAndAllocation",
      value: "£2,850",
    });

    assertSummaryRow(rows.eq(6), {
      key: "pages.claim.costsAndAllocations.totalPaymentOnAccount",
      value: "£1,200",
    });

    assertSummaryRow(rows.eq(7), {
      key: "pages.claim.costsAndAllocations.totalPOA",
      value: "£1,200",
    });

    assertSummaryRow(rows.eq(8), {
      key: "pages.claim.costsAndAllocations.priorAuthority",
      value: "common.granted",
    });

    assertSummaryRow(rows.eq(9), {
      key: "pages.claim.costsAndAllocations.availableCostLimit",
      value: "common.available",
    });
  });

  it("renders a providers summary list", () => {
    const sl = $("#providers");
    expect(sl).to.have.length(1);

  });

  it("shows expected provider summary list rows", () => {
    const rows = $("#providers-rows").children();
    expect(rows).to.have.length(5);

    assertSummaryRow(rows.eq(0), {
      key: "pages.claim.providers.solicitorName",
      value: "Smith & Co Solicitors",
    });

    assertSummaryRow(rows.eq(1), {
      key: "pages.claim.providers.solicitorRegion",
      value: "North West",
    });

    assertSummaryRow(rows.eq(2), {
      key: "pages.claim.providers.numberOfSolicitors",
      value: "1",
    });

    assertSummaryRow(rows.eq(3), {
      key: "pages.claim.providers.counselInvolved",
      value: "Yes",
    });

     assertSummaryRow(rows.eq(4), {
      key: "pages.claim.providers.counselPayment",
      value: "Paid and reconciled",
    });
  });

  it("renders a client summary list", () => {
    const sl = $("#client");
    expect(sl).to.have.length(1);
  });

  it("shows expected Client summary list rows", () => {
    const rows = $("#client-rows").children();
    expect(rows).to.have.length(4);

    assertSummaryRow(rows.eq(0), {
      key: "pages.claim.client.name",
      value: "Liam Oldfield",
    });

    assertSummaryRow(rows.eq(1), {
      key: "pages.claim.client.dateOfBirth",
      value: "27 March 1996",
    });

    assertSummaryRow(rows.eq(2), {
      key: "pages.claim.client.location",
      value: "Manchester",
    });

    assertSummaryRow(rows.eq(3), {
      key: "pages.claim.client.status",
      value: "Parent",
    });
  });

  it("renders an assignment link button", () => {
    const button = $("#assignment");
    expect(button).to.have.length(1);
    expect(button.text().trim()).to.equal("pages.claim.assignment.remove");
  });

  it("Assess button links to Assess page", () => {
    const edit = $(".govuk-button-group .govuk-button").first();
    expect(edit.text().trim()).to.equal("pages.claim.button.access");
    expect(edit.attr("href")).to.equal(
      `/claim/${encodeURIComponent(String(claim.id))}/assess`,
    );
  });

  it("Secondary button links back to claims", () => {
    const btns = $(".govuk-button-group .govuk-button");
    const secondary = btns.eq(1);
    expect(secondary.text().trim()).to.equal("pages.claim.button.requestProvider");
    expect(secondary.hasClass("govuk-button--secondary")).to.equal(true);
    expect(secondary.attr("href")).to.equal("#");
  });

  it("has the navigation links", () => {
    const link1 = $("#nav-links > li:nth-child(1) > a")
    expect(link1.text().trim()).to.equal("pages.claim.subNavigation.reviewAndAssess");
    expect(link1.hasClass("govuk-link")).to.equal(true);
    expect(link1.attr("href")).to.equal("#");

    const link2 = $("#nav-links > li:nth-child(2) > a")
    expect(link2.text().trim()).to.equal("pages.claim.subNavigation.claimHistory");
    expect(link2.hasClass("govuk-link")).to.equal(true);
    expect(link2.attr("href")).to.equal("#");

    const link3 = $("#nav-links > li:nth-child(3) > a")
    expect(link3.text().trim()).to.equal("pages.claim.subNavigation.allEvidence");
    expect(link3.hasClass("govuk-link")).to.equal(true);
    expect(link3.attr("href")).to.equal("#");
  })

  function assertSummaryRow(row: any, expected: any) {
    const { key, value } = expected;
    expect(row.find(".govuk-summary-list__key").text().trim()).to.equal(key);
    expect(row.find(".govuk-summary-list__value").text().trim().replace(/\s+/g, " ")).to.equal(value);
  }
});
