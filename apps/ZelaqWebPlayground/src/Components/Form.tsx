import { useState } from 'react'
import { Box, Card, Dialog, Input, Stack, Text, useTheme, Button } from 'zelaq-ui'
import { validateField, validateForm, type FormErrors, type FormState } from './FormValidation'
import { useIsMobile } from '../hooks/useIsMobile'

const EMPTY_FORM: FormState = { name: '', description: '' }

export function Form() {
    const theme = useTheme()
    const { space } = theme
    const isMobile = useIsMobile()
    const cardStyle = isMobile
        ? { width: '100%', padding: space['2xl'], borderRadius: 0, boxSizing: 'border-box' as const }
        : { margin: '0 auto', padding: space.xl, minWidth: 400, minHeight: 400 }
    const [form, setForm] = useState<FormState>(EMPTY_FORM)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [touched, setTouched] = useState<
        Partial<Record<keyof FormState, boolean>>
    >({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

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


    const resetForm = () => {
        setForm(EMPTY_FORM)
        setSubmitted(false)
        setErrors({})
        setTouched({})
        setConfirmDeleteOpen(false)
    }

    if (submitted) {
        return (
            <Card variant="elevated" style={cardStyle}>
                <Stack gap="lg" style={{height: '100%'}}>
                    <Stack gap="sm">
                        <Text variant='heading4' style={{ paddingBottom: space.sm }}>Success</Text>
                        <Text>Your workspace has been created.</Text>
                    </Stack>

                    <Stack gap="base">
                        <Stack gap="sm">
                            <Text variant="bodySmall" tone="muted">Workspace name</Text>
                            <Text>{form.name}</Text>
                        </Stack>
                        <Stack gap="sm">
                            <Text variant="bodySmall" tone="muted">Description</Text>
                            <Text>{form.description || '—'}</Text>
                        </Stack>
                    </Stack>

                    <Button
                        variant="secondary"
                        textStyle={{ color: theme.colors.textDanger }}
                        onPress={() => setConfirmDeleteOpen(true)}
                        style={{ marginTop:'auto'}}
                    >
                        Delete workspace and start over
                    </Button>
                </Stack>

                <Dialog
                    open={confirmDeleteOpen}
                    onClose={() => setConfirmDeleteOpen(false)}
                    title="Delete workspace?"
                    presentation={isMobile ? "sheet" : "dialog"}
                >
                    <Stack gap="lg"  style={{padding: space['lg']}}>
                        <Text>
                            This will permanently delete “{form.name}” and reset the form. This can’t be undone.
                        </Text>
                        <Box style={{ display: 'flex', flexDirection: 'row', gap: space.base }}>
                            <Button
                                variant="secondary"
                                onPress={() => setConfirmDeleteOpen(false)}
                                style={{ flex: 1 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                style={{
                                    flex: 1,
                                    backgroundColor: theme.colors.textDanger,
                                    borderColor: theme.colors.textDanger,
                                }}
                                onPress={resetForm}
                            >
                                Delete workspace
                            </Button>
                        </Box>
                    </Stack>
                </Dialog>
            </Card>
        )
    }


    const isValid = Object.keys(validateForm(form)).length === 0;

    return (
        <Card variant="elevated" style={cardStyle}>
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
                        placeholder="Zelaq Design System"
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
