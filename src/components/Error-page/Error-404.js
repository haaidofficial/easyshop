import icon404 from '../../assets/icons/404.png';


function PageNotFoundError() {

    return (
        <>
            <div className='error-page-container'>
                <div className='error'>
                    <img src={icon404} alt='error-404-icon' />
                    <div className='error-desc'>
                        <h4>Page Not Found!</h4>
                    </div>
                </div>
            </div>
        </>
    );

}

export default PageNotFoundError;