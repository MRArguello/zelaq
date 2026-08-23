import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { Button } from './Button.native'

function flattenStyle(style: unknown): Record<string, unknown> {
    return Array.isArray(style) ? Object.assign({}, ...style.map(flattenStyle)) : (style as Record<string, unknown>) ?? {}
}

describe('Button (native)', () => {
    it('calls onPress when pressed', async () => {
        const onPress = jest.fn()
        await render(<Button onPress={onPress}>Continue</Button>)
        await fireEvent.press(screen.getByText('Continue'))
        expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('does not call onPress when disabled', async () => {
        const onPress = jest.fn()
        await render(
            <Button onPress={onPress} disabled>
                Continue
            </Button>,
        )
        const button = screen.getByText('Continue').parent!.parent!
        expect(button.props.accessibilityState).toEqual({ disabled: true })
        await fireEvent.press(screen.getByText('Continue'))
        expect(onPress).not.toHaveBeenCalled()
    })

    it('shows pressed feedback on press in, reverts on press out', async () => {
        await render(<Button onPress={jest.fn()}>Continue</Button>)
        const button = screen.getByText('Continue').parent!.parent!

        const restingOpacity = flattenStyle(button.props.style).opacity
        await fireEvent(button, 'pressIn')
        expect(flattenStyle(button.props.style).opacity).not.toBe(restingOpacity)
        await fireEvent(button, 'pressOut')
        expect(flattenStyle(button.props.style).opacity).toBe(restingOpacity)
    })
})
