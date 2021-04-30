import React from 'react'
import './slider.css'
function Slider() {
    var cake1='./slider1.jpg';
    var cake2='./slider2.jpg';
    var cake3='./slider3.jpg';
    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" >
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100 carouselimg" src={cake1}  alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h4>Chocolate Cake Special offer</h4>
                            <p>Special offer 50% off</p>
                        </div>
                </div>
                <div className="carousel-item">
                        <img className=" d-block w-100 carouselimg" src={cake2}  alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Black Forest cake <i>Hurry up!!</i></h5>
                                <p>20% flat Discount</p>
                            </div>
                </div>
                        <div className="carousel-item">
                            <img className="d-block w-100 carouselimg" src={cake3}  alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Fresh Bread Cake</h5>
                                    <p>Buy 1 get 1 free offer</p>
                                </div>
                        </div>
                </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
        </div>
    )
}

export default Slider
