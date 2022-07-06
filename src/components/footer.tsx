import "styles/Footer.scss";

export default function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <a
            href="https://github.com/alejandrosandi22"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com/alejandrosandi_"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/alejandrosandi"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
        <li>
          <a href="https://alejandrosandi.com" target="_blank" rel="noreferrer">
            <i className="fal fa-laptop"></i>
          </a>
        </li>
      </ul>
      <p>Copyright © 2022 Alejandro Sandí. All rights reserved.</p>
    </footer>
  );
}
