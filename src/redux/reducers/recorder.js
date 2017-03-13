import * as Config from '../../config';

export const ACTIONS = {
  ADD_RECORD: `${Config.Namespace}/recorder/ADD_RECORD`,
  DELETE_RECORD: `${Config.Namespace}/recorder/DELETE_RECORD`,
};

const initialState = {
  records: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIONS.ADD_RECORD:
      return {
        ...state,
        records: [...state.records, action.record],
      };
    case ACTIONS.DELETE_RECORD:
      return {
        ...state,
        records: state.records.filter(record => record !== action.record),
      };
    default:
      return state;
  }
}

export function addRecord(record) {
  return {
    type: ACTIONS.ADD_RECORD,
    record
  };
}

export function deleteRecord(record) {
  return {
    type: ACTIONS.DELETE_RECORD,
    record
  };
}
