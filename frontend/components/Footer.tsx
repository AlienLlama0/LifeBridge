export default function Footer() {
  return (
    <footer className="border-t border-line bg-white mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink/60">
        <p>© {new Date().getFullYear()} লাইফব্রিজ — সংকটে সময়মতো সঠিক হাসপাতাল খুঁজে দেয়।</p>
        <div className="flex gap-5 font-medium">
          <span>নীতিমালা</span>
          <span>যোগাযোগ</span>
          <span>হাসপাতালের জন্য</span>
        </div>
      </div>
    </footer>
  );
}
