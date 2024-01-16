import {
  GET_TEAMMATES,
  INVITE_TEAMMATES,
  UPDATE_TEAMMATES,
  DELETE_TEAMMATES,
  API_ERROR,
} from "store/teammates/constants";

export const getTeammates = (data: any) => {
  return {
    type: GET_TEAMMATES.REQUEST,
    payload: { data },
  };
};

export const getTeammatesSuccess = (response: any) => {
  return {
    type: GET_TEAMMATES.SUCCESS,
    payload: response,
  };
};

export const inviteTeammate = (data: any, callback?: any) => {
  return {
    type: INVITE_TEAMMATES.REQUEST,
    payload: { data, callback },
  };
};

export const inviteTeammateSuccess = (data: any, callback?: any) => {
  return {
    type: INVITE_TEAMMATES.SUCCESS,
    payload: { data, callback },
  };
};

export const updateTeammate = (data: any, callback?: any) => {
  return {
    type: UPDATE_TEAMMATES.REQUEST,
    payload: { data, callback },
  };
};

export const updateTeammateSuccess = (data: any, callback?: any) => {
  return {
    type: UPDATE_TEAMMATES.SUCCESS,
    payload: { data, callback },
  };
};

export const deleteTeammate = (id: string, callback?: any) => {
  return {
    type: DELETE_TEAMMATES.REQUEST,
    payload: { id, callback },
  };
};

export const deleteTeammateSuccess = (response: any) => {
  return {
    type: DELETE_TEAMMATES.SUCCESS,
    payload: response,
  };
};

export const getTeammatesApiError = (error: any) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
