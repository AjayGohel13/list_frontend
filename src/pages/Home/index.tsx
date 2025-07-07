import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import WelcomeMsg from '../../components/WecomeMsg';
import axios from 'axios';
import { Trash2 } from "lucide-react"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
const backendUrl = import.meta.env.VITE_BACKEND_URL; 

interface TokenPayload {
    userId: number;
    name: string;
    email: string;
    exp?: number;
    iat?: number;
}


const Home = () => {
    const navigate = useNavigate();

    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [notes, setNotes] = useState<{ id: number; note: string }[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [_showDialog, setShowDialog] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode<TokenPayload>(token);
                setName(decoded.name)
                setUserId(decoded.userId)
                setEmail(decoded.email)
            } catch (err) {
                console.error('Invalid token:', err);
            }
        }
    }, []);

    useEffect(() => {
        if (userId) {
            axios
                .get(`${backendUrl}/notes/get-notes/${userId}`)
                .then((res) => {
                    setNotes(res.data.notes);
                })
                .catch(() => {
                    toast.error('Failed to fetch notes.');
                });
        }
    }, [userId]);

    const handleDelete = async (id: number) => {
        try {
            setIsLoading(true)
            await axios.delete(`${backendUrl}/notes/delete-note/${id}`)
            toast.success("Note has been deleted")
            navigate(0)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
            setShowDialog(false)
        }
    }


    return (
        <div className=' w-full max-w-7xl mx-auto'>
            <Header/>
            <WelcomeMsg name={name} email={email} userId={userId} />
            <h1 className=' text-black text-xl text-start mt-8 font-semibold'>Notes</h1>
            <div>
                <ul className="bg-white overflow-y-auto max-h-[70vh] sm:rounded-md max-w-7xl space-y-4 mx-auto mt-2">
                    {notes.map((noteItem) => (
                        <li key={noteItem.id} className=' border border-blue-400 rounded-md  shadow-lg'>
                            <div className="px-4 py-5 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">{noteItem.note}</h3>
                                    <button
                                        onClick={() => setSelectedNoteId(noteItem.id)}
                                        // onClick={() => handleDelete(noteItem.id)}
                                        className={`hover:bg-rose-500 h-10 w-10 rounded-md ${isLoading ? "bg-rose-300 cursor-not-allowed" : "bg-rose-400 cursor-pointer"}  flex items-center justify-center`}>
                                        <Trash2 className='h-8 w-8 text-white p-1 ' />
                                    </button>
                                </div>
                        
                            </div>

                            {selectedNoteId !== null && (
                                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl">
                                        <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this note?</h2>
                                        <div className="mt-4 flex justify-end gap-2">
                                            <button
                                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                                                onClick={() => setSelectedNoteId(null)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleDelete(selectedNoteId)}
                                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                    ))}
                </ul>

            </div>

        </div>
    )
}

export default Home