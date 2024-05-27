import React, {FC} from 'react'
import {Box, Button, PropsWithCS} from '@effortless-ui'
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react'

import {theme} from '@/app/styles'

interface IPaginationProps extends PropsWithCS {
  currentPage: number
  onChange(currentPage: number): void
  pageCount: number
}

export const Pagination: FC<IPaginationProps> = ({cs, currentPage, onChange, pageCount}) => {
  return (
    <>
      {pageCount > 1 && (
        <Box tag="ul" composition={['semanticList']} cs={{display: 'flex', justifyContent: 'center', columnGap: theme.spacing.xxs, ...cs}}>
          <Box tag="li">
            <Button variant="paginationArrow" onClick={() => onChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
              <IconChevronLeft size={20} stroke={1.5} />
            </Button>
          </Box>
          <Box tag="li">
            <Button variant={currentPage === 1 ? 'paginationActive' : 'paginationDigit'} onClick={() => onChange(1)}>
              1
            </Button>
          </Box>
          {currentPage > 3 && (
            <Box tag="li" variant="paginationDots">
              ...
            </Box>
          )}
          {currentPage > 2 && (
            <Box tag="li">
              <Button variant="paginationDigit" onClick={() => onChange(currentPage - 1)}>
                {currentPage - 1}
              </Button>
            </Box>
          )}
          {currentPage !== 1 && currentPage !== pageCount && (
            <Box tag="li">
              <Button variant="paginationActive" onClick={() => onChange(currentPage)}>
                {currentPage}
              </Button>
            </Box>
          )}
          {currentPage < pageCount - 1 && (
            <Box tag="li">
              <Button variant="paginationDigit" onClick={() => onChange(currentPage + 1)}>
                {currentPage + 1}
              </Button>
            </Box>
          )}
          {currentPage < pageCount - 2 && (
            <Box tag="li" variant="paginationDots">
              ...
            </Box>
          )}
          {pageCount > 1 && (
            <Box tag="li">
              <Button variant={currentPage === pageCount ? 'paginationActive' : 'paginationDigit'} onClick={() => onChange(pageCount)}>
                {pageCount}
              </Button>
            </Box>
          )}
          <Box tag="li">
            <Button
              variant="paginationArrow"
              onClick={() => onChange(Math.min(currentPage + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              <IconChevronRight size={20} stroke={1.5} />
            </Button>
          </Box>
        </Box>
      )}
    </>
  )
}
