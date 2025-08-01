'use client';

import { useEffect, useState } from "react";

type Attribute = {
    id: number;
    name: string;
};

export const AttributeList = () => {
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 5;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/attribute?page=${page}&limit=${limit}`);
            const json = await res.json();
            if (res.ok) {
                setAttributes(json.data);
                setTotal(json.total);
            } else {
                alert("Ошибка загрузки: " + json.error);
            }
        };

        fetchData();
    }, [page]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Список атрибутов</h2>
            <ul className="list-disc pl-5">
                {attributes.map((attr) => (
                    <li key={attr.id}>{attr.name}</li>
                ))}
            </ul>
            <div className="flex gap-2">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Назад
                </button>
                <span>Страница {page} из {totalPages || 1}</span>
                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Вперёд
                </button>
            </div>
        </div>
    );
};
