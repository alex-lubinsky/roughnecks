import { SET_PCSUBCLASSES, ADD_PCSUBCLASS, PCSUBCLASSES_LOADING} from '../actions/actionvariables';

const pcSubclassesReducerDefaultState={data: [], isLoading: false};

export default (state = pcSubclassesReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_PCSUBCLASS:
      return Object.assign({}, state, {data: [...state.data, action.pcSubclass]});
    case SET_PCSUBCLASSES:
      return Object.assign({}, state, {isLoading: false, data: action.pcSubclass});
    case PCSUBCLASSES_LOADING:
      return Object.assign({}, state, {isLoading: true});
    default:
      return state;
  };
};
