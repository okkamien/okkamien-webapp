import {useContext} from 'react'

import {EffortlessThemeContext} from '@/app/components/@effortless-ui/contexts'

export const useEffortlessTheme = () => useContext(EffortlessThemeContext)
