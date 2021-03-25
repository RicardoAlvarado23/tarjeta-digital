// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const environment = {
  production: false,
  keyRecaptcha: '6Lc4jf8UAAAAAP1RUJU44sDzMEv-ioRmoYMveAOy'
};

export const MASK_DOC_NUMBER = createNumberMask({
  prefix: '',
  includeThousandsSeparator: false,
  allowDecimal: false,
  allowLeadingZeroes: true
});
export const MASK_NUMBER = createNumberMask({
  prefix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: false
});
export const MASK_DECIMAL = createNumberMask({
  prefix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.'
});

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
