import { redirect } from 'next/navigation';

export const NotFoundPage = () => {
    return redirect('/active');
};
