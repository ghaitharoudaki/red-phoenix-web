import Link from 'next/link';

export default function LocaleNotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-32 text-center my-auto">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-7xl font-extrabold text-red-600 tracking-tight">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Page not found</h2>
          <p className="text-sm text-gray-600">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-block rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-red-500 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}