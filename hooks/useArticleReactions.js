import { useEffect, useState } from 'react'

import { fetcher } from '../lib/fetcher'
import useSWR from 'swr'

export default function useArticleReactions(slug) {
  const [hasLiked, setHasLiked] = useState(false)
  const [reactions, setReactions] = useState()

  // Reaction count data
  const { data, mutate } = useSWR(`/api/reactions/${slug}`, fetcher, {
    refreshInterval: 25000,
  })

  useEffect(() => {
    setReactions(data)
  }, [data])

  async function handleIncrementLike() {
    if (hasLiked) return
    // updateReactions('liked')

    await fetch(`/api/reactions/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        reaction: 'like_count',
        type: 'increment',
      }),
    })

    setHasLiked(true)

    // mutate({ ...data, like_count: data.like_count + 1 })
  }

  return { handleIncrementLike, reactions, hasLiked }
}
