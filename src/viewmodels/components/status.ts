import { AssignmentStatus } from "#src/models/assignmentStatus.js";
import { FeeStatus } from "#src/models/feeStatus.js";

export const AssignmentStatusTagClass: Record<AssignmentStatus, string> = {
  [AssignmentStatus.InProgress]: "govuk-tag--purple",
  [AssignmentStatus.NotAssigned]: "govuk-tag--grey",
};

export const FeeStatusTagClass: Record<FeeStatus, string> = {
  [FeeStatus.Fixed]: "govuk-tag--blue",
  [FeeStatus.Escaped]: "govuk-tag--blue",
};
