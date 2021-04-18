import { useParams } from 'react-router-dom'

export function Task() {
  const { id } = useParams()
  return `Task #${id}`
}
