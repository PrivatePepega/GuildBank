


import Link from "next/link";








const Socials = () => {




  return (
    <div>
      <ul className="flex flex-row gap-2">
        <Link href="https://x.com/iGotHakusHALP">
          <a rel="noopener noreferrer" target="_blank">
            <li>Twitter</li>
          </a>
        </Link>
        <Link href="https://discord.gg/5cbbBzGGwS">
          <a rel="noopener noreferrer" target="_blank">
            <li>Discord</li>
          </a>
        </Link>
        <Link href="https://github.com/PrivatePepega/Vanilla-Plus">
          <a rel="noopener noreferrer" target="_blank">
            <li>Github</li>
          </a>
        </Link>
      </ul>
    </div>
  )
}

export default Socials
