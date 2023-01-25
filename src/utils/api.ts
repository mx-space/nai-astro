import { NoteController, createClient } from '@mx-space/api-client'
import type { IRequestAdapter } from '@mx-space/api-client/types/interfaces/adapter'

import { configs } from '../app.config'

const jsonDataAttachResponse = async (response: Response) => {
  const cloned = response.clone()
  const data = await cloned.json()

  return Object.assign({}, response, {
    data,
  })
}

// @ts-ignore
const fetchAdaptor: IRequestAdapter<typeof fetch> = Object.preventExtensions({
  get default() {
    return fetch
  },
  async delete(url, options) {
    const data = await fetch(url, {
      ...options,
      method: 'DELETE',
    })
    return jsonDataAttachResponse(data)
  },
  async get(url, options) {
    const response = await fetch(url, {
      ...options,
      method: 'GET',
    })
    return jsonDataAttachResponse(response)
  },
  async patch(url, options) {
    const response = await fetch(url, {
      ...options,
      method: 'PATCH',
    })
    return jsonDataAttachResponse(response)
  },
  async post(url, options) {
    const { headers = {}, data, ...rest } = options

    if (typeof data === 'object' && !(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }

    const response = await fetch(url, {
      headers,
      body: typeof data === 'object' ? JSON.stringify(data) : data,
      ...rest,
      method: 'POST',
    })
    return jsonDataAttachResponse(response)
  },
  async put(url, options) {
    const response = await fetch(url, {
      ...options,
      method: 'PUT',
    })
    return jsonDataAttachResponse(response)
  },
  responseWrapper: {} as any as Promise<any>,
})

export const apiClient = createClient(fetchAdaptor)(configs.apiBase, {
  controllers: [NoteController],
})
