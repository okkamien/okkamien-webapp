import React, {FC} from 'react'
import {Box, Button, CSObject} from '@effortless-ui'

import {theme} from '@/app/styles'

interface IPaginationProps {
  currentPage: number
  onChange(currentPage: number): void
  pageCount: number
}

const activeStyles: CSObject = {textDecoration: 'underline'}

export const Pagination: FC<IPaginationProps> = ({currentPage, onChange, pageCount}) => {
  return (
    <>
      {pageCount > 1 && (
        <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', columnGap: theme.spacing.xs}}>
          <Box tag="li">
            <Button onClick={() => onChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
              &lt;
            </Button>
          </Box>
          <Box tag="li">
            <Button {...(currentPage === 1 && {cs: activeStyles})} onClick={() => onChange(1)}>
              1
            </Button>
          </Box>
          {currentPage > 3 && <Box tag="li">...</Box>}
          {currentPage > 2 && (
            <Box tag="li">
              <Button onClick={() => onChange(currentPage - 1)}>{currentPage - 1}</Button>
            </Box>
          )}
          {currentPage !== 1 && currentPage !== pageCount && (
            <Box tag="li">
              <Button cs={activeStyles} onClick={() => onChange(currentPage)}>
                {currentPage}
              </Button>
            </Box>
          )}
          {currentPage < pageCount - 1 && (
            <Box tag="li">
              <Button onClick={() => onChange(currentPage + 1)}>{currentPage + 1}</Button>
            </Box>
          )}
          {currentPage < pageCount - 2 && <Box tag="li">...</Box>}
          {pageCount > 1 && (
            <Box tag="li">
              <Button {...(currentPage === pageCount && {cs: activeStyles})} onClick={() => onChange(pageCount)}>
                {pageCount}
              </Button>
            </Box>
          )}
          <Box tag="li">
            <Button onClick={() => onChange(Math.min(currentPage + 1, pageCount))} disabled={currentPage === pageCount}>
              &gt;
            </Button>
          </Box>
        </Box>
      )}
    </>
  )
}
