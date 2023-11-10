const SetupHeader: React.FC<{}> = () => (
  <div className="leading-none">
    <h2 className="m-0 font-extrabold uppercase text-2xl">Setup</h2>
    <p className="font-medium">Select starting districts</p>
    <p className="max-w-prose leading-snug my-2 text-xs">
      Each faction chooses one of its own district tiles as its starting
      district by placing its Faction Start occupation token in that district’s
      occupation circle. Each faction then places their starting blocs in the
      starting district. If a faction’s starting district is adjacent to any
      police vans, place 3 barricades between that district and each adjacent
      district with a van.
    </p>
  </div>
);

export default SetupHeader;
