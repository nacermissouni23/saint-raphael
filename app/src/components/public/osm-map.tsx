type OsmMapProps = {
  latitude: number;
  longitude: number;
  label: string;
  heightClassName?: string;
};

export function OsmMap({ latitude, longitude, label, heightClassName = "h-64" }: OsmMapProps) {
  const delta = 0.02;
  const bbox = `${longitude - delta}%2C${latitude - delta}%2C${longitude + delta}%2C${latitude + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}`;

  return (
    <div className={`overflow-hidden rounded-lg border border-[var(--color-border)] ${heightClassName}`}>
      <iframe
        title={label}
        src={src}
        className="h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
