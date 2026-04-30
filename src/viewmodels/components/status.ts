export enum Status {
  InProgress = 'inProgress',
  NotAssigned = 'notAssigned',
}

export const StatusTagClass: Record<Status, string> = {
  [Status.InProgress]: 'govuk-tag--purple',
  [Status.NotAssigned]: 'govuk-tag--grey',
};

