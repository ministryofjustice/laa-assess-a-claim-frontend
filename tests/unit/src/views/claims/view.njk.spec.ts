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

  it("renders a status tag", () => {
    const tag = $(`.govuk-tag.${viewModel.statusTagClass}`);
    expect(tag).to.have.length(1);
    expect(tag.text().trim()).to.equal(viewModel.statusText);
  });

  it("renders a summary list", () => {
    const sl = $("#summary");
    expect(sl).to.have.length(1);
  });

  it("shows expected summary list rows (keys)", () => {
    const rows = $("#summary p");
    expect(rows).to.have.length(7);

    function assertSummaryRow(row: any, expected: any) {
      const { key, value, action } = expected;

      expect(row.find("strong").text()).to.equal(key);
      expect(row.text()).to.contain(value);

      const link = row.find("a.govuk-link");

      if (action) {
        expect(link).to.have.length(1);
        expect(link.text().trim()).to.equal("Change");
        expect(link.attr("href")).to.equal(action);
      } else {
        expect(link).to.have.length(0);
      }
    }

    assertSummaryRow(rows.eq(0), {
      key: "Total claim amount:",
      value: "£3,480",
    });

    assertSummaryRow(rows.eq(1), {
      key: "Date received:",
      value: "27 February 2026",
    });

    assertSummaryRow(rows.eq(2), {
      key: "Case reference number:",
      value: "300001820960",
    });

    assertSummaryRow(rows.eq(3), {
      key: "LAA reference number:",
      value: "LAA-90d26c",
    });

    assertSummaryRow(rows.eq(4), {
      key: "Assigned to:",
      value: "Caseworker name",
    });

    assertSummaryRow(rows.eq(5), {
      key: "Provider risk:",
      value: "Low",
      action: "#",
    });

    assertSummaryRow(rows.eq(6), {
      key: "Claim time standard:",
      value: "15 minutes",
    });
  });

  it("renders a GOV.UK summary list", () => {
    const sl = $(".govuk-summary-list");
    expect(sl).to.have.length(1);
  });

  it("renders an assignment link button", () => {
    const sl = $("#assignment");
    expect(sl).to.have.length(1);
  });

  it("shows expected GOV.UK summary list rows (keys)", () => {
    const keys = $(".govuk-summary-list__key")
      .map((_, el) => $(el).text().trim())
      .get();
    expect(keys).to.include.members([
      "Claim ID",
      "Client",
      "Category",
      "Concluded",
      "Fee type",
      "Claimed",
    ]);
  });

  it("shows Claim ID value", () => {
    const row = $(".govuk-summary-list__row")
      .filter(
        (_, r) =>
          $(r).find(".govuk-summary-list__key").text().trim() === "Claim ID",
      )
      .first();
    expect(row.find(".govuk-summary-list__value").text().trim()).to.equal(
      String(claim.id),
    );
  });

  it("Edit button links to edit page", () => {
    const edit = $(".govuk-button-group .govuk-button").first();
    expect(edit.text().trim()).to.match(/^Assess claim$/);
    expect(edit.attr("href")).to.equal(
      `/claim/${encodeURIComponent(String(claim.id))}/assess`,
    );
  });

  it("Secondary button links back to claims", () => {
    const btns = $(".govuk-button-group .govuk-button");
    const secondary = btns.eq(1);
    expect(secondary.hasClass("govuk-button--secondary")).to.equal(true);
    expect(secondary.attr("href")).to.equal("/");
  });
});
