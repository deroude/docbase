import * as progress from "../actions/progress";
import { Statement } from "@angular/compiler";

export interface State {
    progress: progress.Progress[];
    show: boolean;
}

export const initialState: State = {
    progress: [],
    show: false
}

export function reducer(state = initialState, action: progress.Actions): State {
    switch (action.type) {
        case progress.START:
            console.log("progress start", state, action.payload);
            var t = action.payload.task.split(']')[0];
            return {
                progress: state.progress
                    .filter(p => p.task !== t)
                    .concat([Object.assign({}, action.payload, { task: t })]),
                show: true
            }
        case progress.STOP:
            console.log("progress stop", state, action.payload);
            var np = state.progress
                .filter(p => p.task !== action.payload.split(']')[0])
            return {
                progress: np,
                show: np.length > 0
            };
    }
    return state;
}

