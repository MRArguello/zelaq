import * as React from 'react'
import { Text } from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { Box } from './Box.native'

describe('Box (native)', () => {
    it('applies style and testID', async () => {
        await render(<Box testID="box" style={{ width: 200 }} />)
        expect(screen.getByTestId('box').props.style).toEqual({ width: 200 })
    })

    it('forwards passthrough props like onTouchEnd', async () => {
        const onTouchEnd = jest.fn()
        await render(
            <Box testID="box" onTouchEnd={onTouchEnd}>
                <Text>content</Text>
            </Box>,
        )
        fireEvent(screen.getByTestId('box'), 'touchEnd')
        expect(onTouchEnd).toHaveBeenCalledTimes(1)
    })
})
