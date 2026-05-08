import { expect } from "chai";
import { ClaimResponseSchema } from "#src/types/Claim.js";

describe("ClaimResponseSchema", () => {
  describe("counselPayment", () => {
    it("parses a string value", () => {
      const result = ClaimResponseSchema.parse({
        id: 1,
        escaped: true,
        counselPayment: "PAID",
      });

      expect(result.counselPayment).to.equal("PAID");
    });

    it("parses undefined", () => {
      const result = ClaimResponseSchema.parse({
        id: 1,
        escaped: true,
        counselPayment: undefined,
      });

      expect(result.counselPayment).to.be.undefined;
    });

    it("parses null", () => {
      const result = ClaimResponseSchema.parse({
        id: 1,
        escaped: true,
        counselPayment: null,
      });

      expect(result.counselPayment).to.be.null;
    });

    it("parses missing field as undefined", () => {
      const result = ClaimResponseSchema.parse({
        id: 1,
        escaped: true,
      });

      expect(result.counselPayment).to.be.undefined;
    });
  });

  describe("concluded", () => {
    it("parses a valid date string", () => {
      const result = ClaimResponseSchema.parse({
        id: 1,
        escaped: false,
        concluded: "2026-05-07T10:00:00.000Z",
      });

      expect(result.concluded).to.be.instanceof(Date);
      expect(result.concluded?.toISOString()).to.equal(
        "2026-05-07T10:00:00.000Z",
      );
    });

    it("parses undefined", () => {
      const result = ClaimResponseSchema.parse({
        id: 1,
        escaped: false,
        concluded: undefined,
      });

      expect(result.concluded).to.be.undefined;
    });

    it("parses null as undefined", () => {
      const result = ClaimResponseSchema.parse({
        id: 1,
        escaped: false,
        concluded: null,
      });

      expect(result.concluded).to.be.undefined;
    });

    it("parses missing field as undefined", () => {
      const result = ClaimResponseSchema.parse({
        id: 1,
        escaped: false,
      });

      expect(result.concluded).to.be.undefined;
    });
  });
});