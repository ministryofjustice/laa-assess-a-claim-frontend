import { expect } from "chai";
import { ClaimResponseSchema } from "#src/types/Claim.js";
import { UUID } from "uuidv7";
import { ZodError } from 'zod';

describe("ClaimResponseSchema", () => {
  describe("id", () => {
    it("parses a valid uuid7", () => {
      const id = UUID.parse("019f5b96-5560-746f-905b-955ff5cb199b");
      const result = ClaimResponseSchema.parse({
        id: id.toString(),
        escaped: true,
      });

      expect(result.id).to.deep.equal(id.toString());
    });

    it("fails to parse a uuid4 ", () => {
      const id = UUID.parse("a8daf4c7-776a-41a4-9247-b6f3d2a13daf");
      const result = () => ClaimResponseSchema.parse({
        id: id.toString(),
        escaped: true,
      });

      expect(result).to.throw(ZodError);
    });
  });

  describe("counselPayment", () => {
    const id = UUID.parse("019f5b96-5560-746f-905b-955ff5cb199b");

    it("parses a string value", () => {
      const result = ClaimResponseSchema.parse({
        id: id.toString(),
        escaped: true,
        counselPayment: "PAID",
      });

      expect(result.counselPayment).to.equal("PAID");
    });

    it("parses undefined", () => {
      const result = ClaimResponseSchema.parse({
        id: id.toString(),
        escaped: true,
        counselPayment: undefined,
      });

      expect(result.counselPayment).to.be.undefined;
    });

    it("parses null", () => {
      const result = ClaimResponseSchema.parse({
        id: id.toString(),
        escaped: true,
        counselPayment: null,
      });

      expect(result.counselPayment).to.be.null;
    });

    it("parses missing field as undefined", () => {
      const result = ClaimResponseSchema.parse({
        id: id.toString(),
        escaped: true,
      });

      expect(result.counselPayment).to.be.undefined;
    });
  });

  describe("concluded", () => {
    const id = UUID.parse("019f5b96-5560-746f-905b-955ff5cb199b");

    it("parses a valid date string", () => {
      const result = ClaimResponseSchema.parse({
        id: id.toString(),
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
        id: id.toString(),
        escaped: false,
        concluded: undefined,
      });

      expect(result.concluded).to.be.undefined;
    });

    it("parses null as undefined", () => {
      const result = ClaimResponseSchema.parse({
        id: id.toString(),
        escaped: false,
        concluded: null,
      });

      expect(result.concluded).to.be.undefined;
    });

    it("parses missing field as undefined", () => {
      const result = ClaimResponseSchema.parse({
        id: id.toString(),
        escaped: false,
      });

      expect(result.concluded).to.be.undefined;
    });
  });
});