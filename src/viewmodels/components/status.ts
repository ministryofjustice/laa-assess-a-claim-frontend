import { AssignmentStatus } from "#src/models/assignmentStatus.js";

export const AssignmentStatusTagClass: Record<AssignmentStatus, string> = {
  [AssignmentStatus.InProgress]: "govuk-tag--purple",
  [AssignmentStatus.NotAssigned]: "govuk-tag--grey",
};
