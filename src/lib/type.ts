import { Attendee, CtaTypeEnum } from "@prisma/client";
import { ValidationError } from "next/dist/compiled/amphtml-validator";

export type ValidationErrors = Record<string, string>;

export type ValidationResult = {
  valid: boolean,
  errors: ValidationErrors
}

export const validateBasicInfo = (data: {
  webinarName?: string;
  description?: string;
  date?: Date;
  time?: string;
  timeFormat?: 'AM' | 'PM';
}): ValidationResult => {
  const errors: ValidationErrors = {};

  if (!data.webinarName?.trim()) {
    errors.webinarName = 'Webinar name is required!';
  }

  if (!data.description?.trim()) {
    errors.description = 'Description is required!';
  }

  if (!data.date) {
    errors.date = 'Date is required!';
  }

  if (!data.time?.trim()) {
    errors.time = 'Time is required!';
  } else {
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
    if (!timeRegex.test(data.time)) {
      errors.time = 'Time must be in format HH:MM(eg, 10:30)';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateCTA = (data: {
  ctaLabel?: string,
  tags?: string[],
  ctaType: string,
  aiAgent?: string,
}): ValidationResult => {
  const errors: ValidationErrors = {}

  if (!data.ctaLabel?.trim()) {
    errors.ctaLabel = 'CTA Label is required'
  }

  if (!data.ctaType) {
    errors.ctaType = 'Please select CTA type'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateAdditionalInfo = (data: {
  lockChat?: boolean,
  couponCode?: string,
  couponEnabled?: boolean
}): ValidationResult => {
  const errors: ValidationErrors = {}

  if (data.couponEnabled && !data.couponCode?.trim()) {
    errors.couponCode = 'Coupon Code not provided'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export type AttendanceData = {
  count: number
  users: Attendee[]
}
