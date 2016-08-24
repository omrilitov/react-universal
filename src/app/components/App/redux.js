const RENDER_DEV_TOOLS = 'app/RENDER_DEV_TOOLS';

const initialState = {
  isRenderDevTools: false
};

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
  case RENDER_DEV_TOOLS:
    return Object.assign({}, state, {
      isRenderDevTools: true
    });
  default:
    return state;
  }
}

export function renderDevTools () {
  return {
    type: RENDER_DEV_TOOLS
  };
}