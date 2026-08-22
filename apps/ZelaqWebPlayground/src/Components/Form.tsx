import { useState } from 'react'
import { Card, Input, Stack, Text, useTheme, Button } from 'zelaq-ui'
import { validateField, validateForm, type FormErrors, type FormState } from './FormValidation'

export function Form() {
    const theme = useTheme()
    const { space } = theme
    const [form, setForm] = useState<FormState>({ name: '', description: '' })
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [touched, setTouched] = useState<
        Partial<Record<keyof FormState, boolean>>
    >({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const updateField = <K extends keyof FormState>(
        field: K,
        value: FormState[K]
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }))

        if (touched[field]) {
            setErrors((current) => ({
                ...current,
                [field]: validateField(field, String(value)),
            }))
        }
    }

    const handleBlur = (field: keyof FormState) => {
        setTouched((current) => ({
            ...current,
            [field]: true,
        }))

        setErrors((current) => ({
            ...current,
            [field]: validateField(field, form[field]),
        }))
    }

    const handleSubmit = async () => {
        const nextErrors = validateForm(form)

        setErrors(nextErrors)
        setTouched({
            name: true,
            description: true,
        })

        if (Object.keys(nextErrors).length > 0) {
            return
        }

        setIsSubmitting(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            setSubmitted(true)
        } finally {
            setIsSubmitting(false)
        }
    }


    if (submitted) {
        return (
            <Card variant="elevated" style={{ margin: `0 auto`, minWidth: 400, minHeight: 400, padding: space.xl, }}><Stack gap="sm">
                <Text variant='heading4' style={{ paddingBottom: space.sm }}>Success</Text>
                <Text>Your workspace has been created.</Text>
            </Stack></Card>
        )
    }


    const isValid = Object.keys(validateForm(form)).length === 0;

    return (
        <Card variant="elevated" style={{ margin: `0 auto`, padding: space.xl, minWidth: 400, minHeight: 400 }}>
            <Stack gap="lg">
                <Stack gap="sm">
                    <Text variant='heading4' style={{ paddingBottom: space.sm }}>Create your workspace</Text>
                    <Text variant="body" tone="muted">
                        Set up a shared space for your team.
                    </Text>
                </Stack>

                <Stack gap="md"
                    style={{ marginTop: space['xl'] }}>
                    <Input
                        label="Workspace name"
                        value={form.name}
                        onChangeText={(value) => updateField('name', value)}
                        placeholder="Acme Design System"
                        errorMessage={errors.name}
                        onBlur={() => handleBlur('name')}
                    />
                    <Input
                        label="Description"
                        value={form.description}
                        onChangeText={(value) =>
                            updateField('description', value)
                        }
                        multiline
                        placeholder="What are you building?"
                        errorMessage={errors.description}
                        onBlur={() => handleBlur('description')}
                    />

                    <Button
                        disabled={!isValid || isSubmitting}
                        onPress={() => handleSubmit()}
                        style={{ marginTop: space['lg'] }}
                    >
                        Create workspace
                    </Button>
                </Stack>
            </Stack>
        </Card>
    )
}
