
const initialState = {
  isPinging: true,
  init: false,
  monitor: {
    temperature: null,
    airPressure: null,
    humidity: null,
  },
 
};


export default function runtime(state = initialState, action) {
    
  switch (action.type) {
    case 'SWITCH_ON':
      return { ...state, isPinging: true };

    case 'CHANGE_DISPLAY':
      const monitor = action.payload;
     
      return {
        ...state,
        monitor,
        init: true,
      };

    default:
      return state;
  }
}