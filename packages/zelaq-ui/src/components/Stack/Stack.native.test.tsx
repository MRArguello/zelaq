import * as React from 'react'
import { Text } from 'react-native'
import { render, screen } from '@testing-library/react-native'
import { Stack } from './Stack.native'

function flattenStyle(style: unknown): Record<string, unknown> {
    return Array.isArray(style) ? Object.assign({}, ...style.map(flattenStyle)) : (style as Record<string, unknown>) ?? {}
}

describe('Stack (native)', () => {
    it('maps align/justify/gap to real style values', async () => {
        await render(
            <Stack testID="stack" align="center" justify="between" gap="lg">
                <Text>a</Text>
            </Stack>,
        )
        const style = flattenStyle(screen.getByTestId('stack').props.style)
        expect(style.flexDirection).toBe('column')
        expect(style.alignItems).toBe('center')
        expect(style.justifyContent).toBe('space-between')
        expect(style.gap).toBe(24)
    })

    it('defaults to stretch/start alignment', async () => {
        await render(
            <Stack testID="stack">
                <Text>a</Text>
            </Stack>,
        )
        const style = flattenStyle(screen.getByTestId('stack').props.style)
        expect(style.alignItems).toBe('stretch')
        expect(style.justifyContent).toBe('flex-start')
    })
})
