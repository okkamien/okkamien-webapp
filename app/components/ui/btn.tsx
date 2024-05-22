import React, {FC, PropsWithChildren} from 'react'
import {Button, PropsWithCS} from '@effortless-ui'

import {Arrow, arrowHoverParent} from '@/app/components/ui/arrow'
import {theme} from '@/app/styles'

interface IBtnPropsDark {
  dark: true
  light?: never
}
interface IBtnPropsLight {
  dark?: never
  light: true
}

type IBtnProps = (IBtnPropsDark | IBtnPropsLight) & PropsWithCS

export const btnHoverParent = 'tag-hover-parent'

export const Btn: FC<PropsWithChildren<IBtnProps>> = ({children, cs, dark, light}) => {
  return (
    <Button
      className={arrowHoverParent}
      cs={{
        label: 'Btn',
        display: 'flex',
        alignItems: 'center',
        columnGap: theme.spacing.xxs,
        px: theme.spacing.s,
        py: theme.spacing.xs,
        border: '1px solid',
        borderRadius: theme.radii.s,
        backgroundColor: 'transparent',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'color 200ms, background-color 200ms, border-color 200ms',
        [`&:hover, .${btnHoverParent}:hover &`]: {
          color: theme.color.primary,
          borderColor: theme.color.primary,
          backgroundColor: theme.color.white,
        },
        ...(dark && {
          color: theme.color.text,
          borderColor: theme.color.text,
        }),
        ...(light && {
          color: theme.color.white,
          borderColor: theme.color.white,
        }),
        ...cs,
      }}
    >
      {children}
      <Arrow
        cs={{
          ...(dark && {
            color: theme.color.text,
          }),
          ...(light && {
            color: theme.color.white,
          }),
        }}
      />
    </Button>
  )
}
