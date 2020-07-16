import { SET_SUBCLASSES, SUBCLASSES_LOADING} from '../actions/actionvariables';

const subclassesReducerDefaultState={data: [], isLoading: false};

export default (state = subclassesReducerDefaultState, action) => {
  switch (action.type) {
    case SET_SUBCLASSES:
      return Object.assign({}, state, {isLoading: false, data: action.subclasses});
    case SUBCLASSES_LOADING:
      return Object.assign({}, state, {isLoading: true});
    default:
      return state;
  };
};