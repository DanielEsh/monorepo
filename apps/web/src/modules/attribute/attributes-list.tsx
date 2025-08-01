'use client'

import { useQuery } from '@tanstack/react-query'

const fetchAttributes = async (page: number, limit: number) => {
  const res = await fetch(`/api/attribute?page=${page}&limit=${limit}`)
  if (!res.ok) throw new Error('Ошибка запроса')
  return res.json()
}

export const AttributeList = () => {
  const page = 1
  const limit = 5

  const { data, isLoading, error } = useQuery({
    queryKey: ['attributes', page],
    queryFn: () => fetchAttributes(page, limit),
  })

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка загрузки</div>

  return (
    <ul className="list-disc p-4">
      {data.data.map((attr: any) => (
        <li key={attr.id}>{attr.name}</li>
      ))}
    </ul>
  )
}
