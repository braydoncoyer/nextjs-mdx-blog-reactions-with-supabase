import { SupabaseAdmin } from '@/lib/supabase'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body)
    // Call our stored procedure with the page_slug set by the request params slug
    const { reaction, type } = body
    if (reaction === 'like_count') {
      if (type === 'increment') {
        await SupabaseAdmin.rpc('increment_like_count', {
          page_slug: req.query.slug,
        })
      }
    }

    return res.status(200).json({
      message: `Successfully performed reaction for: ${req.query.slug}`,
    })
  }

  if (req.method === 'GET') {
    // Query the pages table in the database where slug equals the request params slug.
    const { data } = await SupabaseAdmin.from('reactions')
      .select('like_count')
      .filter('slug', 'eq', req.query.slug)

    if (data) {
      return res.status(200).json({
        like_count: data[0]?.like_count || 0,
      })
    }
  }

  return res.status(400).json({
    message: 'Unsupported Request',
  })
}
