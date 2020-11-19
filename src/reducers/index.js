
const initialState = {
  isPinging: true,
  init: false,
  monitor: {
    temperature: null,
    airPressure: null,
    humidity: null,
  },
  history: {
    temperature: Array.from(Array(99)),
    airPressure: Array.from(Array(99)),
    humidity: Array.from(Array(99)),
  },
};


export default function runtime(state = initialState, action) {
    
  switch (action.type) {
    case 'SWITCH_ON':
      return { ...state, isPinging: true };

    case 'SWITCH_OFF':
      return { ...state, isPinging: false };

    case 'CHANGE_DISPLAY':
      const monitor = action.payload;
      const history = { ...state.history };
      Object.keys(monitor).forEach(key => {
        if (
          history[key].slice(-1)[0] !== monitor[key] &&
          monitor[key] !== 'N/A'
        ) {
          history[key].push(monitor[key]);
          history[key] = history[key].slice(-100);
        }
      });
      return {
        ...state,
        history,
        monitor,
        init: true,
      };

    default:
      return state;
  }
}