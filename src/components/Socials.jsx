import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";


const Socials = () => {
    return (
        <div className="wrapper">
            <a href="#" className="button">
                <div className="icon">
                    <FaFacebook />
                </div>
                <span>Facebook</span>
            </a>
            <a href="#" className="button">
                <div className="icon">
                    <FaTwitter />
                </div>
                <span>Twitter</span>
            </a>
            <a href="#" className="button">
                <div className="icon">
                    <FaInstagram />
                </div>
                <span>Instagram</span>
            </a>
            <a href="#" className="button">
                <div className="icon">
                    <FaGithub />
                </div>
                <span>Github</span>
            </a>
            <a href="#" className="button">
                <div className="icon">
                    <FaYoutube />
                </div>
                <span>YouTube</span>
            </a>
        </div>
    )
};

export default Socials;