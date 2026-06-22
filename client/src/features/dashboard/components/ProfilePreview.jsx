export function ProfilePreview({ links, profile, user, onOpen }) {
  const visibleLinks = links.filter((link) => link.isActive).slice(0, 5)
  const username = profile?.username || user?.username || 'creator'

  return (
    <aside className="rounded-[28px] bg-[#174b17] p-5 text-white shadow-2xl shadow-emerald-950/20">
      <div className="rounded-[24px] bg-[#d7f80f] p-5 text-[#10220f]">
        <div className="mx-auto grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-white shadow-xl">
          {user?.avatar ? (
            <img className="h-full w-full object-cover" src={user.avatar} alt="" />
          ) : (
            <span className="text-3xl font-black">{(user?.name || 'C').charAt(0)}</span>
          )}
        </div>
        <h2 className="mt-4 text-center text-2xl font-black">@{username}</h2>
        <p className="mx-auto mt-1 max-w-xs text-center text-sm font-bold text-[#10220f]/70">
          One link for every place your work lives.
        </p>

        <div className="mt-5 grid gap-2">
          {visibleLinks.length ? (
            visibleLinks.map((link) => (
              <button
                className="min-h-12 rounded-lg bg-white px-4 text-sm font-black text-slate-950 shadow-md transition hover:-translate-y-0.5 hover:shadow-xl"
                key={link.id}
                onClick={() => onOpen(link)}
                type="button"
              >
                {link.title}
              </button>
            ))
          ) : (
            <div className="rounded-lg border border-[#10220f]/15 bg-white/50 p-4 text-center text-sm font-black">
              Add links to preview your public page.
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
