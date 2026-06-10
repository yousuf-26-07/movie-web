import { CircularPagination } from './components/pagination';
import Moviefetch from './components/moviefetch';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Moviefetch />
      <CircularPagination />
    </div>
  );
}
