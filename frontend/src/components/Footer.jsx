import logo from './images/logo192.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation()
    const showNavBar = ['/login', '/register',
        '/registerSeller', '/registerRider',
        '/notApproved', '/forgotPassword'].includes(location.pathname);
    return (
        <div className='mt-5'>
            {!showNavBar && <div className='col-12  pt-5 pb-5' style={{ background: 'linear-gradient(125deg, rgba(244,61,0,1) 4%, rgba(229,212,11,1) 12%, rgba(244,61,0,1) 26%)' }}>
                <div className='d-lg-flex mb-5 justify-content-center'>
                    <div className='col-lg-2 col-4 p-3 text-center'>
                        <img className='col-6' src={logo} alt='logo' />

                    </div>
                    <div className="col-lg-2 text-center col-12">
                        <div className='text-light mt-2'>
                            Moon Delivery, where dreams take flight and packages find their way!
                        </div>

                    </div>
                    <div className="col-lg-2 col-12 d-flex flex-column justify-content-center">
                        <Link
                            className='text-decoration-none text-light text-center'
                            to={'https://sites.google.com/view/moon-delivery/about-us'}
                            target="_blank"
                            rel="noopener noreferrer">
                            About us
                        </Link>
                        <Link className='text-decoration-none text-light text-center'
                            to={'https://sites.google.com/view/moon-delivery/documentation'}
                            target="_blank"
                            rel="noopener noreferrer">
                            Documentation
                        </Link>
                        <Link className='text-decoration-none text-light text-center'
                            to={'https://sites.google.com/view/moon-delivery/home'}
                            target="_blank"
                            rel="noopener noreferrer">
                            Vision
                        </Link>
                        <Link className='text-decoration-none text-light text-center'
                            to={'https://sites.google.com/view/moon-delivery/home'}
                            target="_blank"
                            rel="noopener noreferrer">
                            Mission
                        </Link>
                       
                        <Link className='text-decoration-none text-light text-center'
                            to={'https://sites.google.com/view/moon-delivery/terms-of-service'}
                            target="_blank"
                            rel="noopener noreferrer">
                            Terms and Conditions
                        </Link>
                        <Link className='text-decoration-none text-light text-center'
                            to={'https://sites.google.com/view/moon-delivery/home'}
                            target="_blank"
                            rel="noopener noreferrer">
                            FAQ
                        </Link>
                    </div>
                    <div className='col-lg-6 col-12 text-center'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244468.69434371195!2d121.04519564071317!3d16.785462096721297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339023ae84c1e161%3A0x2e1f5b721d0d9fcd!2sLagawe%2C%20Ifugao!5e0!3m2!1sen!2sph!4v1687750709838!5m2!1sen!2sph"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
                <div class="text-center text-light">
                    <p>&copy; 2023 Moon Delivery. All rights reserved.</p>
                </div>
            </div>}
        </div>
    )
}

export default Footer
