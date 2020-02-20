import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer-area gray-bg pt-100 pb-95">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-5 col-12">
                            <div className="footer-widget">
                                <div className="footer-widget-l-content">
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="footer-widget">
                                <div className="footer-widget-m-content text-center">
                                    <div className="footer-logo">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="footer-widget f-right">
                                <div className="footer-widget-r-content">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;