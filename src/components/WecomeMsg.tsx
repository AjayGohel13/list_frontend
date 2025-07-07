import { useState } from "react";
import { Card, CardHeader } from "./ui/card";
import z from "zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL; 
type MsgProps = {
    name: string | null,
    email: string | null,
    userId: number | null,

}
const noteSchema = z.object({
    note: z.string().min(6, "Note must be at least 6 characters long"),
})
const WelcomeMsg = ({ userId, name, email }: MsgProps) => {
    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState('');
    const navigate = useNavigate();


    const [showDialog, setShowDialog] = useState(false);

    const handleNotes = async () => {
        try {
            setLoading(true)
            const result = noteSchema.safeParse({ note });
            if (!result.success) {
                const errorMessage = result.error.errors[0]?.message;
                toast.error(errorMessage);
                return;
            }
            await axios.post(`${backendUrl}/notes/create-note`, {
                userId,
                note
            })
            toast.success('Note has been added');
            setShowDialog(false)
            navigate(0);
        } catch (error) {
            toast.error("Please enter valid OTP")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Card className="border-none drop-shadow-xl bg-white w-full " >
                <CardHeader className=" flex flex-row items-center justify-between gap-x-4 " >
                    <div className="space-y-2 w-full" >
                        <CardHeader className="w-full text-2xl line-clamp-1 flex flex-col " >
                            <div className=" w-full flex justify-between items-center">
                                <div className=" text-2xl  font-bold">
                                    Welcome, {name} 👋🏻
                                </div>
                                <button
                                    onClick={() => setShowDialog(true)}
                                    disabled={loading}
                                    className={` text-white text-lg tracking-wide font-semibold py-2 px-12 rounded-lg transition-all duration-300 ease-in-out hidden sm:flex  items-center justify-center focus:shadow-outline focus:outline-none ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer text-gray-100'
                                        }`}
                                >
                                    Create Note
                                </button>

                            </div>
                            <div className=" text-lg">
                                Email: {email}
                            </div>
                        </CardHeader>
                    </div>
                </CardHeader>
            </Card>
            <div className="mt-10" >
                <button
                    onClick={() => setShowDialog(true)}
                    disabled={loading}
                    className={` text-white text-lg tracking-wide font-semibold py-2 px-12 rounded-lg transition-all duration-300 ease-in-out flex sm:hidden items-center justify-center focus:shadow-outline focus:outline-none ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer text-gray-100'
                        }`}
                >
                    Create Note
                </button>
            </div>
            {showDialog && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">Create a Note</h2>
                        <input
                            className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your note..."
                            onChange={(e) => setNote(e.target.value)}
                        />
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => setShowDialog(false)}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleNotes}
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default WelcomeMsg
