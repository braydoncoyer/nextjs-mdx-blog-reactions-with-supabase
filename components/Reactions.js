import useArticleReactions from 'hooks/useArticleReactions'

export const Reactions = ({ slug }) => {
  const { hasLiked, handleIncrementLike, reactions } = useArticleReactions(slug)
  return (
    <div>
      <button
        className="px-4 py-3 font-bold text-gray-500 border-2 border-gray-300 rounded-md text-md"
        onClick={handleIncrementLike}
      >
        👍 {!hasLiked && <span>Like</span>} {reactions?.like_count}
      </button>
    </div>
  )
}
