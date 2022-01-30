import { Link } from 'react-router-dom';
import { useLoginContext } from '../../contexts/LoginFormProvider';
import { useUserAuthContext } from '../../contexts/AuthProvider';
import { usePageVisitContext } from '../../contexts/PageVisitLinkContext';



function CheckoutButton({ children }) {
    let { setShowLoginForm } = useLoginContext()
    let { user } = useUserAuthContext();
    let { setPageurl } = usePageVisitContext();

    return (
        <>
            <div className="checkout-btn-wrapper">
                <Link to='/checkout' onClick={() => {
                    if (!user) {
                        setShowLoginForm(true);
                        setPageurl('/checkout');
                    }
                    children(false);

                }}>
                    <div>
                        Proceed to Checkout
                    </div>
                </Link>
            </div>

        </>
    );
}


export default CheckoutButton;



























// setFormValues((prevState) => {
//     return { ...prevState, courseSections: [...prevState.courseSections, { name: '', description: '', courseFileDocument: temp }] }
// });











