export const TAX_RATES = {
  INCOME_TAX_BRACKETS: [
    { threshold: 12450, rate: 0.19 },
    { threshold: 20200, rate: 0.24 },
    { threshold: 35200, rate: 0.30 },
    { threshold: 60000, rate: 0.37 },
    { threshold: Infinity, rate: 0.45 },
  ],
  SOCIAL_SECURITY: {
    EMPLOYEE_RATE: 0.0635,
    SELF_EMPLOYED_BASE: 294,
  },
  VAT_RATE: 0.21,
} as const;