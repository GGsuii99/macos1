function Header() {
  return (
    <header>
      <ul role="menu-bar">
        <li role="menu-item">
          <span className="apple"></span>
        </li>
        <li role="menu-item" tabIndex="0" aria-haspopup="true">
          File
          <ul role="menu">
            <li role="menu-item">
              <a href="#new-folder">New Folder</a>
            </li>
            <li role="menu-item">
              <a href="#open">Open</a>
            </li>
            <li role="menu-item">
              <a href="#Print">Print</a>
            </li>
            <li role="menu-item" className="divider">
              <a href="#Close">Close</a>
            </li>
            <li role="menu-item">
              <a href="#get-info">Get Info</a>
            </li>
            <li role="menu-item">
              <a href="#duplicate">Duplicate</a>
            </li>
            <li role="menu-item" className="divider">
              <a href="#Put-Away">Put Away</a>
            </li>
            <li role="menu-item">
              <a href="#page-setup">Page Setup...</a>
            </li>
            <li role="menu-item" className="divider">
              <a href="#page-directory">Page Directory...</a>
            </li>
            <li role="menu-item">
              <a href="#eject">Eject</a>
            </li>
          </ul>
        </li>
        <li role="menu-item" tabIndex="1" aria-haspopup="true">
          Edit
          <ul role="menu">
            <li role="menu-item">
              <a href="#cut">Cut</a>
            </li>
            <li role="menu-item">
              <a href="#copy">Copy</a>
            </li>
            <li role="menu-item">
              <a href="#paste">Paste</a>
            </li>
            <li role="menu-item">
              <a href="#select-all">Select All</a>
            </li>
          </ul>
        </li>
        <li role="menu-item" tabIndex="2" aria-haspopup="true">
          View
          <ul role="menu">
            <li role="menu-item">
              <a href="#small-icon">by Small Icon</a>
            </li>
            <li role="menu-item">
              <a href="#large-icon">by Icon</a>
            </li>
            <li role="menu-item">
              <a href="#name">by Name</a>
            </li>
            <li role="menu-item">
              <a href="#Date">by Date</a>
            </li>
            <li role="menu-item">
              <a href="#Size">by Size</a>
            </li>
            <li role="menu-item">
              <a href="#Kind">by Kind</a>
            </li>
          </ul>
        </li>
        <li role="menu-item" tabIndex="3" aria-haspopup="true">
          Special
          <ul role="menu">
            <li role="menu-item">
              <a href="#cleanup">Clean Up Window</a>
            </li>
            <li role="menu-item">
              <a href="#empty-trash">Empty Trash</a>
            </li>
            <li role="menu-item">
              <a href="#erase-disk">Erase Disk</a>
            </li>
            <li role="menu-item">
              <a href="#set-startups">Set Startup...</a>
            </li>
          </ul>
        </li>
      </ul>
      <ul role="menu-bar">
        <li role="menu-item" aria-haspopup="true">
          Made by Mark Shenouda
        </li>
        <li role="menu-item" aria-haspopup="true">
          <a
            href="https://twitter.com/MarkSShenouda"
            target="_blank"
            rel="noopener noreferrer"
            className="social__link"
          >
            Twitter
          </a>
        </li>
        <li role="menu-item" aria-haspopup="true">
          <a
            href="https://github.com/markshenouda"
            target="_blank"
            rel="noopener noreferrer"
            className="social__link"
          >
            Github
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
