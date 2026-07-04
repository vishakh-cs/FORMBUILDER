import { requiredFormField } from "./FormFields";

export const getFieldValidationErrors = (currentField) => {
    const errors = {};

    for (const field of requiredFormField) {
        const value = currentField[field.key];

        if (field.required) {
            if (typeof value === "string" && !value.trim()) {
                errors[field.key] = `${field.label} is required`;
                continue;
            }

            if (typeof value === "boolean" && value === false) {
                errors[field.key] = `${field.label} is required`;
                continue;
            }

            if (value === null || value === undefined) {
                errors[field.key] = `${field.label} is required`;
            }
        }
    }

    return errors;
};

export const validateField = (currentField) => {
    return Object.keys(getFieldValidationErrors(currentField)).length === 0;
};

