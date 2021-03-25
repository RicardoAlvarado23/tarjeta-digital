import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const environment = {
  production: true,
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
