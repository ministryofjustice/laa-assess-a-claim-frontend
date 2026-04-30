export enum Status {
  InProgress = 'In progress',
  NotAssigned = 'Not assigned',
}

export const StatusTagClass: Record<Status, string> = {
  [Status.InProgress]: 'govuk-tag--purple',
  [Status.NotAssigned]: 'govuk-tag--red',
};

