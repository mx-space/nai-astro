import type { Component } from 'solid-js'

import { QueryClientProvider } from '@tanstack/solid-query'

import { queryClient } from '../utils/query'

export function withQueryContextWrapper<T>(Component: Component<T>) {
  return (props: any) => {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...props} />
      </QueryClientProvider>
    )
  }
}
