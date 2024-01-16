import { generateActions } from "helpers/generateActions";

export const GET_SHIPMENTS = generateActions("GET_SHIPMENTS");
export const GET_SHIPMENTS_BY_ID = generateActions("GET_SHIPMENTS_BY_ID");

export const GET_CONTAINERS = generateActions("GET_CONTAINERS");
export const GET_CONTAINER_BY_ID = generateActions("GET_CONTAINER_BY_ID");

// export const UPLOAD_SHIPMENT_DOC = generateActions("UPLOAD_SHIPMENT_DOC");
export const GET_CONTAINER_BY_JOBNUMBER = generateActions("GET_CONTAINER_BY_JOBNUMBER");

export const GET_PUBLIC_SHIPMENT_BY_ID = generateActions(
  "GET_PUBLIC_SHIPMENT_BY_ID"
);

export const API_ERROR = "API_ERROR";
