// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // firebase: {
  //   projectId: 'fir-1-9eac5',
  //   appId: '1:786183420866:web:26cb7544719f7e718b745b',
  //   databaseURL: 'https://fir-1-9eac5-default-rtdb.firebaseio.com',
  //   storageBucket: 'fir-1-9eac5.appspot.com',
  //   locationId: 'southamerica-east1',
  //   apiKey: 'AIzaSyDxUjwmV1ZIJvTOmn06n_c28sSQSxIuIzo',
  //   authDomain: 'fir-1-9eac5.firebaseapp.com',
  //   messagingSenderId: '786183420866',
  //   measurementId: 'G-NM9YB9S5WQ',
  // },
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDxUjwmV1ZIJvTOmn06n_c28sSQSxIuIzo",
    authDomain: "fir-1-9eac5.firebaseapp.com",
    databaseURL: "https://fir-1-9eac5-default-rtdb.firebaseio.com",
    projectId: "fir-1-9eac5",
    storageBucket: "fir-1-9eac5.appspot.com",
    messagingSenderId: "786183420866",
    appId: "1:786183420866:web:26cb7544719f7e718b745b",
    measurementId: "G-NM9YB9S5WQ"
}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
