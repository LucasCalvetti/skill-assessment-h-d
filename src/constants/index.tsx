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

//API url vercel
export const API_URL = "https://www.postb.in/1722475618549-5473569461610";

//Fake APIs
export const BEGIN_UPLOAD_API = "https://example.com/begin-upload";
export const SUCCESS_UPLOAD_API = "https://example.com/success-upload";
export const FAILURE_UPLOAD_API = "https://example.com/failure-upload";
