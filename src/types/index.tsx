import { APP_STATUS } from "@/constants";

export type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];
