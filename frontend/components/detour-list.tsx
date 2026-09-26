export default function DetourList() {
  return (
    <section
      aria-labelledby="detour-heading"
      className="mx-auto mb-8 w-full max-w-2xl px-4"
    >
      <div className="rounded-2xl border border-[#f5d4b0] bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#ff6b35]">
            Example detour
          </p>
          <h2
            id="detour-heading"
            className="font-display text-xl font-bold text-[#3d2314]"
          >
            Detour instructions
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-[#a0673a]">
            Follow posted signs and directions from traffic control. Temporary
            routes can change.
          </p>
        </div>

        <ol className="space-y-3">
          <li className="flex gap-3 text-sm leading-relaxed text-[#3d2314]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff0e8] text-xs font-bold text-[#c94a1a]">
              1
            </span>
            Avoid the Waterloo Row underpass at the Bill Thorpe Walking Bridge.
          </li>
          <li className="flex gap-3 text-sm leading-relaxed text-[#3d2314]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff0e8] text-xs font-bold text-[#c94a1a]">
              2
            </span>
            Use a signed alternate route and give emergency crews room to work.
          </li>
          <li className="flex gap-3 text-sm leading-relaxed text-[#3d2314]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff0e8] text-xs font-bold text-[#c94a1a]">
              3
            </span>
            Check the City of Fredericton road updates before you travel.
          </li>
        </ol>

        <a
          href="https://www.fredericton.ca/resident-services/roads-construction/construction"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex text-sm font-semibold text-[#ff6b35] hover:text-[#c94a1a] hover:underline"
        >
          City road and construction updates
        </a>
      </div>
    </section>
  );
}
