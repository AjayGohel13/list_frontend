import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from "../../api/country";
import type { Country } from "../../api/country";
import { Loader } from "lucide-react"
import Header from '../../components/Header';

const HomePage: React.FC = () => {
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['countries', page],
        queryFn: () => fetchCountries(page),
    });

    if (isLoading) return (
        <div className=" h-full min-h-screen flex items-center justify-center">
            <Loader className=" size-6 text-muted-foreground animate-spin" />
        </div>)
    if (isError || !data) return <p>Something went wrong.</p>;

    return (
        <div className="p-6">
            <Header/>
            <h1 className="text-2xl font-bold mb-4">🌍 Countries (Page {data.page})</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.data?.map((country: Country, idx: number) => (
                    <div className="flex px-3 py-3" key={idx}>
                        <div className="max-w-sm rounded overflow-hidden shadow-lg">
                            <img className="w-full h-40" src={country.flags.png} alt="Sunset in the mountains" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{country.name.common}</div>
                                <p className="text-gray-700 text-base">
                                    {country.capital}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2 bg-gray-200 rounded">Page {data.page} of {data.totalPages}</span>
                <button
                    onClick={() => setPage(p => Math.min(p + 1, data.totalPages))}
                    disabled={page === data.totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default HomePage;
