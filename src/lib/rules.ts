type Rule = {
  value: number;
  message: string;
};

type DefaultRulesOptions = {
  fieldName?: string;
  length?: number;
};

const defaultRules = ({
  fieldName = 'This field',
  length = 8,
}: DefaultRulesOptions = {}): {required: string; minLength: Rule} => {
  return {
    required: `${fieldName} is required`,
    minLength: {
      value: length,
      message: `${fieldName} must be at least ${length} characters long`,
    },
  };
};

const requiredRule = {
  required: 'This field is required',
};
const otpRule = {
  required: 'This field is required',
  minLength: {value: 6, message: 'Otp must be at least 6 characters long'},
  maxLength: {value: 6, message: 'Otp must not exceed 6 characters'},
};

const emailRules = {
  required: 'Email is required',
  maxLength: {value: 100, message: 'Email must not exceed 100 characters'},
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email format',
  },
};

const phoneRules = {
  required: 'Phone number is required',
  pattern: {
    value: /^\d+$/,
    message: 'Phone number must contain only numbers',
  },
  minLength: {
    value: 5,
    message: 'Invalid phone number',
  },
};
const numericOnlyRules = {
  required: 'This field is required',
  pattern: {
    value: /^\d+$/,
    message: 'Please enter only numbers',
  },
};

const hourPickerRules = {
  required: 'This field is required',
  pattern: {
    value: /^[4-9]\d*|10\d*|11\d*|12\d*|1[3-9]\d*|2\d*$/, // Regular expression for 4 hours or more
    message: 'Start time must be at least 4 hours',
  },
};
const minutePickerRules = {
  required: 'This field is required',
  pattern: {
    value: /^(0|15|30|45)$/, // Valid minute values (0, 15, 45)
    message: 'Valid minutes values are 0, 15, 30 or 45',
  },
};
const passwordRules = {
  required: 'Password is required',
  minLength: {value: 8, message: 'Password must be at least 8 characters long'},
  maxLength: {value: 20, message: 'Password must not exceed 20 characters'},
  pattern: {
    value: /^(?=.*[A-Z]).+$/,
    message: 'Password must contain at least one uppercase letter',
  },
};

const passwordRulesFunc = (req: boolean) => {
  console.log(req, 'password rules *(*(*(*(*(*(*(*(*(*(*(');
  return {
    required: !req ? 'Password is required' : false,
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },
    maxLength: {value: 20, message: 'Password must not exceed 20 characters'},
    pattern: {
      value: /^(?=.*[A-Z]).+$/,
      message: 'Password must contain at least one uppercase letter',
    },
  };
};

export {
  defaultRules,
  otpRule,
  requiredRule,
  passwordRules,
  passwordRulesFunc,
  emailRules,
  phoneRules,
  numericOnlyRules,
  hourPickerRules,
  minutePickerRules,
};
