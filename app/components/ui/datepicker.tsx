import React, {FC} from 'react'
import Calendar from 'react-calendar'
import {Box, CSObject} from '@effortless-ui'
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react'

import {Dropdown} from '@/app/components/ui'
import {theme} from '@/app/styles'

export interface IDatepickerProps {
  onChange(value: [Date, Date]): void
  value?: [Date, Date]
}

// imported and modified `react-calendar/dist/Calendar.css` file
const reactCalendarStyles: CSObject = {
  '.react-calendar': {
    width: 300,
    maxWidth: '100%',
    background: theme.color.white,
    'button:enabled': {
      cursor: 'pointer',
    },
    '*:disabled': {
      opacity: 0.5,
    },
    '&__navigation': {
      display: 'flex',
      mb: theme.spacing.s,
      button: {
        p: 0,
        border: 'none',
        transition: 'color 200ms',
        '&:enabled:hover': {
          color: theme.color.primary,
        },
      },
    },
    '&__month-view': {
      '&__weekdays': {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: theme.font.size.small,
        '&__weekday': {
          py: theme.spacing.xs,
        },
      },
      '&__days': {
        '&__day': {
          '&--weekend': {
            color: theme.color.error,
          },
          '&--neighboringMonth': {
            color: theme.color.faded,
          },
        },
      },
    },
    '&__tile': {
      maxWidth: '100%',
      p: theme.spacing.xs,
      background: 'transparent',
      textAlign: 'center',
      fontSize: theme.font.size.small,
      transition: 'color 100ms, background-color 100ms, border-color 100ms',
      border: '1px solid',
      borderColor: theme.color.white,
      '&:enabled:hover': {
        color: theme.color.primary,
      },
      '&--now': {
        borderColor: theme.color.text,
        borderRadius: theme.radii.s,
        ':enabled:hover': {
          borderColor: theme.color.primary,
        },
      },
      '&--active, &--active, &--hasActive, &--hover': {
        color: theme.color.white,
        borderColor: theme.color.text,
        backgroundColor: theme.color.text,
        '&:enabled:hover': {
          color: theme.color.white,
          borderColor: theme.color.text,
        },
      },
      '&--hasActive': {
        borderRadius: theme.radii.s,
      },
      '&--range, &--hover': {
        borderRadius: 0,
      },
      '&--rangeStart': {
        borderStartStartRadius: theme.radii.s,
        borderEndStartRadius: theme.radii.s,
      },
      '&--rangeEnd': {
        borderStartEndRadius: theme.radii.s,
        borderEndEndRadius: theme.radii.s,
      },
      '&--hoverStart': {
        borderStartStartRadius: theme.radii.s,
        borderEndStartRadius: theme.radii.s,
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
      },
      '&--hoverEnd': {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
        borderStartEndRadius: theme.radii.s,
        borderEndEndRadius: theme.radii.s,
      },
      '&--hoverBothEnds': {
        borderRadius: theme.radii.s,
      },
    },
  },
}

export const Datepicker: FC<IDatepickerProps> = ({onChange, value}) => {
  return (
    <Dropdown label="Data">
      {() => (
        <Box cs={reactCalendarStyles}>
          <Calendar
            onChange={(_value) => {
              if (_value) onChange(_value as [Date, Date])
            }}
            value={value ?? null}
            locale="pl"
            selectRange
            nextLabel={<IconChevronRight size={24} stroke={1.5} />}
            next2Label={null}
            prevLabel={<IconChevronLeft size={24} stroke={1.5} />}
            prev2Label={null}
          />
        </Box>
      )}
    </Dropdown>
  )
}
