//App status CONST
export const APP_STATUS = {
  IDLE: "idle",
  ERROR: "error",
  UPLOADING: "uploading",
  READY_UPLOAD: "ready_upload",
  READY_USAGE: "ready_usage",
} as const;

//Text dicctionary for changing text on the uploading button
export const UPLOADING_BUTTON_TEXT = {
  [APP_STATUS.READY_UPLOAD]: "Upload file",
  [APP_STATUS.UPLOADING]: "Uploading...",
} as const;
