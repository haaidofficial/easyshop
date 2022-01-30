import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuthContext } from '../../contexts/AuthProvider';
import { useLoginContext } from '../../contexts/LoginFormProvider';
import { usePageVisitContext } from '../../contexts/PageVisitLinkContext';
import GoogleButton from 'react-google-button';
import cloudSync from '../../assets/icons/cloud-sync.png';
import closeIcon from '../../assets/icons/close.png';



function UserLogin() {

    let { signInWithgoogle, user, signUpWithEmail, signInWithEmail } = useUserAuthContext();
    let { setShowLoginForm, deafultNavigationURL } = useLoginContext();
    let { pageurl, setPageurl } = usePageVisitContext();
    let navigate = useNavigate();
    let [showSignUp, setShowSignUp] = useState(true);
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [emailError, setEmailError] = useState('');
    let [passError, setPassError] = useState('');

    useEffect(() => {
        if (user) navigate('/user-orders');
    }, []);


    async function handleGoogleSignIn() {
        try {
            await signInWithgoogle();
            if (pageurl === '/checkout') {
                navigate('/checkout');
                setPageurl('');
                return;
            }
            if (pageurl === '/wishlist') {
                navigate('/wishlist');
                setPageurl('');
                return;
            }
            if (deafultNavigationURL !== 'wishlist') navigate('/user-orders');

        }
        catch (emailError) {
            console.log(emailError.message);
        }
    }



    async function handleForm(type) {

        setEmailError('');
        let fn = signUpWithEmail;
        if (type === 'signin') fn = signInWithEmail;


        try {
            await fn(email, password);
            setShowLoginForm(false);
        }
        catch (err) {
            console.log(err.code);
            if (err.code === 'auth/email-already-in-use') {
                setEmailError('Email already in use');
            }
            if (err.code === 'auth/user-not-found') {
                setEmailError('Email ID not found');
            }
            if (err.code === 'auth/wrong-password') {
                setPassError('Wrong password');
            }
        }

    }


    return (
        <>
            {!user && <div className="signin-container">
                <div className="signin-wrapper">
                    <span className="signin-close">
                        <img src={closeIcon} alt='close-icon' onClick={() => setShowLoginForm(false)} style={{ cursor: 'pointer' }} />
                    </span>
                    <div className="signin-left">
                        <div className="s-l-top">
                            <div className="s-l-t-header">
                                <h5>Login</h5>
                            </div>
                            <div className="s-l-t-desc">
                                <h6>Get access to your Orders, Wishlists.</h6>
                            </div>
                        </div>
                        <div className="s-l-bottom">
                            <div className="s-l-bottom-photo">
                                <img src={cloudSync} alt='cloud-sync-icon' />
                            </div>
                        </div>
                    </div>
                    <div className="signin-form">
                        <div className="signin-form-row">
                            <GoogleButton onClick={handleGoogleSignIn} width='50' height='10' />
                        </div>
                        <div className='form-divider'>

                            <div className='fd-strike'>
                                <span>OR</span>
                            </div>
                        </div>
                        <div className="signin-form-row">
                            <form>

                                <div className="form-wrapper">
                                    <div className="form-row-input">
                                        <input type='email' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                                        <span className='error-msg'>{emailError}</span>
                                    </div>
                                    <div className="form-row-input">
                                        <input type='password' placeholder='Enter email' onChange={(e) => setPassword(e.target.value)} />
                                        <span className='error-msg'>{passError}</span>
                                    </div>
                                    <div className="form-row-input">
                                        {
                                            showSignUp
                                                ?
                                                <button type='button' onClick={(e) => handleForm('signup')}>Sign up</button>
                                                :
                                                <button type='button' onClick={(e) => handleForm('signin')}>Sign In</button>
                                        }

                                    </div>
                                </div>




                            </form>
                            <div className='form-type-navigation'>
                                <span>

                                    {showSignUp ? <>
                                        Already registerd? < a href=''
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowSignUp(!showSignUp);
                                            }}>
                                            Sign In

                                        </a>
                                    </>
                                        :

                                        <>
                                            Not a registered user? &nbsp;
                                            <a href=''
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setShowSignUp(!showSignUp);
                                                }}>
                                                Sign Up
                                            </a>
                                        </>
                                    }


                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

        </>
    );
}


export default UserLogin;