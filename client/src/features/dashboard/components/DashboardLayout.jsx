export function DashboardLayout({ children, eyebrow = 'Creator dashboard', heading, subheading, user }) {
  return (
    <main className="min-h-[calc(100svh-73px)] bg-[#f7f7f2] px-5 py-8 md:px-14 md:py-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[28px] bg-[#174b17] p-6 text-white shadow-2xl shadow-emerald-950/15 md:p-8">
          <div className="flex items-center justify-between gap-5 max-md:flex-col max-md:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#d7f80f]">{eyebrow}</p>
              <h1 className="mt-3 text-4xl font-black leading-none md:text-6xl">{heading}</h1>
              <p className="mt-4 max-w-2xl text-sm font-bold leading-6 text-white/75 md:text-base">{subheading}</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
              {user?.avatar ? (
                <img className="h-14 w-14 rounded-full object-cover" src={user.avatar} alt="" />
              ) : (
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[#d7f80f] text-xl font-black text-[#10220f]">
                  {(user?.name || 'C').charAt(0)}
                </div>
              )}
              <div>
                <strong className="block text-sm font-black">{user?.name || 'Creator'}</strong>
                <span className="block max-w-[220px] truncate text-xs font-bold text-white/65">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {children}
      </section>
    </main>
  )
}
