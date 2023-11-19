import Link from 'next/link';

export default function LeftTab() {
  const links = ['Page 1', 'Page 2', 'Page 3'];

  return (
    <div className="left-tab flex flex-col bg-gray-100 p-4">
      {links.map((link, index) => (
        <Link key={index} href={`/${link.toLowerCase().replace(' ', '-')}`}>
          <p className="my-2 cursor-pointer hover:text-blue-500">{link}</p>
        </Link>
      ))}
    </div>
  );
}