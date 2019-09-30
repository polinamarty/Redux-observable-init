import { filter, map, mapTo, switchMap, catchError } from 'rxjs/operators';
import { ofType } from "redux-observable";
import { getData, getDataWithError } from "./utils";
import { from, of, EMPTY, forkJoin } from "rxjs";

const firstEpic = (action$) => {
  return action$.pipe(
    filter((action) => action.type === "FIRST"),
    mapTo({
      type: "FIRST_SUCCESS"
    })
  );
};

const secondEpic = (action$) => {
  return action$.pipe(
    ofType('SECOND'),
    switchMap(() => from(getData(1000, 5)).pipe(
      map(value => ({
        type: 'SECOND_SUCCESS',
        value
      }))
    ))
  )
};

const thirdEpic = (action$) => {
  return action$.pipe(
    ofType('THIRD'),
    switchMap(() => {
      return from(getDataWithError(1000)).pipe(
        catchError(() => of ({
          type: 'THIRD_ERROR'
        }))
      );
    }))
};

export const thirdEpic_2 = (action$) => {
  return action$.pipe(
    ofType('THIRD_2'),
    switchMap(() => from(getDataWithError(1000)).pipe(
      catchError(() => from([{
        type: 'THIRD_ERROR_1'
      }, {
        type: 'THIRD_ERROR_2'
      }]))
    )),
  );
};

export const thirdEpic_3 = (action$) => {
  return action$.pipe(
    ofType('THIRD_3'),
    switchMap(() => from(getDataWithError(1000)).pipe(
      catchError(() => EMPTY)
    )),
  );
};

export const fourthEpic = (action$, store$) => {
  return action$.pipe(
    ofType('FOURTH'),
    switchMap(() => {
      const state = store$.value;
      return from(getData(1000, state)).pipe(
        map(value => ({
          type: 'FOURTH_SECCUSS',
          value
        })),
        catchError(() => of ({
          type: 'FOURTH_ERROR'
        }))
      )
    }),
  )
};

export const fifthEpic = (action$) => {
  return action$.pipe(
    ofType('FIFTH'),
    switchMap(() => from(getData(2000, 1)).pipe(
      switchMap((result1) => from(getData(1000, result1 + 2))),
      map(result2 => ({
        type: 'FIFTH_SUCCESS',
        value: result2
      })),
      catchError(() => of ({
        type: 'FIFTH_ERROR'
      }))
    )),
  )
};

export const sixthEpic = (action$) => {
  return action$.pipe(
    ofType('SIXTH'),
    switchMap(() => {
      return forkJoin([
        from(getData(2000, 1)),
        from(getData(1000, 2)),
      ]).pipe(
        map(([result1, result2]) => {
          return {
            type: 'SIXTH_SUCCESS',
            result1,
            result2
          }
        }),
        catchError(() => of ({
          type: 'SIXTH_ERROR'
        }))
      )
    }),
  )
};

export const seventhEpic = (action$) => {
  return action$.pipe(
    ofType('SEVENTH'),
    switchMap(() => {
      return forkJoin([
        from(getData(2000, 1)).pipe(
          switchMap((result1) => from(getData(1000, 2)))
        ),
        from(getData(1000, 3)),
      ]).pipe(
        map(([result2, result3]) => {
          return {
            type: 'SEVENTH_SUCCESS',
            result2,
            result3
          }
        }),
        catchError(() => of ({
          type: 'SEVENTH_ERROR'
        }))
      )
    }),

  )
};

export const epics = [
  firstEpic,
  secondEpic,
  thirdEpic,
  thirdEpic_2,
  thirdEpic_3,
  fourthEpic,
  fifthEpic,
  sixthEpic,
  seventhEpic
];
