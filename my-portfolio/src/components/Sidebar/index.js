import { Link, NavLink } from 'react-router-dom'
import LokeshLogo from '../../assets/images/lokeshProfile.jpg'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import PolylineIcon from '@mui/icons-material/Polyline'
import './index.scss'

const Sidebar = () => (
  <div className="nav-bar">
    <Link className="logo" to="/">
      <img src={LokeshLogo} alt="logo" />
      <h3 className="sub-logo">Lokesh</h3>
    </Link>
    <nav>
      <NavLink exact="true" activeclassname="active" to="/">
        <HomeIcon className="icons" color="#4d4d4e" />
      </NavLink>
      <NavLink
        exact="true"
        activeclassname="active"
        className="about-link"
        to="/about"
      >
        <PersonIcon className="icons" color="#4d4d4e" />
      </NavLink>
      <NavLink
        exact="true"
        activeclassname="active"
        className="contact-link"
        to="/contact"
        color="#4d4d4e"
      >
        <EmailIcon className="icons" />
      </NavLink>
    </nav>
    <ul>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/lokesh-sunhare-70b8261b0"
        >
          <LinkedInIcon className="icons" color="#4d4d4e" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/LokeshSunhare1999"
        >
          <GitHubIcon className="icons" color="#4d4d4e" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://replit.com/@lokeshsunhare"
        >
          <PolylineIcon className="icons" color="#4d4d4e" />
        </a>
      </li>
    </ul>
  </div>
)

export default Sidebar
