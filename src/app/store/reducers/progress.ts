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
            var t = action.payload.task.substring(1).split(']')[0];
            return {
                progress: state.progress
                    .filter(p => p.task !== t)
                    .concat([Object.assign({}, action.payload, { task: t })]),
                show: true
            }
        case progress.STOP:
            var np = state.progress
                .filter(p => p.task !== action.payload.substring(1).split(']')[0])
            return {
                progress: np,
                show: np.length > 0
            };
    }
    return state;
}

