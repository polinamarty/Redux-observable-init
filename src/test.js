import { firstEpic } from "./epics";
import { of } from "rxjs";

describe('redux-observable', () => {
  it('First test', async () => {
    const action$ = of ({
      type: 'FIRST'
    });
    const expectActionType = 'FIRST_SUCCESS';

    const resultEpic = await firstEpic(action$).toPromise();
    expect(resultEpic.type).toEqual(expectActionType);
  });
})
