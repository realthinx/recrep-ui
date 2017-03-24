import * as network from '../actions/network';

export interface State {
  connected: boolean;
  connecting: boolean;
};

export const initialState: State = {
  connected: false,
  connecting: false
};

export function reducer(state = initialState, action: network.Actions): State {
    switch (action.type) {
        case network.ActionTypes.CONNECTING: {
            return {
                connected: false,
                connecting: true
            };
        }
        case network.ActionTypes.CONNECTED: {
            return {
                connected: true,
                connecting: false
            };
        }
        case network.ActionTypes.DISCONNECTED: {
            return {
                connected: false,
                connecting: false
            };
        }
        default: {
            return state;
        }
    }
}

export const getConnected = (state: State) => state.connected;
export const getConnecting = (state: State) => state.connecting;
