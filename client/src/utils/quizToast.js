import toast from "react-hot-toast";
const quiz_url = import.meta.env.VITE_QUIZ_BACKEND_URL || 'http://localhost:3000/quizzes'

const toastSuccess = () => {
    toast.success("Copied quiz link to clipboard", {
        duration: 2000,
        position: 'top-right',
        iconTheme: {
            primary: 'rgb(16, 211, 16)',
            secondary: '#fff',
        },
    style: {
        padding: "1rem"
    }});
}

export const shareLink = (id) => {
    navigator.clipboard.writeText(`${quiz_url}/play/${id}`);
    toastSuccess();
}