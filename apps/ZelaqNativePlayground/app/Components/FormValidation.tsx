export type FormState = {
    name: string
    description: string
}

export type FormErrors = Partial<Record<keyof FormState, string>>

export const initialForm: FormState = {
    name: '',
    description: '',
}

export function validateField(
    field: keyof FormState,
    value: string
): string | undefined {
    const trimmedValue = value.trim()

    if (field === 'name') {
        if (!trimmedValue) {
            return 'Enter a workspace name'
        }

        if (trimmedValue.length < 2) {
            return 'Use at least 2 characters'
        }

        if (trimmedValue.length > 60) {
            return 'Use 60 characters or fewer'
        }
    }

    if (field === 'description') {
        if (trimmedValue.length > 280) {
            return 'Use 280 characters or fewer'
        }
    }

    return undefined
}

export default function validateForm(form: FormState): FormErrors {
    const errors: FormErrors = {}

    const nameError = validateField('name', form.name)
    const descriptionError = validateField(
        'description',
        form.description
    )

    if (nameError) errors.name = nameError
    if (descriptionError) errors.description = descriptionError

    return errors
}