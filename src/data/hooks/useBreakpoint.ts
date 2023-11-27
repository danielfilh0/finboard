import { useMediaQuery } from '@chakra-ui/react'

export function useBreakpoint() {
  const [isDesktop] = useMediaQuery('(min-width: 992px)')

  return {
    isDesktop,
  }
}
