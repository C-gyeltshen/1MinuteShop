export default function StoreUnavailable() {
  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center px-6 text-center font-space-grotesk">
      <div className="max-w-md">
        <h1 className="text-3xl font-bold text-[#f0ede8] mb-3">This store is taking a break</h1>
        <p className="text-[rgba(240,237,232,0.55)]">
          The shop you&apos;re looking for is temporarily unavailable. Please check back soon.
        </p>
      </div>
    </main>
  );
}
